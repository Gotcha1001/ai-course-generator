"use client";

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";

function FinishScreen({ params }) {
    const { user } = useUser();
    const [course, setCourse] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (params) GetCourse();
    }, [params, user]);

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(and(
                eq(CourseList.courseId, params?.courseId),
                eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
            ));

        setCourse(result[0]);
        console.log("RESULT:", result);
    };

    if (!course) return <p>Loading...</p>;

    const courseUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/course-copy/view/${course.courseId}`;

    return (
        <div className='px-10 md:px-20 lg:px-44 my-7'>
            <h2 className='text-center font-bold text-2xl text-indigo-500 my-3'>Congrats! Your Course Is Ready</h2>

            <CourseBasicInfo course={course} refreshData={() => console.log()} />

            <h2 className='mt-3 text-yellow-400'>Course URL:</h2>
            <h2 className='gradient-title text-center border-2 border-teal-500 p-2 rounded-lg flex gap-5 items-center '>
                {courseUrl}

                {/* Copy to Clipboard Button */}
                <HiClipboardDocumentCheck
                    className='text-yellow-500 h-10 w-10 cursor-pointer'
                    onClick={async () => {
                        await navigator.clipboard.writeText(courseUrl);
                        alert("Course URL copied!");
                    }}
                />
            </h2>

            {/* Social Share Buttons */}
            <div className="flex gap-4 mt-4">
                <FacebookShareButton url={courseUrl}><FaFacebook className="text-blue-600 h-8 w-8 cursor-pointer" /></FacebookShareButton>
                <TwitterShareButton url={courseUrl}><FaTwitter className="text-blue-400 h-8 w-8 cursor-pointer" /></TwitterShareButton>
                <WhatsappShareButton url={courseUrl}><FaWhatsapp className="text-green-500 h-8 w-8 cursor-pointer" /></WhatsappShareButton>
                <LinkedinShareButton url={courseUrl}><FaLinkedin className="text-blue-700 h-8 w-8 cursor-pointer" /></LinkedinShareButton>
            </div>
        </div>
    );
}

export default FinishScreen;
