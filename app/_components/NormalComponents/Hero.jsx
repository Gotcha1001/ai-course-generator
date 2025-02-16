import Image from 'next/image'
import React from 'react'
import MotionWrapperDelay from '../FramerMotionStuff/MotionWrapperDelay'
import Link from 'next/link'

function Hero() {
    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        variants={{
                            hidden: { opacity: 0, y: -100 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <div className="flex justify-center">
                            <Image className='horizontal-rotate rounded-lg' src={'/hero.jpg'} alt='hero' height={100} width={100} />
                        </div>
                    </MotionWrapperDelay>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.9, delay: 0.8 }}
                        variants={{
                            hidden: { opacity: 0, y: 100 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >    <h1 className="text-3xl font-extrabold sm:text-5xl text-primary">
                            AI Course Generator
                            <strong className="font-extrabold text-black  sm:block"> Custom Learning Path Custom By AI  </strong>
                        </h1></MotionWrapperDelay>



                    <p className="mt-4 sm:text-xl/relaxed">
                        Unlock personalized Education with AI-driven course creation. Tailor your learning journey to fit your unique goals and pace
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href="/dashboard"
                            className="block w-full rounded-sm bg-primary px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:ring-3 focus:outline-hidden sm:w-auto"

                        >
                            Get Started
                        </Link>


                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero