import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjects } from "@/actions/project/project-actions";
import { ProjectGrid } from "./_components/project-card";



export const metadata: Metadata = {
    title: "ROM-TECH | OUR PROJECTS",
    description: "Software company specializing in web, app development and technology solutions.",
};

export const dynamic = "force-dynamic";

export default async function OurProjects() {
    const projectData = await getProjects();
    return (
        <div>
            <div className="w-full h-[40vh] relative">
                <Image src="/project-hero.jpg"
                    alt="about"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                    <h1 className="text-6xl md:text-8xl font-bold text-white font-[Poppins]">Our Projects</h1>
                    <p className="text-white text-center mt-4 text-lg font-[Poppins] px-4 md:px-0 w-full md:w-[50%]">
                        We deliver innovative digital solutions, specializing in web development, interactive UI/UX, 3D applications, and automation tools—crafted with precision, creativity, and scalability
                    </p>
                </div>
            </div>

            {/* Our Project Section */}
            <div className="container mx-auto mt-10 px-4 md:px-0">
                <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
                    <ProjectGrid projects={projectData} />
                </Suspense>
            </div>
        </div>
    );
}