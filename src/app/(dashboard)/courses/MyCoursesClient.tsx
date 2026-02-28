'use client'

import { addCourse } from '@/app/actions/courses'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import CourseList from './CourseList' // We will create this next

type Course = {
    id: string
    course_code: string
    created_at: string
}

export default function MyCoursesPage({ initialCourses }: { initialCourses: Course[] }) {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        const form = event.currentTarget
        const formData = new FormData(form)

        startTransition(async () => {
            const result = await addCourse(formData)
            if (result?.error) {
                setError(result.error)
                toast.error('Could not add course', { description: result.error })
            } else if (result?.success) {
                toast.success(result.success)
                form.reset() // Clear input
            }
        })
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
                <p className="text-muted-foreground mt-2">
                    Manage the list of additional courses you have completed.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add a Course</CardTitle>
                    <CardDescription>
                        Enter the course code exactly as it appears (e.g., ES233). It will be saved instantly.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAdd} className="flex gap-4 items-end">
                        <div className="space-y-2 flex-1 max-w-sm">
                            <Label htmlFor="courseCode">Course Code</Label>
                            <Input
                                id="courseCode"
                                name="courseCode"
                                placeholder="Ex: ES 233"
                                className="uppercase"
                                required
                            />
                        </div>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Adding...' : 'Add Course'}
                        </Button>
                    </form>
                    {error && <p className="text-sm font-medium text-destructive mt-2">{error}</p>}
                </CardContent>
            </Card>

            <div>
                <h2 className="text-xl font-bold tracking-tight mb-4">Completed Courses</h2>
                <CourseList courses={initialCourses} />
            </div>

        </div>
    )
}
