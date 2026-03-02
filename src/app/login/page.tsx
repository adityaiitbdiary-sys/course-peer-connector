'use client'

import { logIn, sendOTP, verifyOTP } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type AuthMethod = 'password' | 'otp'
type OtpStep = 'request' | 'verify'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [successMsg, setSuccessMsg] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const [method, setMethod] = useState<AuthMethod>('password')
    const [otpStep, setOtpStep] = useState<OtpStep>('request')
    const [rollNumber, setRollNumber] = useState('')

    async function onSubmitPassword(event: React.FormEvent<HTMLFormElement>) {
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

    async function onRequestOTP(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        setSuccessMsg(null)
        const formData = new FormData(event.currentTarget)

        startTransition(async () => {
            const result = await sendOTP(formData)
            if (result?.error) {
                setError(result.error)
                toast.error('Failed to send OTP', { description: result.error })
            } else if (result?.success) {
                setOtpStep('verify')
                setSuccessMsg('An 8-digit code has been sent to your registered email.')
                toast.success('OTP Sent!')
            }
        })
    }

    async function onVerifyOTP(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        const formData = new FormData(event.currentTarget)
        // Add rollNumber back to formData since the verify form only has the OTP input
        formData.append('rollNumber', rollNumber)

        startTransition(async () => {
            const result = await verifyOTP(formData)
            if (result?.error) {
                setError(result.error)
                toast.error('Verification Failed', { description: result.error })
            }
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <img src="/B42_logo.png" alt="B42 Logo" className="h-[42px] w-auto object-contain rounded-xl" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        {method === 'password'
                            ? 'Enter your Roll Number to access your account.'
                            : otpStep === 'request'
                                ? 'We will send a special login code to your registered email.'
                                : 'Enter the 8-digit code sent to your email.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* --- METHOD: PASSWORD --- */}
                    {method === 'password' && (
                        <form id="login-form-password" onSubmit={onSubmitPassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="rollNumber">Roll Number</Label>
                                <Input
                                    id="rollNumber"
                                    name="rollNumber"
                                    placeholder="Ex: 24B4245"
                                    required
                                    className="uppercase"
                                    autoComplete="username"
                                    value={rollNumber}
                                    onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
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
                                {isPending ? 'Logging in...' : 'Login with Password'}
                            </Button>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    setMethod('otp')
                                    setError(null)
                                }}
                            >
                                Get a Login Code via Email
                            </Button>
                        </form>
                    )}

                    {/* --- METHOD: OTP (REQUEST) --- */}
                    {method === 'otp' && otpStep === 'request' && (
                        <form id="login-form-otp-request" onSubmit={onRequestOTP} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="rollNumber">Roll Number</Label>
                                <Input
                                    id="rollNumber"
                                    name="rollNumber"
                                    placeholder="Ex: 24B4245"
                                    required
                                    className="uppercase"
                                    value={rollNumber}
                                    onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                                />
                            </div>

                            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? 'Sending...' : 'Send Login Code'}
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full"
                                onClick={() => {
                                    setMethod('password')
                                    setError(null)
                                }}
                            >
                                Back to Password Login
                            </Button>
                        </form>
                    )}

                    {/* --- METHOD: OTP (VERIFY) --- */}
                    {method === 'otp' && otpStep === 'verify' && (
                        <form id="login-form-otp-verify" onSubmit={onVerifyOTP} className="space-y-4">
                            {successMsg && <p className="text-sm font-medium text-green-600 dark:text-green-500">{successMsg}</p>}

                            <div className="space-y-2">
                                <Label htmlFor="otp">8-Digit Code</Label>
                                <Input
                                    id="otp"
                                    name="otp"
                                    placeholder="00000000"
                                    required
                                    className="text-center tracking-widest text-lg"
                                    maxLength={8}
                                />
                            </div>

                            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? 'Verifying...' : 'Verify and Login'}
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full"
                                onClick={() => {
                                    setOtpStep('request')
                                    setError(null)
                                    setSuccessMsg(null)
                                }}
                            >
                                Change Roll Number
                            </Button>
                        </form>
                    )}

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
