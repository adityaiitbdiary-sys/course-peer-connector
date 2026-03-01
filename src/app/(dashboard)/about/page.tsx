import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, HelpCircle, Heart, Search, MessageSquare } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="space-y-16 max-w-5xl mx-auto pb-12">
            {/* Intro Section */}
            <div className="text-center max-w-2xl mx-auto mt-8">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">About Peer Connect</h1>
                <p className="text-muted-foreground mt-4 text-lg">
                    A platform built by students, for students, to make course selection a bit easier.
                </p>
            </div>

            {/* How it works section (Matched to User Design) */}
            <div className="py-8">
                <div className="text-center mb-12 flex flex-col items-center">
                    <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2">Process</span>
                    <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
                    <div className="h-1 w-10 bg-blue-600 mt-4 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                            <Search className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">1. Enter Course</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Simply type in your course code or title to instantly see the full class enrollment list for your section.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                            <Users className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">2. Find Peers</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Browse profiles of verified students currently enrolled in your class and see their study preferences.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                            <MessageSquare className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">3. Connect</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Get contact info or send a direct message to start collaborating on projects or forming study groups.
                        </p>
                    </div>
                </div>
            </div>

            {/* Legacy Details Section */}
            <div className="space-y-12 text-foreground/90 leading-relaxed max-w-3xl mx-auto pt-8 border-t">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        Purpose of the Platform
                    </h2>
                    <p>
                        Peer Connect helps students connect with seniors who have already taken additional courses. The goal is simple: to help you understand a course&apos;s true difficulty, workload, and overall experience before you choose to enroll in it.
                    </p>
                    <p>This includes:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Department Electives</li>
                        <li>Institute Electives</li>
                        <li>Minor Courses</li>
                    </ul>
                </section>

                <section className="pt-6">
                    <Card className="bg-slate-50 border-slate-200 shadow-sm">
                        <CardHeader className="pb-4 flex flex-col md:flex-row md:items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-slate-200 flex flex-col items-center justify-center border-2 border-white shadow-sm shrink-0 mx-auto md:mx-0 overflow-hidden">
                                <span className="text-[10px] text-slate-500 text-center px-1 leading-tight">
                                    (Image placeholder)
                                </span>
                            </div>
                            <div className="text-center md:text-left">
                                <CardTitle className="flex justify-center md:justify-start items-center gap-2 text-xl mb-1 text-slate-900">
                                    Creator
                                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                                </CardTitle>
                                <p className="text-sm italic text-slate-600">
                                    &quot;Created by Aditya Jaswani for students, with the hope that sharing experiences makes course selection a little easier for everyone.&quot;
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 pt-4 border-t border-slate-200 text-sm md:text-base text-slate-700">
                                <p><strong>Name:</strong> Aditya Jaswani</p>
                                <p><strong>Roll No:</strong> 24B4245</p>
                                <p>
                                    <strong>Email:</strong> <a href="mailto:24b4245@iitb.ac.in" className="text-blue-600 hover:text-blue-700 hover:underline">24b4245@iitb.ac.in</a>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
