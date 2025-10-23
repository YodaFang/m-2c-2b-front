'use client'
import React from 'react'
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const aboutData = {
    image: '/images/about/img-2.webp',
    title: 'About Furnisy',
    description: `
    <p>Our goal is to provide you with furniture that not only looks stunning but also serves your needs and lasts for years to come. We prioritize quality in everything we do. From the materials we use to the craftsmanship of our products, we ensure that every piece meets our high standards of excellence.</p>
    <p>you with furniture that not only looks stunning but also serves your needs and lasts for years to come. We prioritize quality in everything we do. From the materials we use to the craftsmanship of our products, we ensure that every piece meets our high standards of excellence.</p>
    `,
    stats: [
        { value: 12, endKey: 'k+', label: 'Premium products' },
        { value: 25, endKey: '+', label: 'Years experiences' },
        { value: 20, endKey: 'k+', label: 'Happy customers' },
    ],
};

const shoppingExperience = {
    title: 'Discover The Furnisy Shopping Experience',
    description: `Explore our carefully curated collections, featuring the latest furniture design home decor. Our diverse range of styles fits every taste and space.`,
    features: [
        'User-Friendly Website',
        'Fast & Free Shipping',
        '24/7 Customer Support',
        'High-Quality Furniture',
        'Exchanges & Returns',
    ],
    image: '/images/about/img-3.webp',
};
const AboutDetails = () => {
    const { ref, inView, entry } = useInView({
        threshold: 0,
        triggerOnce: true
    });
    return (
        <section className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[40.2%_auto] lg:gap-15 gap-10 items-center">
                <div>
                    <Image width={570} height={600} style={{ width: "100%" }} src={aboutData.image} alt="About Furnisy" />
                </div>

                {/* Right Section */}
                <div>
                    <h5 className="mb-5">{aboutData.title}</h5>
                    <div className="text-gray-1-foreground lg:text-xl lg:leading-[170%] text-lg md:mb-10 mb-5" dangerouslySetInnerHTML={{ __html: aboutData.description }} />
                    <div ref={ref} className="md:mt-15 mt-10 flex xl:gap-x-15 gap-x-10">
                        {aboutData.stats.map((stat, index) => (
                            <div key={index}>
                                <h4 className="text-[clamp(1.5rem,1.1538rem+1.5385vw,3rem)] leading-[125%] text-secondary-foreground font-semibold">
                                    {inView && <CountUp end={stat.value} />}{stat.endKey}
                                </h4>
                                <p className="text-[#484655] leading-[150%]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Shopping Experience Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_40.2%] lg:gap-15 gap-10 items-center mt-15 md:mt-0">
                <div className='order-2 md:order-1'>
                    <h5 className="mb-5">{shoppingExperience.title}</h5>
                    <div className="text-gray-1-foreground lg:text-xl lg:leading-[170%] text-lg mb-5" dangerouslySetInnerHTML={{ __html: shoppingExperience.description }} />
                    <ul className="flex flex-col gap-5 mb-10">
                        {shoppingExperience.features.map((feature, index) => (
                            <li key={index} className='text-gray-1-foreground font-medium flex items-center gap-3'>
                                <span className='w-2 h-2 inline-block bg-gray-1 rounded-full'></span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='order-1 md:order-2'>
                    <Image width={570} height={600} style={{ width: "100%" }} src={shoppingExperience.image} alt="Shopping Experience" />
                </div>
            </div>
        </section>
    )
}

export default AboutDetails