"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function HeroBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const floatingBgRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter()

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create floating tech elements
            const createFloatingElements = () => {
                if (!floatingBgRef.current) return;

                // Clear existing elements
                floatingBgRef.current.innerHTML = '';

                // Create floating elements
                const elementsCount = window.innerWidth < 768 ? 15 : 25;
                for (let i = 0; i < elementsCount; i++) {
                    const element = document.createElement('div');
                    element.className = 'absolute rounded-full tech-element';

                    // Random properties
                    const size = 4 + Math.random() * (window.innerWidth < 768 ? 6 : 8);
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;
                    const opacity = 0.1 + Math.random() * 0.3;
                    const duration = 5 + Math.random() * 10;
                    const delay = Math.random() * 10;

                    element.style.width = `${size}px`;
                    element.style.height = `${size}px`;
                    element.style.left = `${posX}%`;
                    element.style.top = `${posY}%`;
                    element.style.backgroundColor = 'var(--primary)';
                    element.style.opacity = `${opacity}`;

                    floatingBgRef.current.appendChild(element);

                    // Animate each element
                    gsap.to(element, {
                        x: (Math.random() - 0.5) * 80,
                        y: (Math.random() - 0.5) * 60,
                        duration: duration,
                        delay: delay,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    });
                }
            };

            createFloatingElements();

            // Main content animations
            gsap.from('.hero-content > *', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                delay: 0.5,
                ease: 'power3.out'
            });

            // Continuous subtle movement for the background
            gsap.to(floatingBgRef.current, {
                x: '+=5',
                y: '+=3',
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: 'none'
            });

            // Handle window resize
            const handleResize = () => {
                createFloatingElements();
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);

        }, containerRef);

        return () => ctx.revert();
    }, []);
    return (
        <div
            ref={containerRef}
            className="bg-background overflow-hidden relative h-[93vh] flex items-center"
        >
            {/* Floating background elements */}
            <div
                ref={floatingBgRef}
                className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            />

            {/* Video overlay with gradient */}
            <div className="absolute inset-0 h-full w-full">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src='/hero-video.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>


            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce p-3 bg-background rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10 hero-content">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-white to-green-200 mb-6 font-[Poppins] tracking-tighter leading-tight drop-shadow-lg">
                            ROM TECH
                        </h1>
                    </div>

                    <p className="md:text-[16px] text-[14px] text-white/95 mb-8 uppercase max-w-2xl mx-auto leading-relaxed">
                        Cutting-edge technology solutions tailored to your business needs.
                        We deliver excellence through innovation and expertise.
                    </p>
                </div>
                <div className="mt-16 px-4 sm:px-6 lg:px-8 flex justify-center">
                    <div className="relative w-full max-w-4xl">
                        {/* SVG curves container */}
                        <svg
                            className="absolute hidden md:block inset-0 w-full h-full"
                            viewBox="0 0 500 273"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0.729318 266.75C9.0863 -83.4397 493.097 -89.7223 497.728 270.857"
                                stroke="#0CB574"
                                strokeWidth="1"
                                fill="none"
                                className="opacity-40"
                            />
                            <path
                                d="M53.4234 266.541C60.0864 -20.5811 440.191 -25.8705 443.725 269.766"
                                stroke="#0CB574"
                                strokeWidth="1"
                                fill="none"
                                className="opacity-60"
                            />
                            <path
                                d="M99.5663 267.211C104.651 48.8407 395.227 44.8301 397.938 269.677"
                                stroke="#0CB574"
                                strokeWidth="1"
                                fill="none"
                                className="opacity-80"
                            />
                            <path
                                d="M133 271.085C137.014 93.6077 362.704 90.2616 364.743 273"
                                stroke="#0CB574"
                                strokeWidth="1.5"
                                fill="none"
                            />
                        </svg>

                        {/* Icons grid */}
                        <div className="grid grid-cols-4 md:grid-cols-4 md:gap-8 mx-auto relative z-10">
                            {[
                                {
                                    title: 'Reliable',
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Secure',
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Scalable',
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18" />
                                            <path d="M3 12h18" />
                                            <path d="M3 18h18" />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Innovative',
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    )
                                }
                            ].map((item, index) => (
                                <div key={index} className="text-center">
                                    <div
                                        className={`h-12 w-12 mx-auto md:mb-3 rounded-full bg-accent/50 flex items-center justify-center transition-all hover:bg-accent hover:scale-110 ${index % 2 === 0 ? 'mt-0' : 'md:mt-6'
                                            }`}
                                    >
                                        {item.icon}
                                    </div>
                                    <p className="text-sm font-medium text-white">{item.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Solutions</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="flex flex-row gap-4 justify-center mt-10">
                    <Button
                        variant="default"
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 py-6 text-lg shadow-lg hover:shadow-primary/30 transition-all"
                        onClick={() => router.push('/services')}
                    >
                        Explore services
                    </Button>
                    <Button
                        size="lg"
                        className="border bg-transparent text-white border-white hover:bg-white hover:text-black font-medium px-8 py-6 text-lg transition-all hidden md:inline-flex"
                        onClick={() => router.push('/contact')}

                    >
                        Contact us
                    </Button>
                </div>
            </div>
        </div>
    );
}


