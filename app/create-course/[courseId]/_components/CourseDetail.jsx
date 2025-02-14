import React from 'react'
import { MdBarChart } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import { GiSpellBook } from "react-icons/gi";
import { MdVideoSettings } from "react-icons/md";

function CourseDetail({ course }) {
    return (
        <div className='border p-6 rounded-xl shadow-teal mt-3 mb-10'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                <div className='flex gap-2'>
                    <MdBarChart className='text-indigo-500 text-4xl' />
                    <div>
                        <h2 className='text-white text-sm'>Skill Level</h2>
                        <h2 className='text-indigo-500 text-lg'>{course?.level}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <GiDuration className='text-indigo-500 text-4xl' />
                    <div>
                        <h2 className='text-white text-sm'>Duration</h2>
                        <h2 className='text-indigo-500 text-lg'>{course?.courseOutput?.Duration}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <GiSpellBook className='text-indigo-500 text-4xl' />
                    <div>
                        <h2 className='text-white text-sm'>Chapters Number</h2>
                        <h2 className='text-indigo-500 text-lg'>{course?.courseOutput?.NoOfChapters}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <MdVideoSettings className='text-indigo-500 text-4xl' />
                    <div>
                        <h2 className='text-white text-sm'>Video Included</h2>
                        <h2 className='text-indigo-500 text-lg'>{course?.includeVideo}</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CourseDetail