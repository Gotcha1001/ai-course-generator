"use client"
import Image from 'next/image'
import React, { useContext } from 'react'
import { IoIosHome } from "react-icons/io";
import { MdAutoFixHigh } from "react-icons/md";
import { GiLightningShield } from "react-icons/gi";
import { FaPowerOff } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import FeatureMotionWrapper from '@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap';
import { Progress } from '@/components/ui/progress';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

function Sidebar() {

    const path = usePathname()

    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext)

    const Menu = [
        {
            id: 1,
            name: 'Home',
            icon: <IoIosHome />,
            path: '/dashboard'

        },
        {
            id: 2,
            name: 'Explore',
            icon: <MdAutoFixHigh />,
            path: '/dashboard/explore'

        },
        {
            id: 3,
            name: 'Upgrade',
            icon: <GiLightningShield />,
            path: '/dashboard/upgrade'

        },
        {
            id: 4,
            name: 'Logout',
            icon: <FaPowerOff />,
            path: '/dashboard/logout'

        }
    ]

    return (
        <div className="w-64 h-full fixed left-0 top-0 gradient-background2 p-2">
            <Image src={'/logo.png'} alt='logo' height={160} width={250} className='horizontal-rotate' />
            <ul className='space-y-5'>
                {Menu.map((item, index) => (
                    <FeatureMotionWrapper key={item.id} index={index}>
                        <Link href={item.path}>
                            <div className={`flex items-center p-2 gap-2 text-white hover:bg-indigo-500 cursor-pointer hover:text-teal-500  rounded-lg ${item.path == path && 'bg-indigo-600'}`}>
                                <div className="mr-2 text-white text-3xl hover:text-teal-500">{item.icon}</div>
                                <h2>{item.name}</h2>
                            </div>
                        </Link>
                    </FeatureMotionWrapper>
                ))}
            </ul>
            <div className='absolute bottom-10 w-[80%]'>
                <Progress value={(userCourseList?.length / 5) * 100} />
                <h2 className='text-yellow-300 text-sm my-2'>{userCourseList?.length} Out Of 5 Courses Created</h2>
                <Link href={'/dashboard/upgrade'}>
                    <h2 className='text-yellow-300 text-xs my-2 text-center border border-indigo-500 rounded-lg p-1'>Upgrade Your Plan For Unlimited Course Creations</h2>
                </Link>

            </div>
        </div>
    )
}

export default Sidebar