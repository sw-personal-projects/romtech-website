/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import RotateIn from '@/components/animations/rotate-in';
import PopUp from '@/components/animations/pop-up';
import ScaleUpBlur from '@/components/animations/scale-up-blur';

interface TeamMember {
    name: string;
    role: string;
    imageUrl: string;
}

export default function TeamSection() {
    const teamMembers: TeamMember[] = [
        {
            name: 'Tshering Nidup',
            role: 'Head',
            imageUrl: '/assets/team-member/tshering-nidup.jpeg',
        },
        {
            name: 'Tenzin Tshering',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/tenzin-tshering.jpeg',
        },
        {
            name: 'Sonam Dema',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/sonam-dema.jpeg',
        },
        {
            name: 'Sonam Choden',
            role: 'Accounts Officer',
            imageUrl: '/assets/team-member/sonam-choden.jpeg',
        },
        {
            name: 'Karma Wangdi Tamang',
            role: 'UI/UX Designer',
            imageUrl: '/assets/team-member/karma-wangdi-tamang.jpeg',
        },
        {
            name: 'Kelden Jamtsho',
            role: "Marketing Officer",
            imageUrl: "/assets/team-member/kelden-jamtsho.jpeg",
        },
        {
            name: 'Sonam Wangchuk',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/sonam-wangchuk.jpeg',
        },
        {
            name: 'Yuadhistra Hang Subba',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/yuadhistra-hang-subba.jpeg',
        },
        {
            name: 'Tandin Gyeltshen',
            role: 'Executive Assistant',
            imageUrl: '/assets/team-member/tandin-gyeltshen.png',
        },
        {
            name: 'Dorji Phuntsho',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/dorji-phuntsho.jpeg',
        },
        {
            name: 'Shyam Basnet',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/shyam-basnet.png',
        },
        {
            name: 'Tenzin Yoezer',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/tenzin-yoezer.jpeg',
        },
        {
            name: 'Tenzin Tshomo',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/tenzin-tshomo.jpeg',
        },
        {
            name: 'Tandin Phuntsho',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/tandin-phuntsho.jpeg',
        },
        {
            name: 'Ngawang Dorji',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/ngawang-dorji.jpeg',
        },
        {
            name: 'Sonam Tenzin',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/sonam-tenzin.jpeg',
        },
        {
            name: 'Asseh Nepal',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/assh-nepal.jpeg',
        },
        {
            name: 'Sumit Adhikari',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/sumitadhikari.jpeg',
        },
        {
            name: "Udap Kharka",
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/udapkharka.jpeg',
        },
        {
            name: "Jimpa Jamtsho",
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/jimpa-jamtsho.jpeg',

        },
        {
            name: 'Karma Lhamo',
            role: 'Caretaker',
            imageUrl: '/assets/team-member/karma-lhamo.jpeg',
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                mass: 0.5,
            },
        },
    };

    const hoverItem = {
        scale: 1.05,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 15,
        },
    };

    const cardVariants = {
        initial: {
            borderRadius: '50%',
            width: '12rem',
            height: '12rem',
            filter: 'grayscale(100%)',
        },
        hover: {
            borderRadius: '0.5rem',
            width: '16rem',
            height: '16rem',
            filter: 'grayscale(0%)',
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 15,
            }
        }
    };

    const contentVariants = {
        initial: { opacity: 0, y: 10 },
        hover: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.3
            }
        }
    };

    return (
        <div className="py-12 px-4">
            <PopUp delay={0.1}>
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="text-4xl md:text-6xl font-bold text-center font-[Poppins]"
                >
                    Meet Our Team
                </motion.h2>
            </PopUp>


            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="hidden md:flex flex-wrap justify-center gap-8 mt-[90px]"
            >
                {teamMembers.map((member, index) => {
                    const [isHovered, setIsHovered] = useState(false);

                    return (
                        <RotateIn delay={0.001 + index * 0.1} key={index}>
                            <motion.div
                                variants={item}
                                whileHover={hoverItem}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                className={`relative ${index % 2 === 0 ? "" : ""}`}
                            >
                                <motion.div
                                    className="relative overflow-hidden bg-gray-200"
                                    initial="initial"
                                    animate={isHovered ? "hover" : "initial"}
                                    variants={cardVariants}
                                >
                                    <motion.img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="w-full h-full object-cover object-top"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.4 }}
                                    />

                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/0 flex flex-col justify-end p-4"
                                        variants={contentVariants}
                                        initial="initial"
                                        animate={isHovered ? "hover" : "initial"}
                                    >
                                        <h3 className="text-xl font-bold text-white font-[Poppins] text-center">
                                            {member.name}
                                        </h3>
                                        <p className="text-lg text-white/80 font-[Poppins] text-center">
                                            {member.role}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </RotateIn>
                    );
                })}
            </motion.div>

            {/* Mobile  */}
            <div className='grid grid-cols-1 gap-4 md:hidden mt-8'>
                {teamMembers.map((member, index) => (
                    <ScaleUpBlur delay={0.01 + index * 0.1} key={index}>
                        <div className="team-member-card w-full h-[400px] relative">
                            <Image
                                src={member.imageUrl}
                                alt={member.name}
                                width={500}
                                height={500}
                                className='w-full h-full object-cover object-top rounded-3xl border border-primary/30'
                            />
                            <div className='absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-black/60 flex justify-center items-end'>
                                <div className='p-4'>
                                    <h3 className="text-xl font-bold text-white font-[Poppins] text-center">
                                        {member.name}
                                    </h3>
                                    <p className="text-lg text-white/80 font-[Poppins] text-center">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScaleUpBlur>
                ))}
            </div>
        </div>
    );
}