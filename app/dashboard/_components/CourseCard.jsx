import Image from 'next/image';
import React from 'react';
import { GiGraduateCap } from "react-icons/gi";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaEllipsisVertical } from "react-icons/fa6";
import DropdownOption from './DropdownOption';
import Link from 'next/link';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function CourseCard({ course, refreshData, displayUser = false }) {
    const handleOnDelete = async () => {
        const resp = await db.delete(CourseList)
            .where(eq(CourseList.id, course?.id))
            .returning({ id: CourseList?.id });

        if (resp) {
            refreshData();
        }
    };

    return (
        <div className='rounded-lg shadow-neon border-2 border-teal-500 p-2 hover:shadow-teal cursor-pointer'>
            <Link href={'/course/' + course?.courseId}>
                <div className='relative w-full h-64  mt-3'>
                    <Image
                        src={course?.courseBanner}
                        alt='course'
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className='object-contain rounded-lg'
                        priority
                    />
                </div>
            </Link>
            <div className='p-2'>
                {/* Title and Options */}
                <div className='flex justify-between items-center'>
                    <h2 className='text-primary font-medium text-lg line-clamp-1'>{course?.courseOutput?.CourseName}</h2>
                    {!displayUser && (
                        <DropdownOption handleOnDelete={handleOnDelete}>
                            <FaEllipsisVertical className="flex-shrink-0 text-indigo-500" />
                        </DropdownOption>
                    )}
                </div>

                {/* Category */}
                <p className='text-sm text-white my-1'>{course?.category}</p>

                {/* Chapters and Level */}
                <div className='flex flex-wrap gap-2 items-center'>
                    <h2 className='text-indigo-300 flex text-xs md:text-sm gap-1 items-center p-2 rounded-lg gradient-background2 whitespace-nowrap'>
                        <GiGraduateCap className="flex-shrink-0" />
                        <span>{course?.courseOutput?.NoOfChapters} Chapters</span>
                    </h2>
                    <h2 className='text-yellow-300 text-xs md:text-sm gradient-background1 p-2 gap-1 flex items-center rounded-lg whitespace-nowrap'>
                        <SiLevelsdotfyi className="flex-shrink-0" />
                        <span>{course?.courseOutput?.Level} Level</span>
                    </h2>
                </div>

                {/* User Info */}
                {displayUser && (
                    <div className='flex gap-2 items-center mt-3'>
                        <Image
                            className='rounded-full flex-shrink-0'
                            src={course?.userProfileImage}
                            alt='User'
                            height={35}
                            width={35}
                        />
                        <h2 className='text-white text-sm line-clamp-1'>{course?.userName}</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseCard;