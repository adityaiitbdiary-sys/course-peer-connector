import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">About Peer Connector</h1>
                <p className="text-muted-foreground mt-2">
                    Connecting students for a better learning experience.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <CardTitle>Course Reviews</CardTitle>
                        </div>
                        <CardDescription>
                            Understand workload and difficulty before signing up.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            We know how hard it is to pick electives. The goal of this platform is to help you
                            connect with seniors who have already taken the courses you are interested in.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="h-5 w-5 text-primary" />
                            <CardTitle>Direct Contact</CardTitle>
                        </div>
                        <CardDescription>
                            Reach out to peers directly to ask specific questions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            By searching for a course code, you can find the email and phone numbers of students
                            who have completed it, allowing you to ask about their firsthand experience.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-8 bg-muted/50">
                <CardContent className="pt-6">
                    <p className="text-sm text-center text-muted-foreground">
                        Built by Aditya. Help your juniors by adding your completed courses!
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
