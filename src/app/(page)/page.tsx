import React from 'react'
import { Metadata } from 'next'
import AdsSlider from '@/components/sections/adsSlider'
import BlogSlider from '@/components/sections/blogs/blogSlider'
import FeaturedProducts from '@/components/sections/featuredProducts'
import InstagramGallery from '@/components/sections/instagramGallery'
import HomeCategory from '@/components/sections/homeCategory'
import Newsletter from '@/components/sections/newsletter'
import TestimonialSlider from '@/components/sections/testimonialSlider'
import TopCollections from '@/components/sections/topCollections'
import Hero from '@/components/sections/hero'
import AboutTwo from '@/components/sections/aboutTwo'
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