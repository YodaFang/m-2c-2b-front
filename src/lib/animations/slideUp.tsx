'use client'
import React, { ReactNode } from 'react'
import { motion } from "framer-motion"
type PropsType = {
    children: ReactNode,
    delay?: number,
    className?: string
}
const SlideUp = ({ children, delay = 1, className }: PropsType) => {
    const slideVariants = {
        offscreen: {
            y: 40,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                delay: (delay === 1 ? 0 : 0.1 * delay)
            }
        }
    };
    return (
        <motion.div
            variants={slideVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default SlideUp