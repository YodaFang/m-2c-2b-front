import React from 'react'
import Image from 'next/image'
import { EditIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/custom-ui/accordion"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom-ui/button";
import AuthDialog from '@/app/sections/auth'
import { getFaqData } from '@/lib/data'

const FaqSection = async () => {
    const faqData = await getFaqData();
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
                    <Accordion type="single" defaultValue={"email"} collapsible>
                        <AccordionItem value="email" className='border-b-2'>
                            <AccordionTrigger className='text-secondary-foreground text-md font-bold py-5 hover:no-underline'>
                                Login or Guest:
                            </AccordionTrigger>
                            <AccordionContent >
                                <div className="text-base">
                                    <AuthDialog nullIfLogin><span className="px-1 underline" >Login</span> </AuthDialog>
                                    or login with Google or Facebook
                                </div>
                                <div className='w-full flex items-center text-center my-3 text-base font-medium text-secondary-foreground'>
                                    <span className='block w-full h-px bg-[#999796]'></span>
                                    <span className="text-sm whitespace-nowrap px-3">Or Checkout As Guest</span>
                                    <span className='block w-full h-px bg-[#999796]'></span>
                                </div>
                                <div className="w-full flex flex-col lg:flex-row items-center gap-2">
                                    <Input
                                        className={
                                            "border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-2"
                                        }
                                        type={"email"}
                                        name={"email"}
                                        id="email"
                                        required
                                    />
                                    <Button className="py-[8px] lg:py-[6px] text-sm lg:text-base lg:px-3 lg:w-[180px] w-full">
                                        Guest Checkout
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="address" >
                            <AccordionTrigger className='hover:no-underline' plusIcon={<EditIcon size="28" />}>
                                <div>
                                    <p className='text-secondary-foreground text-base font-bold'>Ship To:</p>
                                    <p>Jone Stepfan, 071220284</p>
                                    <p>Str. Barbu Văcărescu 120, București, București, 020284</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="text-base text-gray-1-foreground mb-1">
                                    <AuthDialog nullIfLogin><span className="px-1 underline" >Login</span> </AuthDialog>
                                    or login with G or F<br /> Or 输入email 以guest checkout
                                </div>
                                <div className="flex w-full items-center gap-2">
                                    <Input
                                        className={
                                            "border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-2"
                                        }
                                        type={"email"}
                                        name={"email"}
                                        id="email"
                                        required
                                    />
                                    <Button className="py-[5px] lg:py-[6px] text-base lg:text-base px-3">
                                        Next
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default FaqSection