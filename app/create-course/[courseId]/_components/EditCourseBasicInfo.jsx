import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaRegEdit } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';


function EditCourseBasicInfo({ course, refreshData }) {

    const [name, setName] = useState()
    const [description, setDescription] = useState()


    //Set default values 
    useEffect(() => {
        setName(course?.courseOutput?.CourseName)
        setDescription(course?.courseOutput?.Description)
    }, [course])

    const onUpdateHandler = async () => {
        course.courseOutput.CourseName = name
        course.courseOutput.Description = description
        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.id, course?.id))
            .returning({ id: CourseList.id })

        refreshData(true)
        console.log("RESULT++:", result)

    }

    return (
        <div >
            <Dialog >
                <DialogTrigger ><FaRegEdit className='text-white text-4xl' /></DialogTrigger>
                <DialogContent >
                    <DialogHeader className="gradient-background2 p-4 rounded-lg">
                        <DialogTitle className="text-white">Edit Course Title And Description</DialogTitle>
                        <DialogDescription>
                            <div className='mt-3'>
                                <label className='text-primary font-bold'>Course Title</label>
                                <Input
                                    onChange={(e) => setName(e.target.value)}
                                    defaultValue={course?.courseOutput?.CourseName}
                                    className="text-white" />
                            </div>
                            <div>
                                <label className='text-primary font-bold'>Description</label>
                                <Textarea
                                    onChange={(e) => setDescription(e.target.value)}
                                    defaultValue={course?.courseOutput?.Description}
                                    className="text-white h-40" />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button
                                onClick={onUpdateHandler}
                            >Update</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default EditCourseBasicInfo