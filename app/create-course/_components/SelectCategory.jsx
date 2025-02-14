import FeatureMotionWrapper from '@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap'
import { UserInputContext } from '@/app/_context/UserInputContext'
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'

function SelectCategory() {

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

    const handleCategoryChange = (category) => {
        setUserCourseInput(prev => ({
            ...prev,
            category: category
        }))
    }

    return (
        <div className='px-10 md:px-20 '>
            <h2 className='my-5'>Select The Course Category</h2>

            <div className='grid md:grid-cols-3 gap-10 '>

                {CategoryList.map((item, index) => (
                    <FeatureMotionWrapper key={item.id} index={index}>
                        <div className={`flex flex-col p-5 border items-center rounded-xl hover:border-teal-500 hover:bg-indigo-600 cursor-pointer hover:scale-105 transition-all ${userCourseInput?.category == item.name && 'border-2 border-teal-500 bg-indigo-500'} `}
                            onClick={() => handleCategoryChange(item.name)}
                            defaultValue={userCourseInput?.category}

                        >
                            <Image
                                src={item.icon}
                                alt='Category'
                                width={60}
                                height={60}
                                className="w-[60px] h-[60px] object-contain"
                            />

                            <h2>{item.name}</h2>
                        </div>
                    </FeatureMotionWrapper>
                ))}
            </div>
        </div>
    )
}

export default SelectCategory