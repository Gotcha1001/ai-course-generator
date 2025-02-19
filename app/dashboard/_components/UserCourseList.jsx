"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import FeatureMotionWrapper from "@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap";
import MotionWrapperDelay from "@/app/_components/FramerMotionStuff/MotionWrapperDelay";
import { Button } from "@/components/ui/button";

function UserCourseList({ searchQuery }) {
    const { user } = useUser();
    const [allCourses, setAllCourses] = useState([]); // Store all courses
    const [courseList, setCourseList] = useState([]); // Paginated courses
    const [filteredCourses, setFilteredCourses] = useState([]); // Search results
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 9; // Number of courses per page

    const { setUserCourseList } = useContext(UserCourseListContext);

    useEffect(() => {
        if (user) getUserCourses();
    }, [user]);

    const getUserCourses = async () => {
        setLoading(true);
        const result = await db
            .select()
            .from(CourseList)
            .where(eq(CourseList.createdBy, user?.primaryEmailAddress.emailAddress));

        setAllCourses(result);
        setFilteredCourses(result); // Initially show all courses
        setPaginatedCourses(result, 0);
        setUserCourseList(result);
        setLoading(false);
    };

    const setPaginatedCourses = (courses, page) => {
        const start = page * pageSize;
        setCourseList(courses.slice(start, start + pageSize));
    };

    // Filter courses dynamically based on search input
    useEffect(() => {
        if (!searchQuery) {
            setFilteredCourses(allCourses);
            setPaginatedCourses(allCourses, pageIndex);
        } else {
            const filtered = allCourses.filter((course) =>
                course?.courseOutput?.CourseName?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCourses(filtered);
            setPaginatedCourses(filtered, 0); // Reset to first page
        }
    }, [searchQuery, allCourses]);

    useEffect(() => {
        // Scroll to the top when pageIndex changes
        window.scrollTo(0, 0);
    }, [pageIndex]); // This will run every time the pageIndex changes


    const handlePageChange = (newIndex) => {
        setPageIndex(newIndex);
        setPaginatedCourses(filteredCourses, newIndex);
    };

    return (
        <div className="mt-10">
            <MotionWrapperDelay initial="hidden" whileInView="visible">
                <h2 className="font-bold text-5xl text-primary mb-10 text-center">
                    My AI Courses
                </h2>
            </MotionWrapperDelay>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                    [1, 2, 3, 4, 5].map((_, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <div className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]" />
                        </FeatureMotionWrapper>
                    ))
                ) : courseList.length > 0 ? (
                    courseList.map((course, index) => (
                        <FeatureMotionWrapper index={index} key={index}>
                            <CourseCard course={course} key={index} refreshData={getUserCourses} />
                        </FeatureMotionWrapper>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-3">No courses found.</p>
                )}
            </div>

            {/* Pagination (Only if not searching) */}
            {!searchQuery && (
                <div className="flex justify-between mt-5">
                    {pageIndex > 0 && (
                        <Button variant="sex1" onClick={() => handlePageChange(pageIndex - 1)}>
                            Previous Page
                        </Button>
                    )}
                    {filteredCourses.length > (pageIndex + 1) * pageSize && (
                        <Button variant="sex1" onClick={() => handlePageChange(pageIndex + 1)}>
                            Next Page
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserCourseList;
