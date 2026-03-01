'use client'

import { addCourse } from '@/app/actions/courses'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import CourseList from './CourseList' // We will create this next

type Course = {
    id: string
    course_code: string
    created_at: string
    rating: number
    grade: number | null
}

export default function MyCoursesPage({ initialCourses }: { initialCourses: Course[] }) {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const [rating, setRating] = useState<number>(0)
    const [hoveredRating, setHoveredRating] = useState<number>(0)

    async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)

        if (rating < 1 || rating > 5) {
            setError('Please select a star rating between 1 and 5.')
            return
        }

        const form = event.currentTarget
        const formData = new FormData(form)
        // Append rating manually since it's a custom UI state
        formData.append('rating', rating.toString())

        startTransition(async () => {
            const result = await addCourse(formData)
            if (result?.error) {
                setError(result.error)
                toast.error('Could not add course', { description: result.error })
            } else if (result?.success) {
                toast.success(result.success)
                form.reset() // Clear input
                setRating(0) // Clear stars
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
                        Enter the course code, give it a rating, and optionally add your grade.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div className="space-y-2 max-w-sm">
                                <Label htmlFor="courseCode">Course Code</Label>
                                <Input
                                    id="courseCode"
                                    name="courseCode"
                                    placeholder="Ex: ES 233"
                                    className="uppercase"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Rating (out of 5)</Label>
                                <div className="flex h-10 items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="focus:outline-none transition-colors"
                                        >
                                            <Star
                                                className={`h-7 w-7 ${(hoveredRating || rating) >= star
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-muted-foreground hover:bg-muted rounded-md'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="grade">Grade (Optional)</Label>
                                <select
                                    id="grade"
                                    name="grade"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select a grade...</option>
                                    <option value="10">10 (AA/AP)</option>
                                    <option value="9">9 (AB)</option>
                                    <option value="8">8 (BB)</option>
                                    <option value="7">7 (BC)</option>
                                    <option value="6">6 (CC)</option>
                                    <option value="5">5 (CD)</option>
                                    <option value="4">4 (DD)</option>
                                </select>
                            </div>

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
