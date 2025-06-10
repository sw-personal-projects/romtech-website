"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScaleUpBlurProps {
    children: ReactNode;
    delay?: number;
}

const ScaleUpBlur = ({ children, delay = 0 }: ScaleUpBlurProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 1, 0.5, 1], // Smooth bounce effect
            }}
            viewport={{ once: false, amount: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

export default ScaleUpBlur;