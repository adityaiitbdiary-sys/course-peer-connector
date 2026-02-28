'use client'

import { updateProfile } from '@/app/actions/profile'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export type UserProfile = {
    name: string
    roll_number: string
    email: string
    phone: string | null
    graduation_year: number
}

export default function EditProfileClient({ profile }: { profile: UserProfile }) {
    const [isPending, startTransition] = useTransition()

    // Local state to handle form inputs without modifying the prop directly
    const [formData, setFormData] = useState({
        name: profile.name,
        email: profile.email,
        phone: profile.phone || '',
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = new FormData(event.currentTarget)

        startTransition(async () => {
            const result = await updateProfile(form)
            if (result?.error) {
                toast.error('Update Failed', { description: result.error })
            } else if (result?.success) {
                toast.success(result.success)
            }
        })
    }

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
                <p className="text-muted-foreground mt-2">
                    Update your contact information. Roll number and graduation year cannot be changed.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                        This information will be visible to other students who search for courses you have taken.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">

                        {/* Locked Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="roll_number" className="text-muted-foreground">Roll Number (Locked)</Label>
                                <Input
                                    id="roll_number"
                                    value={profile.roll_number}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="graduation_year" className="text-muted-foreground">Graduation Year (Locked)</Label>
                                <Input
                                    id="graduation_year"
                                    value={profile.graduation_year}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        {/* Editable Fields */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Changing this will also update your login email.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
