import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/actions/auth'
import { User, Info, Search, LogOut, BookOpen } from 'lucide-react'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 border-r bg-muted/40 p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3 font-bold text-2xl px-2 mb-4">
                    <img src="/B42_logo.png" alt="B42 Logo" className="h-8 w-auto object-contain rounded-md" />
                    <span className="tracking-tight">B42</span>
                </div>

                <nav className="flex flex-col gap-1 flex-1">
                    <Link href="/about" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors">
                        <Info className="h-4 w-4" />
                        About
                    </Link>
                    <Link href="/search" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors">
                        <Search className="h-4 w-4" />
                        Search Courses
                    </Link>
                    <Link href="/courses" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors">
                        <BookOpen className="h-4 w-4" />
                        My Courses
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors">
                        <User className="h-4 w-4" />
                        Edit Profile
                    </Link>
                </nav>

                <div className="mt-auto">
                    <form action={signOut}>
                        <Button variant="outline" className="w-full justify-start gap-3" type="submit">
                            <LogOut className="h-4 w-4" />
                            Log Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
