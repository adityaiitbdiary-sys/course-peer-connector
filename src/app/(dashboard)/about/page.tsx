import { Search, Users, Flag, User, Link as LinkIcon, Mail, FolderOpen, Blocks } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="max-w-6xl mx-auto pb-12 text-black font-sans">

            <div className="grid lg:grid-cols-3 gap-12 items-start">

                {/* Left Column (Purpose + How it works) */}
                <div className="lg:col-span-2 space-y-16">

                    {/* Purpose Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Flag className="w-8 h-8 text-black" strokeWidth={2.5} />
                            <h2 className="text-3xl font-extrabold tracking-tight">Purpose</h2>
                        </div>
                        <div className="space-y-4 text-slate-800 leading-relaxed font-medium">
                            <p>
                                This platform is built to help students make more informed decisions
                                while choosing their courses by making it easier to find and connect
                                with seniors who have already taken them. Often, it is difficult to know
                                whom to approach for guidance, especially for department electives,
                                institute electives, or minor courses. The website simply provides a way
                                to identify and reach out to the right people.
                            </p>
                            <p>
                                The purpose is to create a reliable directory where students can search
                                for a course and see the contact details of those who have taken it, so
                                they can directly connect and ask their questions. By making these
                                connections easier, the platform aims to reduce confusion and make
                                course selection a smoother process for everyone.
                            </p>
                        </div>
                    </section>

                    {/* How it Works Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Blocks className="w-8 h-8 text-black" strokeWidth={2.5} />
                            <h2 className="text-3xl font-extrabold tracking-tight">How it Works</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="border border-black rounded-xl p-8 bg-white shadow-sm hover:-translate-y-1 transition-transform duration-200">
                                <div className="w-12 h-12 border border-black bg-blue-50/50 rounded-lg flex items-center justify-center mb-6">
                                    <Search className="w-6 h-6 text-black" strokeWidth={2} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">01. Search a Course</h3>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                    Enter the course code to quickly find whether students have previously taken it. The platform helps you identify the right course connections without having to search through multiple sources or ask around randomly.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="border border-black rounded-xl p-8 bg-white shadow-sm hover:-translate-y-1 transition-transform duration-200">
                                <div className="w-12 h-12 border border-black bg-blue-50/50 rounded-lg flex items-center justify-center mb-6">
                                    <Users className="w-6 h-6 text-black" strokeWidth={2} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">02. Find Students</h3>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                    Once you search, the system shows a list of students who have taken that course, along with their basic details and contact information. This makes it easy to know exactly whom you can approach for guidance.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="border border-black rounded-xl p-8 bg-white shadow-sm hover:-translate-y-1 transition-transform duration-200">
                                <div className="w-12 h-12 border border-black bg-blue-50/50 rounded-lg flex items-center justify-center mb-6">
                                    <FolderOpen className="w-6 h-6 text-black" strokeWidth={2} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">03. Reach Out</h3>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                    You can directly contact the listed students to ask your questions and understand the course better. The aim is simply to make it easier to connect with the right people when deciding your courses.
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div className="border border-black rounded-xl p-8 bg-white shadow-sm hover:-translate-y-1 transition-transform duration-200">
                                <div className="w-12 h-12 border border-black bg-blue-50/50 rounded-lg flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity w-6 h-6 text-black"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">04. Add Your Courses</h3>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                    To keep the platform useful for everyone, users add the courses they have completed. This helps build the directory so future students can also find and connect with the right people.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Column (Meet the Creator) */}
                <div className="relative top-0 lg:sticky lg:top-8 mt-4 lg:mt-0 flex flex-col gap-6">
                    <div className="border border-black rounded-3xl p-8 bg-slate-50 flex flex-col items-center text-center shadow-sm">

                        <div className="flex items-center gap-3 mb-10 w-full justify-center lg:justify-start">
                            <User className="w-6 h-6 flex-shrink-0" strokeWidth={2.5} />
                            <h2 className="text-2xl font-extrabold tracking-tight text-left leading-tight">Meet the<br />Creator</h2>
                        </div>

                        <div className="w-48 h-48 rounded-full border border-black shadow-sm overflow-hidden mb-8 relative bg-white flex items-center justify-center">
                            <Image
                                src="/aditya.jpeg"
                                alt="Aditya Jaswani"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>

                        <h3 className="text-2xl font-extrabold mb-1 tracking-tight">Aditya Jaswani</h3>
                        <p className="text-xl font-bold mb-1 tracking-tight">24B4245</p>
                        <p className="text-lg font-bold mb-10 tracking-tight">24b4245@iitb.ac.in</p>

                        <div className="w-16 h-px bg-black opacity-20 mb-8"></div>

                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-black shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200">
                                <LinkIcon className="w-4 h-4" />
                            </a>
                            <a href="mailto:24b4245@iitb.ac.in" className="w-10 h-10 rounded-full bg-white border border-black shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200">
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>

                    </div>

                    {/* Meaning of B42 Box */}
                    <div className="border border-black rounded-3xl p-8 bg-slate-50 flex flex-col text-left shadow-sm">
                        <h3 className="text-xl font-bold mb-4 tracking-tight">Why <span className="bg-black text-white px-2 py-1 rounded-md ml-1">B42</span> ?</h3>
                        <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-medium">
                            <p>
                                <strong>B42</strong> is more than just a name - <strong>B4</strong> sounds like &quot;before,&quot; a reminder to always check in before choosing your courses.
                            </p>
                            <p>
                                And <strong>42</strong>? It is the roll number that started it all; if you know, you know.
                            </p>
                            <p className="pt-4 mt-2 border-t border-black/10 text-black font-bold text-base">
                                Put it together, and you get something simple: before you decide, check B42.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
