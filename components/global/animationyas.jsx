"use client";

import { motion } from "motion/react";

const Animationyx = ({ children, className, direction = "right", delay = 0 }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{
                duration: 0.2,
                delay: delay,
                ease: "easeInOut",
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
        >
            {children}
        </motion.div>
    );
};

export default Animationyx;
