'use server'

import { createClient } from '@/lib/supabase/server'

export type SearchResult = {
    id: string
    course_code: string
    student_id: string
    profiles: {
        name: string
        roll_number: string
        email: string
        phone: string | null
        graduation_year: number
    }
}

export async function searchCourse(formData: FormData): Promise<{ data?: SearchResult[], error?: string }> {
    const rawQuery = formData.get('query')?.toString()

    if (!rawQuery) {
        return { error: 'Please enter a course code to search.' }
    }

    // Standardize: UPPERCASE and remove all spaces
    const query = rawQuery.toUpperCase().replace(/\s+/g, '')

    if (query.length < 3) {
        return { error: 'Search query must be at least 3 characters.' }
    }

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('student_courses')
        .select(`
      id,
      course_code,
      student_id,
      profiles!inner (
        name,
        roll_number,
        email,
        phone,
        graduation_year
      )
    `)
        .eq('course_code', query)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Search error:', error)
        return { error: 'Failed to search for courses.' }
    }

    // Supabase types can be tricky with joins, doing a soft cast here
    // We know the structure based on the select query
    const formattedData = data as unknown as SearchResult[]

    return { data: formattedData }
}
