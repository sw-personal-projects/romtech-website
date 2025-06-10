"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FlipBottomToTopProps {
    children: ReactNode;
    delay?: number;
}

const FlipBottomToTop = ({ children, delay = 0 }: FlipBottomToTopProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} // Start 50px below with opacity 0
            whileInView={{ opacity: 1, y: 0 }} // Slide up to normal position
            transition={{
                duration: 1,
                delay,
                ease: [0.25, 1, 0.5, 1], // Smooth easing
            }}
            viewport={{ once: false, amount: 0.2 }} // Trigger when 20% is visible
        >
            {children}
        </motion.div>
    );
};

export default FlipBottomToTop;