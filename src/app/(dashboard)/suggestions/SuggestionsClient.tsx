'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { createSuggestion, deleteSuggestion, updateSuggestion } from '@/app/actions/suggestions'
import { Loader2, Trash2, Edit2, X, Check } from 'lucide-react'

type Profile = {
    name: string
    roll_number: string
}

type SuggestionType = {
    id: string
    title: string
    description: string
    created_at: string
    updated_at: string
    author_id: string
    profiles: Profile | Profile[] | null
}

export default function SuggestionsClient({
    initialSuggestions,
    currentUserId
}: {
    initialSuggestions: SuggestionType[],
    currentUserId: string
}) {
    const [isPending, startTransition] = useTransition()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || !description.trim()) return

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)

        startTransition(async () => {
            try {
                await createSuggestion(formData)
                setTitle('')
                setDescription('')
            } catch (error) {
                console.error("Failed to create suggestion", error)
            }
        })
    }

    const handleDelete = (id: string) => {
        if (!confirm('Are you sure you want to delete this suggestion?')) return

        startTransition(async () => {
            try {
                await deleteSuggestion(id)
            } catch (error) {
                console.error("Failed to delete suggestion", error)
            }
        })
    }

    const startEditing = (suggestion: SuggestionType) => {
        setEditingId(suggestion.id)
        setEditTitle(suggestion.title)
        setEditDescription(suggestion.description)
    }

    const cancelEditing = () => {
        setEditingId(null)
    }

    const handleUpdate = (id: string) => {
        if (!editTitle.trim() || !editDescription.trim()) return

        const formData = new FormData()
        formData.append('title', editTitle)
        formData.append('description', editDescription)

        startTransition(async () => {
            try {
                await updateSuggestion(id, formData)
                setEditingId(null)
            } catch (error) {
                console.error("Failed to update suggestion", error)
            }
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }).format(date)
    }

    const getProfileName = (profiles: Profile | Profile[] | null) => {
        if (!profiles) return 'Unknown Student'
        if (Array.isArray(profiles)) return profiles[0]?.name || 'Unknown Student'
        return profiles.name || 'Unknown Student'
    }

    return (
        <div className="space-y-8">
            <Card className="max-w-2xl border-primary/10 shadow-md">
                <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
                    <CardTitle>Submit a Suggestion</CardTitle>
                    <CardDescription>
                        We value your input. Let us know what features or improvements you'd like to see in B42.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Brief summary of your suggestion (e.g., Add dark mode)"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                disabled={isPending}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Details</Label>
                            <Textarea
                                id="description"
                                placeholder="Please provide more details about your suggestion..."
                                className="min-h-[100px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                disabled={isPending}
                            />
                        </div>
                        <Button type="submit" disabled={isPending || !title.trim() || !description.trim()}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Suggestion
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight border-b pb-2">Community Suggestions</h2>
                {initialSuggestions.length === 0 ? (
                    <div className="p-8 text-center bg-muted/30 rounded-lg border border-border/50">
                        <p className="text-muted-foreground">No suggestions yet. Be the first to submit one!</p>
                    </div>
                ) : (
                    <div className="grid gap-4 max-w-4xl">
                        {initialSuggestions.map((suggestion) => {
                            const isAuthor = suggestion.author_id === currentUserId
                            const isEditing = editingId === suggestion.id

                            return (
                                <Card key={suggestion.id} className="relative overflow-hidden group">
                                    <CardHeader className="bg-muted/20 pb-4">
                                        <div className="flex justify-between items-start">
                                            {isEditing ? (
                                                <div className="w-full space-y-2 pr-12">
                                                    <Input
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        placeholder="Title"
                                                        disabled={isPending}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="space-y-1 pr-12">
                                                    <CardTitle className="text-xl">{suggestion.title}</CardTitle>
                                                    <CardDescription className="flex items-center gap-2">
                                                        <span>Posted by <span className="font-medium text-foreground">{getProfileName(suggestion.profiles)}</span></span>
                                                        <span className="text-muted-foreground/50">•</span>
                                                        <span>{formatDate(suggestion.created_at)}</span>
                                                    </CardDescription>
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        {isEditing ? (
                                            <div className="w-full space-y-4">
                                                <Textarea
                                                    value={editDescription}
                                                    onChange={(e) => setEditDescription(e.target.value)}
                                                    placeholder="Description"
                                                    className="min-h-[100px]"
                                                    disabled={isPending}
                                                />
                                                <div className="flex space-x-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleUpdate(suggestion.id)}
                                                        disabled={isPending}
                                                    >
                                                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={cancelEditing}
                                                        disabled={isPending}
                                                    >
                                                        <X className="mr-2 h-4 w-4" /> Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-muted-foreground">{suggestion.description}</p>
                                        )}
                                    </CardContent>

                                    {isAuthor && !isEditing && (
                                        <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => startEditing(suggestion)}
                                                disabled={isPending}
                                                title="Edit suggestion"
                                                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(suggestion.id)}
                                                disabled={isPending}
                                                title="Delete suggestion"
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
