'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const phone = formData.get('phone')?.toString()

    if (!name || !email) {
        return { error: 'Name and Email are required.' }
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated.' }
    }

    // Update Supabase Auth Email if it changed
    if (email !== user.email) {
        const { error: authError } = await supabase.auth.updateUser({ email })
        if (authError) {
            return { error: authError.message }
        }
    }

    // Update Profiles Table
    const { error: profileError } = await supabase
        .from('profiles')
        .update({ name, email, phone: phone || null })
        .eq('id', user.id)

    if (profileError) {
        return { error: 'Failed to update profile data.' }
    }

    revalidatePath('/profile')
    revalidatePath('/search') // Names/Phones might show up here
    return { success: 'Profile updated successfully.' }
}
