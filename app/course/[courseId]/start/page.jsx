"use client"
import FeatureMotionWrapper from '@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap'
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { Menu, Share2, ClipboardCheck } from 'lucide-react' // Added Share2 and ClipboardCheck icons
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

function CourseStart({ params }) {
    const [course, setCourse] = useState()
    const [selectedChapter, setSelectedChapter] = useState()
    const [chapterContent, setChapterContent] = useState()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showShareAlert, setShowShareAlert] = useState(false)

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

    const handleCopyUrl = async () => {
        try {
            const courseUrl = `${process.env.NEXT_PUBLIC_URL}/course/${params.courseId}`
            await navigator.clipboard.writeText(courseUrl)
            setShowShareAlert(true)
            setTimeout(() => setShowShareAlert(false), 3000)
        } catch (err) {
            console.error("Failed to copy URL:", err)
        }
    }

    return (
        <div className="">
            {/* Mobile Chapter Navigation - Burger Menu */}
            <div className='md:hidden w-full bg-gradient-to-r from-purple-900 via-indigo-800 to-indigo-900 p-4'>
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-2 text-white bg-indigo-700 px-4 py-2 rounded-md"
                    >
                        <Menu size={20} /> Chapters
                    </button>
                    <Button
                        variant="sex1"
                        size="icon"
                        onClick={handleCopyUrl}
                        className="bg-indigo-700 text-white"
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>

                {isMenuOpen && (
                    <div className="mt-2 bg-indigo-900 p-3 rounded-md">
                        {course?.courseOutput?.Chapters.map((chapter, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setSelectedChapter(chapter)
                                    GetSelectedChapterContent(index)
                                    setIsMenuOpen(false)
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
                <div className="flex justify-between items-center bg-gradient-to-r from-purple-900 via-indigo-800 to-indigo-900 p-4">
                    <h2 className="font-medium text-lg text-white">
                        {course?.courseOutput?.CourseName}
                    </h2>
                    <Button
                        variant="sex1"
                        size="icon"
                        onClick={handleCopyUrl}
                        className="bg-indigo-700 text-white rounded-lg p-3"
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>

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

            {/* Share Alert */}
            {showShareAlert && (
                <div className="fixed top-4 right-4 z-50">
                    <Alert className="bg-green-500 text-white">
                        <AlertDescription className="flex items-center gap-2">
                            <ClipboardCheck className="h-4 w-4" />
                            Course URL copied to clipboard!
                        </AlertDescription>
                    </Alert>
                </div>
            )}

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