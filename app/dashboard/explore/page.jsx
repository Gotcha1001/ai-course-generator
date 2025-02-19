"use client";
import FeatureMotionWrapper from "@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";
import MotionWrapperDelay from "@/app/_components/FramerMotionStuff/MotionWrapperDelay";
import SearchBar from "../_components/SearchBar";

function Explore() {
    const [allCourses, setAllCourses] = useState([]); // Store all courses
    const [courseList, setCourseList] = useState([]); // Paginated courses
    const [filteredCourses, setFilteredCourses] = useState([]); // Search results
    const [searchQuery, setSearchQuery] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state
    const pageSize = 9;

    useEffect(() => {
        GetAllCourses();
    }, []);

    useEffect(() => {
        // Scroll to the top when pageIndex changes
        window.scrollTo(0, 0);
    }, [pageIndex]); // This will run every time the pageIndex changes

    const GetAllCourses = async () => {
        // Fetch all courses instead of limiting to 9
        const result = await db.select().from(CourseList);
        setAllCourses(result);
        setFilteredCourses(result); // Initially show all courses
        setPaginatedCourses(result, pageIndex);
        setLoading(false); // Set loading to false once data is fetched
    };

    const setPaginatedCourses = (courses, page) => {
        const start = page * pageSize;
        setCourseList(courses.slice(start, start + pageSize));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);

        if (!query) {
            setFilteredCourses(allCourses);
            setPaginatedCourses(allCourses, pageIndex);
        } else {
            const filtered = allCourses.filter((course) =>
                course?.courseOutput?.CourseName?.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCourses(filtered);
            setPaginatedCourses(filtered, 0); // Reset to first page
        }
    };

    const handlePageChange = (newIndex) => {
        setPageIndex(newIndex);
        setPaginatedCourses(filteredCourses, newIndex);
    };

    return (
        <div>
            <MotionWrapperDelay initial="hidden" whileInView="visible">
                <h2 className="font-bold text-3xl gradient-title text-center">Explore More Projects</h2>
            </MotionWrapperDelay>
            <MotionWrapperDelay initial="hidden" whileInView="visible">
                <p className="text-center text-indigo-500 mb-5">Explore other projects built by AI created by other users.</p>
            </MotionWrapperDelay>

            {/* Search Bar */}
            <div className="flex justify-center my-5">
                <SearchBar onSearch={handleSearch} />
            </div>

            {/* Show loading skeleton or course cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                    [1, 2, 3, 4, 5].map((_, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <div className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]" />
                        </FeatureMotionWrapper>
                    ))
                ) : courseList.length > 0 ? (
                    courseList.map((course, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <CourseCard course={course} displayUser={true} />
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

export default Explore;
