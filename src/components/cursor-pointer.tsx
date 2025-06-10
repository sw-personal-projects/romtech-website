"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cursorRef.current || !followerRef.current) return;

        // Mouse position
        let mouseX = 0;
        let mouseY = 0;

        // Cursor positions
        let cursorX = 0;
        let cursorY = 0;

        // Follower positions
        let followerX = 0;
        let followerY = 0;

        // Speed factors (lower = smoother but slower)
        const cursorSpeed = 0.1;
        const followerSpeed = 0.05;

        // Animation frame
        let animationFrameId: number;

        // GSAP animation for smooth movement
        const animate = () => {
            // Cursor movement
            cursorX += (mouseX - cursorX) * cursorSpeed;
            cursorY += (mouseY - cursorY) * cursorSpeed;

            // Follower movement
            followerX += (mouseX - followerX) * followerSpeed;
            followerY += (mouseY - followerY) * followerSpeed;

            // Apply transformations
            if (cursorRef.current && followerRef.current) {
                gsap.set(cursorRef.current, {
                    x: cursorX,
                    y: cursorY,
                });

                gsap.set(followerRef.current, {
                    x: followerX,
                    y: followerY,
                });
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // Mouse move event
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        // Handle hover effects
        const handleMouseEnter = () => {
            if (cursorRef.current && followerRef.current) {
                gsap.to(cursorRef.current, {
                    scale: 0.5,
                    opacity: 0.8,
                    duration: 0.3,
                });
                gsap.to(followerRef.current, {
                    scale: 1.5,
                    duration: 0.3,
                });
            }
        };

        const handleMouseLeave = () => {
            if (cursorRef.current && followerRef.current) {
                gsap.to(cursorRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                });
                gsap.to(followerRef.current, {
                    scale: 1,
                    duration: 0.3,
                });
            }
        };

        // Add event listeners
        window.addEventListener("mousemove", handleMouseMove);

        // Add hover effects to all buttons and links
        const interactiveElements = document.querySelectorAll("a, button, .cursor-hover");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Start animation
        animate();

        // Hide default cursor
        document.body.style.cursor = "none";

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
            document.body.style.cursor = "auto";
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className="fixed w-4 h-4 bg-white rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference z-50"
            />

            {/* Follower circle */}
            <div
                ref={followerRef}
                className="fixed w-8 h-8 border-2 border-white rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference z-40"
            />
        </>
    );
}