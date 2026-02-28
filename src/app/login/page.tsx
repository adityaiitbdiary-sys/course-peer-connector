'use client'

import { logIn } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        const formData = new FormData(event.currentTarget)

        startTransition(async () => {
            const result = await logIn(formData)
            if (result?.error) {
                setError(result.error)
                toast.error('Login Failed', { description: result.error })
            }
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your Roll Number to access your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="login-form" onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="rollNumber">Roll Number</Label>
                            <Input
                                id="rollNumber"
                                name="rollNumber"
                                placeholder="Ex: ES233"
                                required
                                className="uppercase"
                                autoComplete="username"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-center w-full">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
