import { HiPuzzlePiece } from "react-icons/hi2";
export function CourseViewBasicInfo({ course }) {
    return (
        <div className="p-10 border-2 border-teal-500 rounded-xl mt-10 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h2 className='text-white font-bold text-3xl'>{course?.courseOutput?.CourseName}</h2>
                    <p className='text-indigo-500 text-sm mt-3'>{course?.courseOutput?.Description}</p>
                    <div className="mt-4">
                        <h2 className='font-md mt-2 flex gap-2 items-center text-white'>
                            <HiPuzzlePiece />
                            {course?.category}
                        </h2>
                        <span className="ml-2 bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                            {course?.Topic}
                        </span>
                    </div>
                </div>
                <div>
                    {course?.courseBanner && (
                        <img
                            src={course.courseBanner}
                            alt="Course Banner"
                            className="rounded-xl w-full h-[200px] object-contain"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
