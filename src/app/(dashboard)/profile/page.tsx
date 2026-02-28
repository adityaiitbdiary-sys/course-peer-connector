import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EditProfileClient, { type UserProfile } from './EditProfileClient'

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (error || !profile) {
        console.error('Error fetching profile:', error)
        // Could render an error state, but re-login is safest for MVP
        redirect('/login')
    }

    // Soft cast to our known type
    const userProfile = profile as UserProfile

    return <EditProfileClient profile={userProfile} />
}
