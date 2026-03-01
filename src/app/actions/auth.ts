'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const SignUpSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    rollNumber: z.string().min(3, { message: 'Roll Number is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    graduationYear: z.string().regex(/^\d{4}$/, { message: 'Must be a 4-digit year.' }),
    phone: z.string().optional(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
})

export async function signUp(formData: FormData) {
    const data = Object.fromEntries(formData.entries())

    const validatedFields = SignUpSchema.safeParse({
        name: data.name,
        rollNumber: data.rollNumber,
        email: data.email,
        graduationYear: data.graduationYear,
        phone: data.phone,
        password: data.password,
    })

    if (!validatedFields.success) {
        return { error: validatedFields.error.issues[0].message }
    }

    const { name, email, password, phone } = validatedFields.data
    const rollNumber = validatedFields.data.rollNumber.toUpperCase()
    const graduationYear = parseInt(validatedFields.data.graduationYear, 10)

    const supabase = await createClient()

    // 1. Sign up user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                roll_number: rollNumber,
            }
        }
    })

    if (authError || !authData.user) {
        return { error: authError?.message || 'Failed to sign up.' }
    }

    // 2. Insert into profiles table
    const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        roll_number: rollNumber,
        name,
        email,
        graduation_year: graduationYear,
        phone: phone || null,
    })

    if (profileError) {
        console.error('Profile creation error:', profileError)
        // We should probably clean up the auth user here if profile fails in a real app
        return { error: 'Account created, but failed to save profile details. Please contact support.' }
    }

    revalidatePath('/')
    redirect('/courses') // Redirect to dashboard/courses page after successful signup
}

export async function logIn(formData: FormData) {
    const rollNumber = formData.get('rollNumber')?.toString().toUpperCase()
    const password = formData.get('password')?.toString()

    if (!rollNumber || !password) {
        return { error: 'Roll Number and Password are required.' }
    }

    const supabase = await createClient()

    // 1. Look up the email associated with this roll number
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('roll_number', rollNumber)
        .single()

    if (profileError || !profile) {
        return { error: 'Invalid Roll Number or Password.' } // Generic message for security
    }

    // 2. Sign in with the found email and provided password
    const { error: authError } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password,
    })

    if (authError) {
        return { error: 'Invalid Roll Number or Password.' }
    }

    revalidatePath('/')
    redirect('/courses')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}

export async function sendOTP(formData: FormData) {
    const rollNumber = formData.get('rollNumber')?.toString().toUpperCase()

    if (!rollNumber) {
        return { error: 'Roll Number is required.' }
    }

    const supabase = await createClient()

    // 1. Look up the email associated with this roll number
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('roll_number', rollNumber)
        .single()

    if (profileError || !profile) {
        return { error: 'No account found with this Roll Number.' }
    }

    // 2. Send OTP to that email
    const { error: authError } = await supabase.auth.signInWithOtp({
        email: profile.email,
        options: {
            shouldCreateUser: false,
        }
    })

    if (authError) {
        return { error: 'Failed to send OTP. Please try again.' }
    }

    return { success: true }
}

export async function verifyOTP(formData: FormData) {
    const rollNumber = formData.get('rollNumber')?.toString().toUpperCase()
    const otp = formData.get('otp')?.toString()

    if (!rollNumber || !otp) {
        return { error: 'Roll Number and OTP code are required.' }
    }

    const supabase = await createClient()

    // 1. Look up the email associated with this roll number
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('roll_number', rollNumber)
        .single()

    if (profileError || !profile) {
        return { error: 'Invalid Roll Number.' }
    }

    // 2. Verify OTP
    const { error: authError } = await supabase.auth.verifyOtp({
        email: profile.email,
        token: otp,
        type: 'email',
    })

    if (authError) {
        return { error: 'Invalid or expired OTP code.' }
    }

    revalidatePath('/')
    redirect('/courses')
}
