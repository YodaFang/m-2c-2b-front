'use client'
import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { StarFill, StarOutline } from '@/lib/icon'

const ReviewAddForm = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (value: number) => {
        setRating(value);
        //   if (onRate) {
        //     onRate(value);
        //   }
    };

    return (
        <form action="">
            <div className='flex items-center gap-2.5'>
                <p className='text-gray-1-foreground'>Your Rating<span className='text-primary-foreground'>*</span></p>
                <div className='flex gap-1'>
                    {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                            <span
                                key={starValue}
                                className={`text-2xl cursor-pointer ${starValue <= (hover || rating) ? "text-[#FFA34E]" : "text-[#ccc]"}`}
                                onClick={() => handleClick(starValue)}
                                onMouseEnter={() => setHover(starValue)}
                                onMouseLeave={() => setHover(0)}
                            >
                                <StarFill />
                            </span>
                        );
                    })}
                </div>
            </div>
            <div className='mt-3'>
                <p className='text-gray-1-foreground'>Your Review<span className='text-primary-foreground'>*</span></p>
                <Textarea required className='min-h-[180px] rounded-none mt-2 border-muted text-gray-1-foreground' />
            </div>
            <Button  size={"lg"} className='mt-5'>Submit</Button>
        </form>
    )
}

export default ReviewAddForm