'use client'

import { signUp } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export default function SignUpPage() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        const formData = new FormData(event.currentTarget)

        startTransition(async () => {
            const result = await signUp(formData)
            if (result?.error) {
                setError(result.error)
                toast.error('Signup Failed', { description: result.error })
            }
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="mx-auto w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                    <CardDescription>Create an account to connect with peers and view course experiences.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="signup-form" onSubmit={onSubmit} className="space-y-4">

                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                            <Input id="name" name="name" placeholder="John Doe" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rollNumber">Roll Number <span className="text-destructive">*</span></Label>
                            <Input
                                id="rollNumber"
                                name="rollNumber"
                                placeholder="Ex: ES233"
                                required
                                className="uppercase"
                                autoComplete="username"
                            />
                            <p className="text-xs text-muted-foreground">Used as your username to log in.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="graduationYear">Graduation Year <span className="text-destructive">*</span></Label>
                            <Input
                                id="graduationYear"
                                name="graduationYear"
                                type="number"
                                placeholder="2025"
                                min="1900"
                                max="2100"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+1 234 567 8900"
                                autoComplete="tel"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                minLength={6}
                                autoComplete="new-password"
                            />
                            <p className="text-xs text-muted-foreground">Minimum 6 characters.</p>
                        </div>

                        {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                        <Button type="submit" className="w-full mt-4" disabled={isPending}>
                            {isPending ? 'Creating account...' : 'Create Account'}
                        </Button>

                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="underline font-medium">
                            Log in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}


