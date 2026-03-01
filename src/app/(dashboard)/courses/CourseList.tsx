'use client'

import { deleteCourse, updateCourse } from '@/app/actions/courses'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Trash2, Star } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type Course = {
    id: string
    course_code: string
    created_at: string
    rating: number
    grade: number | null
}

export default function CourseList({ courses }: { courses: Course[] }) {
    const [editingCourse, setEditingCourse] = useState<Course | null>(null)
    const [editValue, setEditValue] = useState('')
    const [editRating, setEditRating] = useState<number>(0)
    const [editHoveredRating, setEditHoveredRating] = useState<number>(0)
    const [editGrade, setEditGrade] = useState<number | null>(null)
    const [isPending, startTransition] = useTransition()

    if (courses.length === 0) {
        return (
            <div className="text-center p-8 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground">You haven&apos;t added any courses yet.</p>
            </div>
        )
    }

    function handleDelete(id: string) {
        if (confirm('Are you sure you want to delete this course?')) {
            startTransition(async () => {
                const result = await deleteCourse(id)
                if (result?.error) {
                    toast.error('Failed to delete course', { description: result.error })
                } else if (result?.success) {
                    toast.success(result.success)
                }
            })
        }
    }

    function handleEditSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!editingCourse) return

        if (editRating < 1 || editRating > 5) {
            toast.error('Invalid Rating', { description: 'Please select a star rating between 1 and 5.' })
            return
        }

        startTransition(async () => {
            const result = await updateCourse(editingCourse.id, editValue, editRating, editGrade)
            if (result?.error) {
                toast.error('Failed to update course', { description: result.error })
            } else if (result?.success) {
                toast.success(result.success)
                setEditingCourse(null) // Close dialog
            }
        })
    }

    return (
        <>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Course Code</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Added On</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.course_code}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${course.rating >= star
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-muted-foreground/30'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {course.grade ? course.grade : <span className="text-muted-foreground italic">N/A</span>}
                                </TableCell>
                                <TableCell>
                                    {new Date(course.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setEditingCourse(course)
                                                setEditValue(course.course_code)
                                                setEditRating(course.rating || 0)
                                                setEditGrade(course.grade || null)
                                            }}
                                            disabled={isPending}
                                        >
                                            <Edit2 className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(course.id)}
                                            disabled={isPending}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!editingCourse} onOpenChange={(open) => !open && setEditingCourse(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>
                            Update the course code.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="editCourseCode" className="text-right">
                                    Code
                                </Label>
                                <Input
                                    id="editCourseCode"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="col-span-3 uppercase"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Rating</Label>
                                <div className="col-span-3 flex h-10 items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setEditRating(star)}
                                            onMouseEnter={() => setEditHoveredRating(star)}
                                            onMouseLeave={() => setEditHoveredRating(0)}
                                            className="focus:outline-none transition-colors"
                                        >
                                            <Star
                                                className={`h-6 w-6 ${(editHoveredRating || editRating) >= star
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-muted-foreground hover:bg-muted rounded-md'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="editGrade" className="text-right">
                                    Grade
                                </Label>
                                <select
                                    id="editGrade"
                                    value={editGrade || ""}
                                    onChange={(e) => setEditGrade(e.target.value ? parseInt(e.target.value) : null)}
                                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">No Grade</option>
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
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditingCourse(null)}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Saving...' : 'Save changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
