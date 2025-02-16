"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'
import FeatureMotionWrapper from '@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap'
import MotionWrapperDelay from '@/app/_components/FramerMotionStuff/MotionWrapperDelay'

function UserCourseList() {

    const { user } = useUser()

    const [courseList, setCourseList] = useState([])

    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext)

    useEffect(() => {
        user && getUserCourses()
    }, [user])

    const getUserCourses = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.createdBy, user?.primaryEmailAddress.emailAddress))

        setCourseList(result)
        setUserCourseList(result)
    }

    return (
        <div className='mt-10'>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 },
                }}
            > <h2 className='font-bold text-5xl text-primary mb-10 text-center'>My AI Courses</h2></MotionWrapperDelay>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {courseList?.length > 0 ? (
                    courseList?.map((course, index) => (
                        <FeatureMotionWrapper index={index} key={index}>
                            <CourseCard course={course} key={index} refreshData={() => getUserCourses()} /></FeatureMotionWrapper>
                    ))
                ) : (
                    [1, 2, 3, 4, 5].map((Item, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <div className='w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]' />
                        </FeatureMotionWrapper>
                    ))
                )}
            </div>

        </div>
    )
}

export default UserCourseList