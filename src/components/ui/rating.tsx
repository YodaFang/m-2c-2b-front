import { StarFill, StarOutline } from '@/lib/icon'
import { cn } from '@/lib/utils';
import { Star, StarHalf, StarOff } from 'lucide-react';
import React from 'react'

const Rating = ({ star, iconSize, className }: { star: number, iconSize?: string, className?: string }) => {
  return (
    <ul className={cn('flex gap-[5px]', className)}>
      {Array.from({ length: 5 }).map((elem, index) => {
        let number = index + 0.5;
        return (
          <li key={index} className='text-[#FFA34E]'>
            {
              star >= index + 1 ?
                <Star fill='#FFA34E' className={cn('lg:size-[22px] size-4', iconSize)} />
                : star >= number ?
                  <StarHalf className={cn('lg:size-[22px] size-4', iconSize)} />
                  :
                  <Star className={cn('lg:size-[22px] size-4', iconSize)} />
            }
          </li>
        )
      })}
    </ul>
  )
}

export default Rating