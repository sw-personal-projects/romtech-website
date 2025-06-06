'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { FaCode, FaMobile, FaDatabase, FaCloud, FaReact } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiNodedotjs, SiGraphql, SiDocker, SiNestjs } from 'react-icons/si';
import { useEffect } from 'react';

const technologies = [
    { icon: <SiTypescript className="text-blue-600" size={32} />, name: "TypeScript" },
    { icon: <SiNextdotjs className="text-black dark:text-white" size={32} />, name: "Next.js" },
    { icon: <FaReact className="text-cyan-500" size={32} />, name: "React" },
    { icon: <SiNodedotjs className="text-green-600" size={32} />, name: "Node.js" },
    { icon: <SiGraphql className="text-pink-600" size={32} />, name: "GraphQL" },
    { icon: <FaDatabase className="text-blue-400" size={32} />, name: "Database" },
    { icon: <SiDocker className="text-blue-500" size={32} />, name: "Docker" },
    { icon: <FaCloud className="text-gray-400" size={32} />, name: "Cloud" },
    { icon: <FaMobile className="text-purple-500" size={32} />, name: "Mobile" },
    { icon: <FaCode className="text-yellow-500" size={32} />, name: "Code" },
    { icon: <SiNestjs className="text-pink-500" size={32} />, name: "Nest.js" },
] as const;


const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

const ProgrammingLanguagesSection = () => {
    const marqueeControls = useAnimationControls();
    useEffect(() => {
        const startMarquee = async () => {
            await marqueeControls.start({
                x: ['0%', '-100%'],
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 10,
                        ease: 'linear',
                    },
                },
            });
        };

        startMarquee();
    }, [marqueeControls]);

    return (
        <section className="mt-10 md:mt-[150px] px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl text-primary font-bold font-[Poppins]">
                        Our Technology Stack
                    </h2>
                </motion.div>

                <div className="relative overflow-hidden">
                    <div className="flex">
                        {[0, 1].map((i) => (
                            <motion.div
                                key={i}
                                className="flex gap-8 w-max"
                                animate={marqueeControls}
                            >
                                {technologies.map((tech, index) => (
                                    <motion.div
                                        key={`${tech.name}-${i}-${index}`}
                                        variants={itemVariants}
                                        className="flex flex-col items-center min-w-[80px] flex-shrink-0"
                                    >
                                        <motion.div whileHover={{ scale: 1.2 }} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                                            {tech.icon}
                                        </motion.div>
                                        <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProgrammingLanguagesSection;