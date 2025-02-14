// app/course/layout.js
"use client"
import React, { useState } from 'react'
import { UserCourseListContext } from '../_context/UserCourseListContext'
import Header from '../_components/NormalComponents/Header'


function CourseLayout({ children }) {
    const [userCourseList, setUserCourseList] = useState([])

    return (
        <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
            <div>

                {children}
            </div>
        </UserCourseListContext.Provider>
    )
}

export default CourseLayout