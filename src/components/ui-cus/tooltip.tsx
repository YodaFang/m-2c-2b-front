'use client'
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
type PropsType = {
    children: ReactNode,
    text: string | number,
    className?: string,
    arrowCalss?: string,
}
const Tooltip = ({ children, text, className, arrowCalss }: PropsType) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {isVisible && (
                <p className={cn("min-w-max absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center bg-background text-secondary-foreground text-sm px-3 py-1.5 rounded shadow-md", className)}>
                    {text}
                    <span className={cn("absolute -bottom-1 left-1/2 -translate-x-1/2  w-2 h-2 bg-background rotate-45", arrowCalss)}></span>
                </p>
            )}
        </div>
    );
}

export default Tooltip
