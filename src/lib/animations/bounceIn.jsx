import React from 'react'
import { motion } from "framer-motion"

const BounceIn = ({ children, delay = 1, className }) => {
    const slideVariants = {
        offscreen: {
            scale: 0,
            // opacity: 0
        },
        onscreen: {
            scale: 1,
            // opacity: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                duration: 0.6,
                // delay: (delay === 1 ? 0 : 0.1 * delay)
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

export default BounceIn