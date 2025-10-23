import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import BlogCard from '@/components/sections/blogs/blogCard'
import BlogSIdebar from '@/components/sections/blogs/blogSIdebar'
import InstagramGallery from '@/components/sections/instagramGallery'
import Newsletter from '@/components/sections/newsletter'
import PageHeader from '@/components/sections/pageHeader'
import Pagination from '@/components/ui/pagination'
import { getBlogData } from '@/lib/data'
import { BlogType } from '@/types/blogType'

export const metadata: Metadata = {
    title: "Blog",
    description: "Read our latest blog posts."
}

const BlogThree = async () => {
    const blogData: BlogType[] = await getBlogData();
    return (
        <main>
            <PageHeader pageTitle='Blog-3' currentPage='Blog-3' />
            <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15'>
                <div className='grid xl:grid-cols-[73.2%_auto] lg:grid-cols-[70%_auto] grid-cols-1 gap-10'>
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                        {
                            blogData.map(({ category, date, id, thumbnail, title, description, author }) =>
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

                                    <BlogCard.Title href="/blog-single" className='lg:text-xl text-lg'>
                                        {title}
                                    </BlogCard.Title>

                                    <BlogCard.Description>
                                        {description}
                                    </BlogCard.Description>
                                </BlogCard>
                            )
                        }
                    </div>
                    <BlogSIdebar />
                </div>
                <Pagination />
            </div>
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default BlogThree