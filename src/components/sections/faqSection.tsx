import React from 'react'
import Image from 'next/image'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { getFaqData } from '@/lib/data'
import { FaqDataType } from '@/db/faqData'

const FaqSection = async () => {
    const faqData:FaqDataType[] = await getFaqData();
    return (
        <section className='container lg:py-25 py-15'>
            <h5 className='text-gray-1-foreground'>Frequently Asked Questions</h5>
            <div className='mt-10 grid lg:grid-cols-[40.846%_auto] md:grid-cols-2 grid-cols-1 lg:gap-15 gap-8'>
                <div>
                    <Image width={580} height={582} sizes='100vw' style={{ width: "100%", height: "auto" }} src={"/images/faq.webp"} alt='img' />
                    <p className='lg:text-2xl text-xl font-medium text-secondary-foreground md:mt-10 mt-7.5'>Customer support</p>
                    <p className='text-xl leading-[170%] text-gray-1-foreground'>support@yourdomain.com</p>
                </div>
                <div>
                    <Accordion type="single" defaultValue={"one"} collapsible>
                        {
                            faqData.map(({ ans, id, title }) => {
                                return (
                                    <AccordionItem key={id} value={id} className=''>
                                        <AccordionTrigger className='text-secondary-foreground lg:text-2xl text-xl font-medium leading-[141%] py-5 hover:no-underline'>
                                            {title}
                                        </AccordionTrigger>
                                        <AccordionContent className='text-gray-3-foreground text-xl leading-[170%]'>
                                            {ans}
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            })
                        }
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default FaqSection