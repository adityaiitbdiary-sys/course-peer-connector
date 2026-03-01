'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addCourse(formData: FormData) {
    const rawCourseCode = formData.get('courseCode')?.toString()
    const rawRating = formData.get('rating')?.toString()
    const rawGrade = formData.get('grade')?.toString()

    if (!rawCourseCode) {
        return { error: 'Course code is required.' }
    }

    if (!rawRating) {
        return { error: 'Course rating is required.' }
    }

    // Standardize: UPPERCASE and remove all spaces
    const courseCode = rawCourseCode.toUpperCase().replace(/\s+/g, '')
    const rating = parseInt(rawRating, 10)
    const grade = rawGrade ? parseInt(rawGrade, 10) : null

    if (courseCode.length < 3) {
        return { error: 'Course code must be at least 3 characters.' }
    }

    if (rating < 1 || rating > 5) {
        return { error: 'Rating must be between 1 and 5 stars.' }
    }

    if (grade !== null && (grade < 4 || grade > 10)) {
        return { error: 'Grade must be between 4 and 10.' }
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated.' }
    }

    // Check if course already added
    const { data: existingCourse } = await supabase
        .from('student_courses')
        .select('id')
        .eq('student_id', user.id)
        .eq('course_code', courseCode)
        .single()

    if (existingCourse) {
        return { error: 'You have already added this course.' }
    }

    const { error } = await supabase.from('student_courses').insert({
        student_id: user.id,
        course_code: courseCode,
        rating: rating,
        grade: grade,
    })

    if (error) {
        console.error('Error adding course:', error)
        return { error: 'Failed to add course.' }
    }

    revalidatePath('/courses')
    revalidatePath('/search')
    return { success: `Successfully added ${courseCode}.` }
}

export async function deleteCourse(courseId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated.' }
    }

    const { error } = await supabase
        .from('student_courses')
        .delete()
        .eq('id', courseId)
        .eq('student_id', user.id) // Ensure they only delete their own

    if (error) {
        return { error: 'Failed to delete course.' }
    }

    revalidatePath('/courses')
    revalidatePath('/search')
    return { success: 'Course deleted successfully.' }
}

export async function updateCourse(courseId: string, newRawCourseCode: string) {
    const newCourseCode = newRawCourseCode.toUpperCase().replace(/\s+/g, '')

    if (newCourseCode.length < 3) {
        return { error: 'Course code must be at least 3 characters.' }
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated.' }
    }

    // Check if new code already exists for this user to prevent duplicates
    const { data: existingCourse } = await supabase
        .from('student_courses')
        .select('id')
        .eq('student_id', user.id)
        .eq('course_code', newCourseCode)
        .neq('id', courseId) // Exclude current course
        .single()

    if (existingCourse) {
        return { error: 'You already have this course in your list.' }
    }

    const { error } = await supabase
        .from('student_courses')
        .update({ course_code: newCourseCode })
        .eq('id', courseId)
        .eq('student_id', user.id)

    if (error) {
        return { error: 'Failed to update course.' }
    }

    revalidatePath('/courses')
    revalidatePath('/search')
    return { success: `Course updated to ${newCourseCode}.` }
}
