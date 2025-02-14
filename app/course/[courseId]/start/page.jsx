"use client"
import FeatureMotionWrapper from '@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap'
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart({ params }) {

    const [course, setCourse] = useState()
    const [selectedChapter, setSelectedChapter] = useState()
    const [chapterContent, setChapterContent] = useState()

    useEffect(() => {
        GetCourse()
    }, [])


    //Used to get Course Info By Course ID
    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId))
        console.log(result)
        setCourse(result[0])
        GetSelectedChapterContent(0)
    }

    const GetSelectedChapterContent = async (chapterId) => {
        const result = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId),
                eq(Chapters.courseId, course?.courseId)))

        console.log("CONTENT:", result)
        setChapterContent(result[0])

    }

    return (
        <div className="">
            {/* Chapter List Side Bar LEFT  */}
            <div className=' fixed md:w-64 hidden md:block h-screen gradient-background2  shadow-teal'>
                <h2 className="font-medium text-lg bg-gradient-to-r from-purple-900 via-indigo-800 to-indigo-900 p-4 text-white">
                    {course?.courseOutput?.CourseName}
                </h2>

                <div>
                    {course?.courseOutput?.Chapters.map((chapter, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <div
                                onClick={() => {
                                    setSelectedChapter(chapter)
                                    GetSelectedChapterContent(index)
                                }}
                                className={`cursor-pointer hover:bg-indigo-700 ${selectedChapter?.ChapterName === chapter?.ChapterName ? 'bg-indigo-700' : ''}`}>
                                <ChapterListCard chapter={chapter} index={index} />
                            </div>

                        </FeatureMotionWrapper>
                    ))}
                </div>
            </div>
            {/* Content DIV RIGHT and video and chapters */}
            <div className='md:ml-64'>
                <ChapterContent chapter={selectedChapter} content={chapterContent} />

            </div>
        </div>
    )
}

export default CourseStart