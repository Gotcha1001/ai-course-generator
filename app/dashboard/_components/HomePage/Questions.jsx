import React from "react";


import faqs from "./faqs";
import FeatureMotionWrapper from "@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const Questions = () => {
    return (
        <section id="features" className="py-20 px-5 bg-gradient-to-r from-indigo-600 via-purple-700 to-teal-500 text-white">
            <div className="container mx-auto">
                <h3 className="text-4xl font-bold mb-12 text-center">
                    Frequently Asked Questions
                </h3>

                <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <AccordionItem className="w-full" value={`item-${index}`}>
                                <AccordionTrigger className="transition-all duration-300 ease-in-out hover:bg-black hover:text-white p-4 rounded-md cursor-pointer">{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        </FeatureMotionWrapper>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default Questions;
