import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import MyCoursesClient from './MyCoursesClient'

export default async function CoursesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: courses, error } = await supabase
        .from('student_courses')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching courses:', error)
    }

    // Ensure we pass a clean array to the client component
    return <MyCoursesClient initialCourses={courses || []} />
}
