"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import ChapterList from './_components/ChapterList'
import { Button } from '@/components/ui/button'
import { GenerateChaperContent_AI } from '@/configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '@/configs/service'
import { useRouter } from 'next/navigation'
import MotionWrapperDelay from '@/app/_components/FramerMotionStuff/MotionWrapperDelay'


function CourseLayout({ params }) {

    const { user } = useUser()
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        params && GetCourse()
    }, [params, user])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(and(eq(CourseList.courseId, params?.courseId),
                eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))
        setCourse(result[0])
        console.log("RESULT:", result)
    }

    const GenerateChapterContenxt = () => {
        setLoading(true)
        const chapters = course?.courseOutput?.Chapters;
        chapters.forEach(async (chapter, index) => {
            const PROMPT = 'Explain the concept in Detail on Topic: ' + course?.name + ', Chapter: ' + chapter?.ChapterName + ', in JSON Format with list of array with field as title, description in detail, Code Example(Code field in <precode> format) if applicable'
            console.log("PROMPT:", PROMPT)
            // if (index < 2) {
            try {
                let videoId = ''

                //GENERATE VIDEO URL
                service.getVideos(course?.name + ':' + chapter.ChapterName).then(resp => {
                    console.log(resp)
                    videoId = resp[0]?.id.videoId
                })
                // Generate Chapter Content
                const result = await GenerateChaperContent_AI.sendMessage(PROMPT)
                console.log(result?.response?.text())
                const content = JSON.parse(result?.response?.text())


                // SAVE CHAPTTER CONTENT + VIDEO URL
                await db.insert(Chapters).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    content: content,
                    videoId: videoId
                })
                setLoading(false)
            } catch (e) {
                setLoading(false)
                console.log(e)
            }
            await db.update(CourseList).set({
                publish: true
            })
            router.replace('/create-course/' + course?.courseId + "/finish")
            // }
        })
    }

    return (
        <div className='mt-10 px-7 md:px-20 lg:px-44'>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 },
                }}
            >  <h2 className='font-bold text-center text-5xl gradient-title'>Course Layout</h2></MotionWrapperDelay>

            {/* Basic INFO */}
            <LoadingDialog loading={loading} />
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 },
                }}
            >   <CourseBasicInfo course={course} refreshData={() => GetCourse()} /> </MotionWrapperDelay>

            {/* Course Detail Duration etc.. */}
            <CourseDetail course={course} />
            {/* List of Lessons Chapters */}
            <ChapterList course={course} refreshData={() => GetCourse()} />
            {/* FINAL BUtton to generate the course */}
            <Button
                onClick={GenerateChapterContenxt}
                className="my-10">Generate Course Content</Button>

        </div>
    )
}

export default CourseLayout