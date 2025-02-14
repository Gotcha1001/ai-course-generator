import { UserInputContext } from '@/app/_context/UserInputContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

function TopicDescription() {

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

    const handleInputChange = (fieldName, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }

    const checkStatus = () => {
        if (userCourseInput?.length == 0) {
            return true
        }
        return false
    }

    return (
        <div className='mx-20 lg:mx-44 gradient-background2 p-3 rounded-lg'>
            {/* INPUT TOPIC */}
            <div className='mt-5' >
                <label >💡Write the topic for which you want to generate a course (eg. Python, Yoga etc...)
                </label>
                <Input

                    placeholder={'Topic'}
                    defaultValue={userCourseInput?.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)} />
            </div>
            {/* Text Area Desc */}
            <div className='mt-5'>
                <label  >📝Tell Us More About Your Course, What You Want To Include In The Course (Optional) </label>
                <Textarea placeholder="About Your Course"
                    defaultValue={userCourseInput?.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                />
            </div>

        </div>
    )
}

export default TopicDescription