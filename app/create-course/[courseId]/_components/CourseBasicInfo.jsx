import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiPuzzlePiece } from "react-icons/hi2";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/configs/firebaseConfig';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

function CourseBasicInfo({ course, refreshData, edit = true }) {
    const [selectedFile, setSelectedFile] = useState(course?.courseBanner || '/upload.jpg'); // Initialize with course banner

    // Fetch latest image URL when component loads
    useEffect(() => {
        if (course?.courseBanner) {
            setSelectedFile(course.courseBanner);
        }
    }, [course]);

    // Select file and upload to Firebase Storage
    const onFileSelected = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `ai-course/${fileName}`);

        try {
            // Upload file to Firebase Storage
            await uploadBytes(storageRef, file);
            console.log("File uploaded successfully");

            // Get download URL
            const downloadUrl = await getDownloadURL(storageRef);
            console.log("Download URL:", downloadUrl);

            // Update database with new URL
            await db.update(CourseList)
                .set({ courseBanner: downloadUrl })
                .where(eq(CourseList.id, course?.id));

            // Update state to show the new image
            setSelectedFile(downloadUrl);

            // Refresh data
            refreshData();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className='p-10 border-2 border-teal-500 rounded-xl mt-10 mb-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <div className='flex items-center gap-3'>
                        <h2 className='text-white font-bold text-3xl'>{course?.courseOutput?.CourseName}</h2>
                        {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />}

                    </div>
                    <p className='text-indigo-500 text-sm mt-3'>{course?.courseOutput?.Description}</p>
                    <h2 className='font-md mt-2 flex gap-2 items-center text-white'>
                        <HiPuzzlePiece />
                        {course?.category}
                    </h2>
                    {!edit && <Link href={'/course/' + course?.courseId + "/start"}>
                        <Button className="w-full mt-5">Start</Button>
                    </Link>}


                </div>
                <div>
                    <label htmlFor='upload-image'>
                        <Image
                            src={selectedFile}
                            alt='Upload'
                            height={300}
                            width={300}
                            className='rounded-xl w-full cursor-pointer h-[200px] object-contain'
                        />
                    </label>
                    {edit && <input
                        type="file"
                        id="upload-image"
                        className='opacity-0'
                        onChange={onFileSelected}
                    />}

                </div>
            </div>
        </div>
    );
}

export default CourseBasicInfo;
