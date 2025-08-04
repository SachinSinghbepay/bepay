"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollArrow = () => {
    const [scrollDirection, setScrollDirection] = useState('down');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleArrowClick = () => {
        const scrollAmount = window.innerHeight * 0.8;
        window.scrollBy({
            top: scrollDirection === 'down' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
        });
    };

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={variants}
                    transition={{ duration: 0.3 }}
                    onClick={handleArrowClick}
                    aria-label={`Scroll ${scrollDirection}`}
                    title={`Scroll ${scrollDirection}`}
                    className={`
                        fixed bottom-5 right-5 z-50
                        flex h-12 w-12 items-center justify-center rounded-full
                        border border-neutral-300 bg-white/50 text-neutral-800 shadow-xl backdrop-blur-md
                        transition-colors duration-300 ease-in-out
                        hover:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50
                    `}
                >
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`h-6 w-6 transition-transform duration-300
                            ${scrollDirection === 'down' ? 'rotate-0' : 'rotate-180'}
                        `}
                        animate={{
                            y: [0, -3, 0],
                            transition: {
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </motion.svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollArrow;