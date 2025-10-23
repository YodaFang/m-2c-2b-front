import React from 'react'
import { cn } from '@/lib/utils'

type TitleProps = {
    className?: string;
    children: React.ReactNode;
}
const Title = ({ className, children }: TitleProps) => {
    return (
        <h2 className={cn('text-secondary-foreground leading-[125%] font-light text-[clamp(1.5rem,1.2692rem+1.0256vw,2.5rem)]', className)}>{children}</h2>
    )
}

export default Title