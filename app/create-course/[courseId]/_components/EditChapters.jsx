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


function EditChapters({ index, course, refreshData }) {


    const Chapters = course?.courseOutput?.Chapters


    const [name, setName] = useState()
    const [about, setAbout] = useState()

    //Set default values 
    useEffect(() => {
        setName(Chapters[index].ChapterName)
        setAbout(Chapters[index].About)
    }, [course])

    const onUpdateHandler = async () => {
        course.courseOutput.Chapters[index].ChapterName = name
        course.courseOutput.Chapters[index].About = about

        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.id, course?.id))
            .returning({ id: CourseList.id })

        refreshData(true)
        console.log("RESULT++:", result)

    }

    return (
        <div><Dialog>
            <DialogTrigger>
                <FaRegEdit className='text-white text-4xl' />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="gradient-background2 p-4 rounded-lg">
                    <DialogTitle>Edit Chapters</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label className='text-primary font-bold'>Course Title</label>
                            <Input
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={Chapters[index].ChapterName}

                                className="text-white" />
                        </div>
                        <div>
                            <label className='text-primary font-bold'>Description</label>
                            <Textarea

                                onChange={(e) => setAbout(e.target.value)}
                                defaultValue={Chapters[index].About}
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

export default EditChapters