'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSuggestions() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('suggestions')
        .select(`
      id,
      title,
      description,
      created_at,
      updated_at,
      author_id,
      profiles (
        name,
        roll_number
      )
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching suggestions:', error)
        throw new Error('Failed to fetch suggestions')
    }

    return data
}

export async function createSuggestion(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string

    if (!title || !description) {
        throw new Error('Title and description are required')
    }

    const { error } = await supabase
        .from('suggestions')
        .insert([
            {
                author_id: user.id,
                title,
                description,
            }
        ])

    if (error) {
        console.error('Error creating suggestion:', error)
        throw new Error('Failed to create suggestion')
    }

    revalidatePath('/suggestions')
}

export async function deleteSuggestion(id: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    const { error } = await supabase
        .from('suggestions')
        .delete()
        .eq('id', id)
        .eq('author_id', user.id)

    if (error) {
        console.error('Error deleting suggestion:', error)
        throw new Error('Failed to delete suggestion')
    }

    revalidatePath('/suggestions')
}

export async function updateSuggestion(id: string, formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string

    if (!title || !description) {
        throw new Error('Title and description are required')
    }

    const { error } = await supabase
        .from('suggestions')
        .update({ title, description, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('author_id', user.id)

    if (error) {
        console.error('Error updating suggestion:', error)
        throw new Error('Failed to update suggestion')
    }

    revalidatePath('/suggestions')
}
