import React from 'react'
import { Metadata } from 'next'
import AdsSlider from '@/app/sections/adsSlider'
import BlogSlider from '@/app/sections/blogs/blogSlider'
import FeaturedProducts from '@/app/sections/featuredProducts'
import InstagramGallery from '@/app/sections/instagramGallery'
import HomeCategory from '@/app/sections/homeCategory'
import Newsletter from '@/app/sections/newsletter'
import TestimonialSlider from '@/app/sections/testimonialSlider'
import TopCollections from '@/app/sections/topCollections'
import Hero from '@/app/sections/hero'
import AboutTwo from '@/app/sections/aboutTwo'
import { getAdsData, getBlogData, getCategoriesData, getHeroData, getProductsData, getTestimonialsData } from '@/lib/data'

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our furniture store."
}

const Home = async () => {
  const categoriesData = await getCategoriesData();
  const blogData = await getBlogData();
  const testimonialData = await getTestimonialsData();
  const ads = await getAdsData()
 const { topCollections } = await getProductsData();
  const heroData = await getHeroData()

  return (
    <>
      <Hero data={heroData} />
      <HomeCategory categories={categoriesData} />
      <FeaturedProducts />
      <AboutTwo />
      <TopCollections data={topCollections} />
      <AdsSlider data={ads} />
      <BlogSlider blogs={blogData} />
      <TestimonialSlider testimonials={testimonialData} />
      <Newsletter />
      <InstagramGallery />
    </>
  )
}

export default Home