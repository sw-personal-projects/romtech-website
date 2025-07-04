/* eslint-disable @next/next/no-img-element */
'use client'
import FadeInSlideUp from "@/components/animations/fade-in-slide-up";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Project {
    id: number;
    title: string;
    category: string;
    desc: string;
    detailDescription: string[];
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ProjectGridProps {
    projects: Project[];
}

const cardVariants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

export function ProjectGrid({ projects }: ProjectGridProps) {
    const router = useRouter()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
                <FadeInSlideUp delay={0.01 + index * 0.1} key={index}>
                    <motion.div
                        key={`${project.title}-${index}`}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={cardVariants}
                        transition={{ delay: index * 0.1 }}
                    >
                        <motion.div
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <Card className="border border-primary/10 h-full flex flex-col">
                                <CardHeader className="p-0">
                                    <motion.div
                                        className="relative h-50 w-full overflow-hidden rounded-[10px] px-4"
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <img
                                            src={project.imageUrl}
                                            alt={`${project.title} project`}
                                            className="object-cover w-full h-full rounded-[10px]"
                                            width={400}
                                            height={300}
                                        />
                                    </motion.div>
                                </CardHeader>
                                <CardContent className="p-4 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <CardTitle className="text-lg font-semibold">
                                            {project.title}
                                        </CardTitle>
                                        <motion.span
                                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {project.category}
                                        </motion.span>
                                    </div>
                                    <CardDescription className="text-sm text-gray-600 line-clamp-2 mb-4">
                                        {project.desc}
                                    </CardDescription>
                                    <div className="mt-auto">
                                        <div className="text-xs text-gray-500 mb-3">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </div>
                                        <Button variant='outline' className="mt-4" onClick={
                                            () => router.push(`/our-projects/${project.id}`)
                                        }>
                                            Read More
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </FadeInSlideUp>

            ))}
        </div>
    );
}