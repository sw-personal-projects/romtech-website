import { getProjectById } from "@/actions/project/project-actions"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { UpdateForm } from "../_components/update-form"

export const metadata = {
    title: 'Dashboard | Update Project',
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await getProjectById(Number(id))
    if (!project) {
        return notFound()
    }
    return (
        <div className="h-screen mt-4">
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4">
                        {/* GO BACK BUTTON */}
                        <Link href="/dashboard/pages/projects" className="flex items-center gap-2">
                            <Button variant="outline">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back</span>
                            </Button>
                        </Link>
                        {/* PROJECT TITLE */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold">
                                Update Project
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Update the project details here.
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* UPDATE FORM */}
                    <UpdateForm project={project} />
                </CardContent>
            </Card>
        </div>
    )
}