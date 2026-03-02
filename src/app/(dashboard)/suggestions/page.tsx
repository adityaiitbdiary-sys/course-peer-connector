import { getSuggestions } from '@/app/actions/suggestions'
import { createClient } from '@/lib/supabase/server'
import SuggestionsClient from './SuggestionsClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Suggestions | B42',
    description: 'Provide suggestions and feedback to improve B42.',
}

export default async function SuggestionsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch suggestions using server action
    let suggestions: any[] = []
    try {
        suggestions = await getSuggestions()
    } catch (error) {
        console.error("Error fetching suggestions:", error)
        // Ensure suggestions is an empty array on error gracefully
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Suggestions</h1>
                <p className="text-muted-foreground mt-1 text-lg">
                    Help us improve by sharing your feedback and suggestions.
                </p>
            </div>

            <SuggestionsClient
                initialSuggestions={suggestions}
                currentUserId={user?.id || ''}
            />
        </div>
    )
}
