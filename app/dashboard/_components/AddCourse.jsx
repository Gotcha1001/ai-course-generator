"use client"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useContext } from 'react'

function AddCourse() {
    const { user } = useUser()

    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);


    return (
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-3xl text-white'>Hello, <span className='font-bold gradient-title'>{user?.fullName}</span> </h2>
                <p className='text-sm text-gray-500'>Create New Course With AI Magic, Share With Your Friends And Earn From It </p>
            </div>

            <Link href={userCourseList >= 5 ? '/dashboard/upgrade' : '/create-course'}>
                <Button variant="sex1">+ Create AI Course</Button>
            </Link>

        </div >
    )
}

export default AddCourse