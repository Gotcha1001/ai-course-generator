import FeatureMotionWrapper from '@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap'
import React from 'react'
import { GiDuration } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";
import EditChapters from './EditChapters';

function ChapterList({ course, refreshData, edit = true }) {
    return (
        <div className='mt-3'>
            <h2 className='text-white font-bold gradient-title text-xl'>Chapters</h2>
            <div className='mt-2'>
                {course?.courseOutput?.Chapters.map((chapter, index) => (
                    <FeatureMotionWrapper key={chapter.id} index={index}>
                        <div className='border p-5 rounded-lg mb-2 flex justify-between items-center'>
                            <div className='flex gap-5 items-center'>
                                <h2 className='text-white h-10 w-10 flex-none bg-primary rounded-full text-center p-2'>{index + 1}</h2>
                                <div>
                                    <h2 className='text-primary text-lg font-bold'>{chapter?.ChapterName}
                                        {edit && <EditChapters
                                            refreshData={refreshData}
                                            index={index} course={course} />}

                                    </h2>
                                    <p className='text-white text-sm'>{chapter?.About}</p>
                                    <p className='text-indigo-500 flex gap-2 items-center'><GiDuration />{chapter?.Duration}</p>
                                </div>
                            </div>
                            <FaCheckCircle className='text-4xl text-gray-200 flex-none' />
                        </div>

                    </FeatureMotionWrapper>
                ))}
            </div>
        </div>
    )
}

export default ChapterList