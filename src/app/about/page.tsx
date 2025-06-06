import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "ROM-TECH | ABOUT",
    description: "Software company specializing in web, app development and technology solutions.",
};

export default function About() {
    return (
        <div className="min-h-screen">
            <div className="w-full h-[80vh] relative">
                <img src="/about.webp" alt="about" className="w-full h-full object-cover object-center" />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                    <h1 className="text-8xl font-bold text-white font-[Poppins]">About Us</h1>
                    <p className="text-white text-center mt-4 text-lg font-[Poppins]">Empowering Bhutan and Beyond with Innovative Software Solutions</p>
                </div>
            </div>
            <div className="container mx-auto mt-[150px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <Image src="/vision-mission.png" alt="vision-mission" width={500} height={500} className="object-contain" />
                    </div>
                    <div className="flex flex-col justify-center gap-10">
                        <div>
                            <h2 className="text-4xl font-bold font-[Poppins] text-primary">Our Vision</h2>
                            <p className="text-primary/80 mt-3 text-sm text-center md:text-start">
                                Our mission is to empower businesses with robust, scalable, and
                                innovative IT solutions that drive efficiency, enhance productivity,
                                and foster growth. We strive to understand the unique challenges and
                                objectives of each client to deliver customized solutions that meet and
                                exceed expectations.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold font-[Poppins] text-primary">Our Mission</h2>
                            <p className="text-primary/80 mt-3 text-sm text-center md:text-start">
                                To be a leading and respected IT solutions provider in the region,
                                committed to fostering digital transformation, innovation, and excellence.
                                We aspire to contribute significantly to the development of a knowledge-based
                                society in line with the objectives set by His Majesty the King.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}