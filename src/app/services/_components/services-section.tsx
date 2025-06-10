/* eslint-disable @next/next/no-img-element */
"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const StackingCards = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const [isMobile, setIsMobile] = useState(false)

    const services = [
        {
            id: 1,
            title: "System and Mobile App Development",
            imageUrl: "https://romtech.bt/wp-content/uploads/2024/10/mobile-app-1024x899.png",
            description:
                "Our team of highly skilled professionals is dedicated to staying at the forefront of technological advancements. With expertise in various programming languages, frameworks, and tools, we ensure that our software applications and mobile apps are not only cutting-edge but also user-friendly and efficient. We employ best practices in software development, ensuring robust, scalable, and secure solutions tailored to meet the unique requirements of each client. Our commitment to excellence drives us to deliver high-quality products that exceed client expectations and contribute to their business success.",
        },
        {
            id: 2,
            title: "Web Development",
            imageUrl: "https://romtech.bt/wp-content/uploads/2024/10/Web-development.png",
            description:
                "Our primary focus is on crafting visually appealing and engaging designs for both web and mobile interfaces. We believe that design plays a crucial role in bridging the emotional and credibility aspects of the end-user's interaction with the company, its services, and its products.",
        },
        {
            id: 3,
            title: "Hardware Equipment",
            imageUrl: "https://romtech.bt/wp-content/uploads/2024/10/hardware-equipment-1-1024x718.png",
            description:
                "Additionally, we provide a comprehensive range of ICT equipment, mechanical and electrical devices, home appliances, and accessories. Moreover, we offer end-to-end integration services with software systems, ensuring seamless connectivity and functionality between hardware and software components.",
        },
        {
            id: 4,
            title: "Audio-Visual Production",
            imageUrl: "https://romtech.bt/wp-content/uploads/2024/10/audio-visual.png",
            description:
                "Our audio-visual production service offers a comprehensive solution for all your visual and auditory content needs. Whether you need professional video production, sound engineering, or a combination of both, we have the expertise and resources to deliver exceptional results.",
        },
        {
            id: 5,
            title: "Design Services",
            imageUrl: "https://romtech.bt/wp-content/uploads/2024/10/design-services-1024x892.png",
            description:
                "Our design services cover a broad spectrum of creative solutions, including logo design, brochure design, poster design, and more. We recognize the importance of impactful visual elements in establishing a robust brand identity and effectively conveying your message.",
        },
    ]

    useEffect(() => {
        // Check if mobile view
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)

        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    useEffect(() => {
        // Store all ScrollTrigger instances for cleanup
        const scrollTriggers: ScrollTrigger[] = []

        const initAnimations = () => {
            if (!containerRef.current) return

            // Clear any existing ScrollTrigger instances
            ScrollTrigger.getAll().forEach((st) => st.kill())

            const validCards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

            // Skip animations for mobile view
            if (isMobile) {
                gsap.set(validCards, {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    rotationX: 0,
                    rotationY: 0,
                    zIndex: 0
                })
                return
            }

            // Set initial state with more realistic stacking
            gsap.set(validCards, {
                y: (i) => i * 80, // Increased initial offset for better stacking effect
                scale: (i) => 1 - i * 0.08, // More pronounced scale difference
                opacity: (i) => Math.max(0.3, 1 - i * 0.2), // Stronger opacity gradient
                rotationX: (i) => i * -1, // Slight 3D tilt
                rotationY: (i) => i * 0.5, // Slight perspective variation
                transformPerspective: 1000, // Add perspective for 3D effect
                zIndex: (i) => services.length - i,
                willChange: "transform, opacity",
                transformOrigin: "center center",
                backfaceVisibility: "hidden" // Prevent flickering
            })

            // Create animations for each card
            validCards.forEach((card, i) => {
                // Find elements within this card
                const image = card.querySelector(".card-image") as HTMLElement
                const text = card.querySelector(".card-text") as HTMLElement
                const content = card.querySelector(".card-content") as HTMLElement

                // Set initial state with parallax effect
                if (image) gsap.set(image, {
                    scale: 1.1,
                    opacity: 0.8,
                    y: i * 20,
                    z: -50
                })

                if (text) gsap.set(text, {
                    y: 30,
                    opacity: 0.7,
                    z: -30
                })

                if (content) gsap.set(content, {
                    z: 0
                })

                // Main animation with more realistic physics
                const cardTrigger = ScrollTrigger.create({
                    trigger: card,
                    start: "top bottom-=150",
                    end: "center center",
                    scrub: 1.2, // Smoother scrub
                    onEnter: () => {
                        // Animate card with bounce effect
                        const tl = gsap.timeline({
                            defaults: { ease: "power3.out", overwrite: "auto" }
                        })

                        tl.to(card, {
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            rotationX: 0,
                            rotationY: 0,
                            duration: 0.8,
                        })
                            .to(card, {
                                y: -10,
                                duration: 0.2
                            }, ">")
                            .to(card, {
                                y: 0,
                                duration: 0.3
                            }, ">0.1")

                        // Image parallax effect
                        if (image) {
                            gsap.to(image, {
                                scale: 1,
                                opacity: 1,
                                y: 0,
                                z: 0,
                                duration: 0.8,
                                ease: "power2.out",
                            })
                        }

                        // Text fade-in with slight delay
                        if (text) {
                            gsap.to(text, {
                                y: 0,
                                opacity: 1,
                                z: 0,
                                duration: 0.6,
                                delay: 0.2,
                                ease: "power2.out",
                            })
                        }

                        // Content lift effect
                        if (content) {
                            gsap.to(content, {
                                z: 20,
                                duration: 0.6,
                                ease: "power2.out",
                            })
                        }

                        // Bring card to front with shadow enhancement
                        gsap.set(card, {
                            zIndex: 100,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                        })
                    },
                    onLeaveBack: () => {
                        // Return to stacked position with easing
                        const tl = gsap.timeline({
                            defaults: { ease: "power2.inOut", overwrite: "auto" }
                        })

                        tl.to(card, {
                            y: i * 80,
                            scale: 1 - i * 0.08,
                            opacity: Math.max(0.3, 1 - i * 0.2),
                            rotationX: i * -1,
                            rotationY: i * 0.5,
                            duration: 0.6,
                        })

                        if (image) {
                            gsap.to(image, {
                                scale: 1.1,
                                opacity: 0.8,
                                y: i * 20,
                                z: -50,
                                duration: 0.6,
                            })
                        }

                        if (text) {
                            gsap.to(text, {
                                y: 30,
                                opacity: 0.7,
                                z: -30,
                                duration: 0.6,
                            })
                        }

                        if (content) {
                            gsap.to(content, {
                                z: 0,
                                duration: 0.6,
                            })
                        }

                        // Reset z-index and shadow
                        gsap.set(card, {
                            zIndex: services.length - i,
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                        })
                    },
                })

                // Exit animation with perspective shift
                const exitTrigger = ScrollTrigger.create({
                    trigger: card,
                    start: "center center",
                    end: "bottom top+=150",
                    scrub: 1.2,
                    onEnter: () => {
                        gsap.to(card, {
                            y: -100,
                            opacity: 0,
                            rotationX: -10,
                            rotationY: 5,
                            scale: 0.95,
                            duration: 0.8,
                            ease: "power2.in",
                        })
                    },
                    onLeaveBack: () => {
                        gsap.to(card, {
                            y: 0,
                            opacity: 1,
                            rotationX: 0,
                            rotationY: 0,
                            scale: 1,
                            duration: 0.6,
                            ease: "power2.out",
                        })
                    },
                })

                // Store triggers for cleanup
                scrollTriggers.push(cardTrigger, exitTrigger)
            })

            // Add subtle parallax effect to the container
            if (!isMobile) {
                const containerParallax = gsap.to(containerRef.current, {
                    y: 100,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5
                    }
                })
                scrollTriggers.push(containerParallax.scrollTrigger!)
            }
        }

        // Initialize animations
        initAnimations()

        // Handle window resize with debounce
        let resizeTimeout: NodeJS.Timeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                scrollTriggers.forEach(trigger => trigger.kill())
                initAnimations()
            }, 200)
        }

        window.addEventListener("resize", handleResize)

        // Cleanup
        return () => {
            scrollTriggers.forEach(trigger => trigger.kill())
            window.removeEventListener("resize", handleResize)
            clearTimeout(resizeTimeout)
        }
    }, [services.length, isMobile])

    return (
        <div className="container mx-auto px-4 overflow-hidden">
            <div ref={containerRef} className="relative w-full min-h-[200vh] md:min-h-[300vh]">
                {services.map((item, index) => (
                    <div
                        key={item.id}
                        ref={(el) => {
                            cardsRef.current[index] = el
                        }}
                        className={`overflow-hidden rounded-3xl shadow-lg sticky top-20 mb-12 ${index % 2 === 0 ? "bg-gradient-to-br" : "bg-gradient-to-bl"
                            } from-black to-gray-800 transform-gpu transition-shadow duration-300`}
                        style={{
                            minHeight: isMobile ? "auto" : "80vh",
                            transformStyle: "preserve-3d",
                            perspective: "1000px",
                        }}
                    >
                        <div className="card-content container mx-auto h-full">
                            <div
                                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    } items-center h-full`}
                            >
                                {/* Text Content */}
                                <div className={`card-text md:w-1/2 p-6 md:p-10 ${index % 2 === 0 ? "md:pr-20" : "md:pl-20"} space-y-4 md:space-y-8 z-10`}>
                                    <h2 className="text-2xl md:text-5xl font-[Poppins] font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400">
                                        {item.title}
                                    </h2>
                                    <p className="text-white/70 text-sm md:text-base leading-relaxed">{item.description}</p>
                                </div>

                                {/* Image with subtle shine effect */}
                                <div className="card-image md:w-1/2 relative h-full flex items-center justify-center p-4 md:p-10">
                                    <div className="relative w-full h-64 md:h-full rounded-xl overflow-hidden group">
                                        <img
                                            src={item.imageUrl || "/placeholder.svg"}
                                            alt={item.title}
                                            className="w-full h-full object-contain object-center"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced decorative elements with animation */}
                        {!isMobile && (
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                                <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-green-500/20 blur-3xl animate-pulse-slow" />
                                <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-red-800/20 blur-3xl animate-pulse-slow delay-500" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StackingCards