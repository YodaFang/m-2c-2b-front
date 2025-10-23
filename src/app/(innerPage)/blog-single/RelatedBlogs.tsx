import React from 'react'
import Image from 'next/image'
import BlogCard from '@/components/sections/blogs/blogCard'
import { getBlogData } from '@/lib/data'
import { BlogType } from '@/types/blogType'

const RelatedBlogs = async () => {
    const blogData: BlogType[] = await getBlogData();
    return (
        <section className={'lg:pt-25 lg:pb-25 pt-15 pb-15'}>
            <div className='container'>
                <b className='lg:text-[32px] sm:text-[26px] text-2xl text-secondary-foreground font-semibold block lg:mb-7.5 mb-5'>Related Blogs</b>
                <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-5 lg:gap-y-15 gap-y-10'>
                    {
                        blogData.slice(0, 3).map(({ category, date, id, thumbnail, title, author, description }) =>
                            <BlogCard key={id}>
                                <BlogCard.Img>
                                    <Image
                                        width={552}
                                        height={340}
                                        src={thumbnail}
                                        alt='img'
                                        className='rounded-xl w-full h-auto max-h-[340px] object-cover aspect-[4/3]'
                                        sizes='100vw'
                                    />
                                </BlogCard.Img>

                                <BlogCard.Meta
                                    date={date}
                                    category={category}
                                    author={{ name: author?.name || '', href: '' }}
                                />

                                <BlogCard.Title href="/blog-single">
                                    {title}
                                </BlogCard.Title>

                                <BlogCard.Description>
                                    {description}
                                </BlogCard.Description>
                            </BlogCard>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default RelatedBlogs