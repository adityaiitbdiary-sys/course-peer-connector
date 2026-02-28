'use client'

import { resetPassword } from '@/app/actions/reset-password'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        setSuccess(null)
        const formData = new FormData(event.currentTarget)

        startTransition(async () => {
            const result = await resetPassword(formData)
            if (result?.error) {
                setError(result.error)
                toast.error('Failed to send reset email', { description: result.error })
            } else if (result?.success) {
                setSuccess(result.success)
                toast.success('Email Sent', { description: result.success })
            }
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                    <CardDescription>Enter your email address and we&apos;ll send you a link to reset your password.</CardDescription>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="rounded-md bg-green-50 p-4 mb-4">
                            <div className="text-sm text-green-700">{success}</div>
                        </div>
                    ) : (
                        <form id="forgot-password-form" onSubmit={onSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? 'Sending link...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-center w-full">
                        Remember your password?{' '}
                        <Link href="/login" className="underline font-medium">
                            Log in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
