import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AddProjectDialogBox from "./_components/add-project-dialog-box"
import ProjectList from "./_components/project-list"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
    title: 'Dashboard | Projects',
}
export default async function Page() {

    return (
        <div className="h-screen mt-4">
            {/* Secondary Header */}
            <Card className="shadow-md bg-gradient-to-r from-primary/5 to-primary/25 border border-border space-y-4">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-semibold">Projects</CardTitle>
                            <CardDescription className="text-muted-foreground text-sm">
                                Easily manage and update your Projects page content here.
                            </CardDescription>
                        </div>
                        <div>
                            <AddProjectDialogBox />
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Project List */}
            <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Card key={index} className="p-3">
                            <Skeleton className="w-full h-[200px]" />
                            <div className="flex flex-col gap-2">
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-full h-4" />
                            </div>
                            <div className="flex gap-4 justify-between">
                                <Skeleton className="w-full h-8" />
                                <Skeleton className="w-full h-8" />
                            </div>
                        </Card>
                    ))}
                </div>}>
                <ProjectList />
            </Suspense>

        </div>
    )
}