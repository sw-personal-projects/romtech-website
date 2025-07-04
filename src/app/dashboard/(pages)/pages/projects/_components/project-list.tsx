export const dynamic = "force-dynamic";

import { Card, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { format } from "date-fns"
import { getProjects } from "@/actions/project/project-actions"
import DeleteProjectDialogBox from "./delete-project-dialog-box"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface ProjectListProps {
    id: number
    title: string
    desc: string
    imageUrl: string
    category: string
    createdAt: Date
}


export default async function ProjectList() {
    const projectData: ProjectListProps[] = await getProjects()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {projectData.map((project) => (
                <Card key={project.id} className="overflow-hidden transition-all hover:shadow-lg p-3">
                    <div className="h-[200px] w-full">
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            width={700}
                            height={700}
                            className="object-cover w-full h-full rounded-lg border border-border"
                        />
                    </div>
                    {/* PROJECT DETAILS */}
                    <div className="p-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-lg font-semibold">{project.title}</h1>
                                <p className="text-xs text-muted-foreground">{format(project.createdAt, 'dd MMM yyyy')}</p>
                            </div>
                            <div className="bg-accent px-4 rounded-lg">
                                <span className="text-xs text-muted-foreground">{project.category}</span>
                            </div>
                        </div>
                        <CardContent className="p-0 mt-2">
                            <CardDescription>{project.desc}</CardDescription>
                        </CardContent>
                    </div>
                    {/* ACTIONS */}
                    <div className="w-full grid grid-cols-2 gap-2">
                        {/* UPDATE */}
                        <Link href={`/dashboard/pages/projects/${project.id}`} className="w-full">
                            <Button variant="outline" className="w-full">
                                Update
                            </Button>
                        </Link >
                        {/* DELETE */}
                        <DeleteProjectDialogBox project={project} />
                    </div>
                </Card>
            ))}
        </div>
    )
}