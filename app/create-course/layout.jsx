"use client"
import React, { useState } from 'react'
import Header from '../dashboard/_components/Header'
import { UserCourseListContext } from '../_context/UserCourseListContext'
import { UserInputContext } from '../_context/UserInputContext'

function CreateCourseLayout({ children }) {
    const [userCourseList, setUserCourseList] = useState([])
    const [userCourseInput, setUserCourseInput] = useState({
        category: '',
        topic: '',
        level: undefined,
        duration: undefined,
        displayVideo: undefined,
        noOfChapters: undefined
    })

    return (
        <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
            <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
                <div>
                    <Header />
                    <div className='p-10'>
                        {children}
                    </div>
                </div>
            </UserInputContext.Provider>
        </UserCourseListContext.Provider>
    )
}

export default CreateCourseLayout