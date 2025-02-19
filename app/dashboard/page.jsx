"use client"
import React, { useState } from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'
import SearchBar from './_components/SearchBar'


function Dashboard() {

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
            <AddCourse />
            {/* Display List Of Courses */}



            {/* Search Bar for Filtering */}
            <div className="flex justify-center my-5">
                <SearchBar onSearch={setSearchQuery} />
            </div>


            <UserCourseList searchQuery={searchQuery} />
        </div>
    )
}

export default Dashboard