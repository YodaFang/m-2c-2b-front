import React from 'react'
import { motion } from "framer-motion"

const BounceRight = ({ children, delay = 1, className }) => {
    const slideVariants = {
        offscreen: {
            x: "50%",
            opacity: 0
        },
        onscreen: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
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
            viewport={{ once: true, amount: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default BounceRight