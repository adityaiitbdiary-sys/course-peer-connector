'use client'

import { searchCourse, type SearchResult } from '@/app/actions/search'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export default function SearchPage() {
    const [results, setResults] = useState<SearchResult[]>([])
    const [hasSearched, setHasSearched] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isPending, startTransition] = useTransition()

    async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setHasSearched(false)
        const formData = new FormData(event.currentTarget)
        const query = formData.get('query')?.toString() || ''
        setSearchQuery(query)

        startTransition(async () => {
            const result = await searchCourse(formData)
            if (result.error) {
                toast.error('Search Failed', { description: result.error })
                setResults([])
            } else if (result.data) {
                setResults(result.data)
            }
            setHasSearched(true)
        })
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Search Courses</h1>
                <p className="text-muted-foreground mt-2">
                    Find peers who have already taken the courses you are interested in.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lookup a Course</CardTitle>
                    <CardDescription>
                        Enter a course code to see a list of students to contact.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-4 items-end">
                        <div className="space-y-2 flex-1 max-w-md">
                            <Label htmlFor="query">Course Code</Label>
                            <Input
                                id="query"
                                name="query"
                                placeholder="Ex: ES 233"
                                className="uppercase"
                                required
                            />
                        </div>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                'Searching...'
                            ) : (
                                <>
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {hasSearched && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight">
                        Results for &quot;{searchQuery.toUpperCase()}&quot;
                    </h2>

                    {results.length === 0 ? (
                        <div className="text-center p-8 border rounded-lg bg-muted/20">
                            <p className="text-muted-foreground">No students found for this course yet.</p>
                        </div>
                    ) : (
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Roll No.</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Grad. Year</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {results.map((result) => (
                                        <TableRow key={result.id}>
                                            <TableCell className="font-medium">{result.profiles.name}</TableCell>
                                            <TableCell>{result.profiles.roll_number}</TableCell>
                                            <TableCell>
                                                <a href={`mailto:${result.profiles.email}`} className="text-primary hover:underline">
                                                    {result.profiles.email}
                                                </a>
                                            </TableCell>
                                            <TableCell>{result.profiles.phone || '-'}</TableCell>
                                            <TableCell>{result.profiles.graduation_year}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
