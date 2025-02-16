"use client"
import FeatureMotionWrapper from '@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'
import { Button } from '@/components/ui/button'
import MotionWrapperDelay from '@/app/_components/FramerMotionStuff/MotionWrapperDelay'

function Explore() {
    const [courseList, setCourseList] = useState([])
    const [pageIndex, setPageIndex] = useState(0)

    useEffect(() => {
        GetAllCourse()
        // Scroll to top whenever pageIndex changes
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [pageIndex])

    const GetAllCourse = async () => {
        const result = await db.select().from(CourseList)
            .limit(9)
            .offset(pageIndex * 9)
        console.log(result)
        setCourseList(result)
    }

    const handlePageChange = (newIndex) => {
        setPageIndex(newIndex)
    }

    return (
        <div>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: { opacity: 1, x: 0 },
                }}
            >   <h2 className='font-bold text-3xl gradient-title text-center'>Explore More Projects</h2></MotionWrapperDelay>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 },
                }}
            > <p className='text-center text-indigo-500 mb-5'>Explore other projects build by AI created by other Users</p></MotionWrapperDelay>


            <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
                {courseList?.map((course, index) => (
                    <FeatureMotionWrapper key={index} index={index}>
                        <div>
                            <CourseCard course={course} displayUser={true} />
                        </div>
                    </FeatureMotionWrapper>
                ))}
            </div>
            <div className='flex justify-between mt-5'>
                {pageIndex != 0 && (
                    <Button
                        onClick={() => handlePageChange(pageIndex - 1)}
                        variant="sex1"
                    >
                        Previous Page
                    </Button>
                )}

                <Button
                    onClick={() => handlePageChange(pageIndex + 1)}
                    variant="sex1"
                >
                    Next Page
                </Button>
            </div>
        </div>
    )
}

export default Explore