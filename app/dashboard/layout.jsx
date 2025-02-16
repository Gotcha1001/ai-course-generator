"use client"
import React, { useState } from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'
import { UserCourseListContext } from '../_context/UserCourseListContext'
import Provider from '../Provider'
import MotionWrapperDelay from '../_components/FramerMotionStuff/MotionWrapperDelay'

function DashboardLayout({ children }) {

    const [userCourseList, setUserCourseList] = useState([])

    return (
        <Provider>
            <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
                <div>
                    <div className='md:w-64 hidden md:block '>

                        <Sidebar />
                    </div>
                    <div className='md:ml-64'>
                        <MotionWrapperDelay
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.9, delay: 0.8 }}
                            variants={{
                                hidden: { opacity: 0, x: -100 },
                                visible: { opacity: 1, x: 0 },
                            }}
                        >  <Header /></MotionWrapperDelay>

                        <div className='p-10'>
                            {children}
                        </div>

                    </div>

                </div>
            </UserCourseListContext.Provider>
        </Provider>
    )
}

export default DashboardLayout