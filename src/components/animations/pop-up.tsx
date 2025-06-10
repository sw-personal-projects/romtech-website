"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PopUpProps {
    children: ReactNode;
    delay?: number;
}

const PopUp = ({ children, delay = 0 }: PopUpProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.34, 1.56, 0.64, 1],
            }}
            viewport={{ once: false, amount: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

export default PopUp;