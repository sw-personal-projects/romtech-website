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

interface Project {
    title: string;
    description: string;
    image: string;
}

const projects: Project[] = [
    {
        title: "Immigration Web App",
        description: "A platform where tourists can apply for visas or permits online.",
        image: "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg",
    },
    {
        title: "BBS Website",
        description: "An informative and dynamic website for the Bhutan Broadcasting Service.",
        image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    },
    {
        title: "Yellow Bhutan Website",
        description: "A cultural portal showcasing Bhutanese heritage and traditions.",
        image: "https://t4.ftcdn.net/jpg/02/83/46/33/360_F_283463385_mfnrx6RPU3BqObhVuVjYZjeZ5pegE7xq.jpg",
    },
    {
        title: "Kuensel News App",
        description: "A mobile news application delivering the latest updates from Kuensel.",
        image: "https://t4.ftcdn.net/jpg/02/83/46/33/360_F_283463385_mfnrx6RPU3BqObhVuVjYZjeZ5pegE7xq.jpg",
    },
    {
        title: "E-Gate",
        description: "An automated entry system for secure and efficient access management.",
        image: "https://t4.ftcdn.net/jpg/02/83/46/33/360_F_283463385_mfnrx6RPU3BqObhVuVjYZjeZ5pegE7xq.jpg",
    },
    {
        title: "Border Management Solution",
        description: "A comprehensive system for managing cross-border movement and security.",
        image: "https://t4.ftcdn.net/jpg/02/83/46/33/360_F_283463385_mfnrx6RPU3BqObhVuVjYZjeZ5pegE7xq.jpg",
    },
];

export function ProjectsSlider() {
    const [currentIndex, setCurrentIndex] = React.useState(1);
    const [api, setApi] = React.useState<CarouselApi | null>(null);

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
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-black/80 p-4 flex flex-col justify-end text-white"
                            >
                                <h2 className="text-xl font-bold">{item.title}</h2>
                                <p className="text-sm">{item.description}</p>
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
