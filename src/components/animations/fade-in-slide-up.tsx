"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInSlideUpProps {
    children: ReactNode;
    delay?: number;
}

const FadeInSlideUp = ({ children, delay = 0 }: FadeInSlideUpProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.7, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 1, 0.5, 1],
            }}
            viewport={{ once: false, amount: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

export default FadeInSlideUp;