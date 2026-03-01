import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, HelpCircle, Heart } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="space-y-8 max-w-3xl mx-auto pb-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">About CourseMate</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    A platform built by students, for students, to make course selection a bit easier.
                </p>
            </div>

            <div className="space-y-8 text-foreground/90 leading-relaxed">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        Purpose of the Platform
                    </h2>
                    <p>
                        CourseMate helps students connect with seniors who have already taken additional courses. The goal is simple: to help you understand a course&apos;s true difficulty, workload, and overall experience before you choose to enroll in it.
                    </p>
                    <p>This includes:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Department Electives</li>
                        <li>Institute Electives</li>
                        <li>Minor Courses</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Why It Was Built
                    </h2>
                    <p>
                        When course registration rolls around, students often don&apos;t have a clear way to know what a course is really like beyond its syllabus. This platform aims to make that process less stressful through peer guidance and shared experiences. Sometimes, a quick chat with someone who has been there makes all the difference.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        How It Works
                    </h2>
                    <p>
                        It&apos;s straightforward: students add the courses they have completed to their profile. Other students can then search for a specific course to find a list of seniors who took it, and easily reach out to them for advice.
                    </p>
                </section>

                <section className="pt-6">
                    <Card className="bg-muted/30 border-muted">
                        <CardHeader className="pb-4 flex flex-col md:flex-row md:items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-accent/50 flex flex-col items-center justify-center border-2 border-primary/20 shrink-0 mx-auto md:mx-0 overflow-hidden">
                                <span className="text-[10px] text-muted-foreground text-center px-1 leading-tight">
                                    (Image placeholder)
                                </span>
                            </div>
                            <div className="text-center md:text-left">
                                <CardTitle className="flex justify-center md:justify-start items-center gap-2 text-xl mb-1">
                                    Creator
                                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                                </CardTitle>
                                <p className="text-sm italic text-muted-foreground">
                                    &quot;Created by Aditya Jaswani for students, with the hope that sharing experiences makes course selection a little easier for everyone.&quot;
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 pt-4 border-t border-border/50 text-sm md:text-base">
                                <p><strong>Name:</strong> Aditya Jaswani</p>
                                <p><strong>Roll No:</strong> 24B4245</p>
                                <p>
                                    <strong>Email:</strong> <a href="mailto:24b4245@iitb.ac.in" className="text-primary hover:underline">24b4245@iitb.ac.in</a>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
