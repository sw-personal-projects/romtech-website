"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Project = {
    id: number;
    imageUrl: string;
    title: string;
    desc: string;
    detailDes: string[];
    category: string;
    createdAt: string;
};



export function ProjectsSlider({ projects }: { projects: Project[] }) {
    const [currentIndex, setCurrentIndex] = React.useState(1);
    const [api, setApi] = React.useState<CarouselApi | null>(null);
    const router = useRouter();

    React.useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrentIndex(api.selectedScrollSnap());
        };

        api.on("select", onSelect);
        // Call it once to sync initial state
        onSelect();

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    return (
        <Carousel
            className="w-full"
            opts={{ align: "start", loop: true }}
            setApi={setApi}
        >
            <CarouselContent>
                {projects.map((item, index) => (
                    <CarouselItem className="md:basis-1/2" key={index}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full h-[400px] p-0 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
                            onClick={
                                () => router.push(`/our-projects/${item.id}`)
                            }
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={500}
                                height={500}
                                className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-black/80 p-4 flex flex-col justify-end text-white"
                            >
                                <h2 className="text-xl font-bold pb-2">{item.title}</h2>
                                <p className="text-sm pb-4">{item.desc}</p>
                            </motion.div>
                        </motion.div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="flex items-center justify-between gap-4 mt-4 px-2">
                <CarouselPrevious className="rounded-xl w-12 h-12" />
                <p className="text-sm font-medium">
                    {(currentIndex + 1).toString().padStart(2, "0")} / {projects.length.toString().padStart(2, "0")}
                </p>
                <CarouselNext className="rounded-xl w-12 h-12" />
            </div>
        </Carousel>
    );
}
