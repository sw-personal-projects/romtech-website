"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FlipInProps {
    children: ReactNode;
    delay?: number;
}

const FlipIn = ({ children, delay = 0 }: FlipInProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, rotateX: 90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.3, delay, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            style={{ transformOrigin: "top" }}
        >
            {children}
        </motion.div>
    );
};

export default FlipIn;