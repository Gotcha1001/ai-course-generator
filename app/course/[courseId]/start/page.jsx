"use client"
import FeatureMotionWrapper from '@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap'
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react' // Importing burger menu icon
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart({ params }) {
    const [course, setCourse] = useState()
    const [selectedChapter, setSelectedChapter] = useState()
    const [chapterContent, setChapterContent] = useState()
    const [isMenuOpen, setIsMenuOpen] = useState(false) // State for mobile menu toggle

    useEffect(() => {
        GetCourse()
    }, [])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId))
        setCourse(result[0])
        GetSelectedChapterContent(0)
    }

    const GetSelectedChapterContent = async (chapterId) => {
        const result = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId),
                eq(Chapters.courseId, course?.courseId)))
        setChapterContent(result[0])
    }

    return (
        <div className="">
            {/* Mobile Chapter Navigation - Burger Menu */}
            <div className='md:hidden w-full bg-gradient-to-r from-purple-900 via-indigo-800 to-indigo-900 p-4'>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 text-white bg-indigo-700 px-4 py-2 rounded-md"
                >
                    <Menu size={20} /> Chapters
                </button>

                {isMenuOpen && (
                    <div className="mt-2 bg-indigo-900 p-3 rounded-md">
                        {course?.courseOutput?.Chapters.map((chapter, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setSelectedChapter(chapter)
                                    GetSelectedChapterContent(index)
                                    setIsMenuOpen(false) // Close menu on selection
                                }}
                                className={`block w-full text-left px-4 py-2 rounded-md text-sm
                                    ${selectedChapter?.ChapterName === chapter?.ChapterName
                                        ? 'bg-indigo-700 text-white'
                                        : 'bg-indigo-900/50 text-white/80'}`}
                            >
                                Chapter {index + 1}: {chapter.ChapterName}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Desktop Chapter List Side Bar */}
            <div className='fixed md:w-64 hidden md:block h-screen gradient-background2 shadow-teal'>
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
                                className={`cursor-pointer hover:bg-indigo-700 
                                    ${selectedChapter?.ChapterName === chapter?.ChapterName ? 'bg-indigo-700' : ''}`}
                            >
                                <ChapterListCard chapter={chapter} index={index} />
                            </div>
                        </FeatureMotionWrapper>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className='md:ml-64'>
                <ChapterContent
                    chapter={selectedChapter}
                    content={chapterContent}
                />
            </div>
        </div>
    )
}

export default CourseStart
