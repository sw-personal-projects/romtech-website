import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchProjectData } from "@/actions/project-actions";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

type Project = {
    id: number;
    imageUrl: string;
    title: string;
    desc: string;
    detailDes: string[];
    category: string;
    createdAt: string | Date;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const data = await fetchProjectData().catch(() => [])
    const project = data.find((item: Project) => item.id === Number.parseInt(id))

    return {
        title: project ? `ROM-TECH | ${project.title}` : "Project Not Found",
        description: project?.desc ?? "No project found with this ID.",
        openGraph: {
            images: project?.imageUrl ? [{ url: project.imageUrl }] : [],
        },
    }
}

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const data = await fetchProjectData().catch(() => []);
    const project = data.find((item: Project) => item.id === parseInt(id));

    if (!project) return notFound();

    const formattedDate = format(
        project.createdAt instanceof Date ? project.createdAt : new Date(project.createdAt),
        "MMMM d, yyyy"
    );

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
            <div className="mb-6">
                <Button asChild variant="ghost" className="pl-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Link href="/our-projects" className="flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        <span className="font-medium">Back to Projects</span>
                    </Link>
                </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="relative h-64 md:h-[600px] w-full rounded-lg overflow-hidden shadow-lg md:sticky md:top-24 self-start">
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                <div className="space-y-6">
                    <CardHeader className="px-0 pt-0">
                        <div className="flex flex-col gap-4">
                            <div>
                                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="mt-3 text-sm text-primary/70">
                                    {project.desc}
                                </CardDescription>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium capitalize">
                                    {project.category}
                                </Badge>
                                <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                                    {formattedDate}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="px-0 space-y-6">
                        {project.detailDes.map((item: string, index: number) => (
                            <p key={index} className="text-primary/80 text-[15px]">
                                {item}
                            </p>
                        ))}
                    </CardContent>

                    <div className="pt-4">
                        <Button asChild className="w-full md:w-auto">
                            <Link href="/contact" className="font-medium">
                                Interested in this project?
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}