"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import courseData from "./HomePage/courseImages";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import MotionWrapperDelay from "@/app/_components/FramerMotionStuff/MotionWrapperDelay";

const CourseCarousel = () => {
    return (
        <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            variants={{
                hidden: { opacity: 0, y: -100 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                className="w-full py-10"
            >
                <CarouselContent className="flex gap-5 sm:gap-20 items-center justify-center">
                    {courseData.map(({ name, path, id }) => (
                        <CarouselItem
                            key={id}
                            className="basis-1/3 lg:basis-1/6 flex justify-center items-center"
                        >
                            <div className="relative group">
                                <Image
                                    src={path}
                                    alt={name}
                                    width={450}
                                    height={450}
                                    className="w-full  object-aspect-video rounded-xl shadow-lg transition-all duration-300 
                                    group-hover:scale-105 group-hover:shadow-2xl group-hover:brightness-105 h-[150px]"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 
                                    rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                    flex items-end justify-center p-3"
                                >
                                    <p className="text-yellow-300 text-center text-sm md:text-base font-medium opacity-0 
                                    group-hover:opacity-100 transition-opacity">
                                        {name}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </MotionWrapperDelay>
    );
};

export default CourseCarousel;