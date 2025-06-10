"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RotateInProps {
    children: ReactNode;
    delay?: number;
}

const RotateIn = ({ children, delay = 0 }: RotateInProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

export default RotateIn;