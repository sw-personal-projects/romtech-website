/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import Image from "next/image";
import TeamSection from "./_components/team-member";
import ScaleUpBlur from "@/components/animations/scale-up-blur";

export const metadata: Metadata = {
    title: "ROM-TECH | ABOUT",
    description: "Software company specializing in web, app development and technology solutions.",
};

export default function About() {
    return (
        <div className="min-h-screen">
            <div className="w-full h-[40vh] relative">
                <img src="/about.webp" alt="about" className="w-full h-full object-cover object-center" />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                    <h1 className="text-6xl md:text-8xl font-bold text-white font-[Poppins]">About Us</h1>
                    <p className="text-white text-center mt-4 text-lg font-[Poppins] w-[70%] md:w-[60%]">Empowering Bhutan and Beyond with Innovative Software Solutions</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-10 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <div className="order-2 md:order-1">
                        <ScaleUpBlur>
                            <Image
                                src="/vision-mission.png"
                                alt="Vision and Mission"
                                width={600}
                                height={600}
                                className="w-full h-auto object-contain max-w-[500px] mx-auto"
                            />
                        </ScaleUpBlur>

                    </div>

                    {/* Content Section */}
                    <div className="order-1 md:order-2 space-y-12">
                        {/* Vision */}
                        <ScaleUpBlur delay={0.3}>
                            <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-8 bg-primary rounded-full"></div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-primary font-[Poppins]">
                                        Our Vision
                                    </h2>
                                </div>
                                <p className="text-primary/80 leading-relaxed">
                                    To be a leading and respected IT solutions provider in the region,
                                    committed to fostering digital transformation, innovation, and excellence.
                                    We aspire to contribute significantly to the development of a knowledge-based
                                    society in line with the objectives set by His Majesty the King.
                                </p>
                            </div>
                        </ScaleUpBlur>


                        {/* Mission */}
                        <ScaleUpBlur delay={0.6}>
                            <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-8 bg-primary rounded-full"></div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-primary font-[Poppins]">
                                        Our Mission
                                    </h2>
                                </div>
                                <p className="text-primary/80 leading-relaxed">
                                    Our mission is to empower businesses with robust, scalable, and
                                    innovative IT solutions that drive efficiency, enhance productivity,
                                    and foster growth. We strive to understand the unique challenges and
                                    objectives of each client to deliver customized solutions that meet and
                                    exceed expectations.
                                </p>
                            </div>
                        </ScaleUpBlur>

                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:py-32">
                <TeamSection />
            </div>
        </div>
    );
}