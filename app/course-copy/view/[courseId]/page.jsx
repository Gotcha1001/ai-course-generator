"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";



import { CourseViewBasicInfo } from "../../_components/CourseViewBasicInfo";
import { CourseViewDetail } from "../../_components/CourseViewDetail";
import { ChapterViewList } from "../../_components/ChapterViewList";

// Main component
export default async function CourseViewPage({ params }) {
    const { courseId } = params;
    if (!courseId) return <p>No course ID provided</p>;

    const result = await db.select().from(CourseList).where(eq(CourseList.courseId, courseId));
    if (!result.length) return <p>Course not found</p>;

    const course = result[0];

    return (
        <div className="mt-10 px-7 md:px-20 lg:px-44">
            <h2 className="font-bold text-center text-5xl gradient-title">
                {course?.courseOutput?.CourseName}
            </h2>
            <p className='text-indigo-500 text-sm mt-3'>{course?.courseOutput?.Description}</p>
            <CourseViewBasicInfo course={course} />
            <CourseViewDetail course={course} />
            <ChapterViewList course={course} />
        </div>
    );
}
