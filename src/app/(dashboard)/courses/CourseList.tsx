'use client'

import { deleteCourse, updateCourse } from '@/app/actions/courses'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type Course = {
    id: string
    course_code: string
    created_at: string
}

export default function CourseList({ courses }: { courses: Course[] }) {
    const [editingCourse, setEditingCourse] = useState<Course | null>(null)
    const [editValue, setEditValue] = useState('')
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

        startTransition(async () => {
            const result = await updateCourse(editingCourse.id, editValue)
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
                            <TableHead>Added On</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.course_code}</TableCell>
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
