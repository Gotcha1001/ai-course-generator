import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext'
import MotionWrapperDelay from '@/app/_components/FramerMotionStuff/MotionWrapperDelay'


function SelectOption() {


    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

    const handleInputChange = (fieldName, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }

    return (
        <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
            }}
        >
            <div className='px-10 md:px-20 lg:px-44 gradient-background2 p-3 rounded-lg'>
                <div className='grid grid-cols-2 gap-10'>
                    <div>
                        <label className='text-sm'>🎓Difficulty Level</label>
                        <Select onValueChange={(value) => handleInputChange('level', value)}
                            defaultValue={userCourseInput?.level}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    <div>
                        <label className='text-sm'>⌚Course Duration</label>
                        <Select onValueChange={(value) => handleInputChange('duration', value)}
                            defaultValue={userCourseInput?.duration}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1 Hours">1 Hours</SelectItem>
                                <SelectItem value="2 Hours">2 Hours</SelectItem>
                                <SelectItem value="More Than 3 Hours">More Than 3 Hours</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className='text-sm'>▶Add a Video </label>
                        <Select onValueChange={(value) => handleInputChange('displayVideo', value)}
                            defaultValue={userCourseInput?.displayVideo}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className='text-sm'>📖Number Of Chapters</label>
                        <Input
                            defaultValue={userCourseInput?.noOfChapters}
                            type="number"
                            onChange={(event) => handleInputChange('noOfChapters', event.target.value)}
                        />
                    </div>
                </div>
            </div>
        </MotionWrapperDelay>
    )
}

export default SelectOption