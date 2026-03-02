import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function SuggestionsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Suggestions</h1>
                <p className="text-muted-foreground">
                    Help us improve by sharing your feedback and suggestions.
                </p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Submit a Suggestion</CardTitle>
                    <CardDescription>
                        We value your input. Let us know what features or improvements you'd like to see.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Brief summary of your suggestion (e.g., Add dark mode)" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Details</Label>
                            <Textarea
                                id="description"
                                placeholder="Please provide more details about your suggestion..."
                                className="min-h-[150px]"
                                required
                            />
                        </div>
                        <Button type="button">Submit Suggestion</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
