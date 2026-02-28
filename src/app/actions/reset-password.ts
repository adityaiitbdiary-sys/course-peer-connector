'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function resetPassword(formData: FormData) {
    const email = formData.get('email')?.toString()

    if (!email) {
        return { error: 'Email is required.' }
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/update-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: 'Password reset link sent to your email.' }
}

export async function updatePassword(formData: FormData) {
    const password = formData.get('password')?.toString()

    if (!password) {
        return { error: 'Password is required.' }
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
        return { error: error.message }
    }

    redirect('/login')
}
