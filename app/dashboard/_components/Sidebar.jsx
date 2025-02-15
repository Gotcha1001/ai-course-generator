import Image from 'next/image'
import React, { useState, useEffect, useContext } from 'react'
import { IoIosHome } from "react-icons/io";
import { MdAutoFixHigh } from "react-icons/md";
import { GiLightningShield } from "react-icons/gi";
import { FaPowerOff } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import FeatureMotionWrapper from '@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { useUser } from '@clerk/nextjs';

function Sidebar() {

    const path = usePathname()
    const { userCourseList } = useContext(UserCourseListContext)
    const { user } = useUser() // Get user information

    const [userCredits, setUserCredits] = useState(5); // Default fallback value

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
    ];

    // Fetch credits when user is available
    useEffect(() => {
        const fetchCredits = async () => {
            if (!user?.primaryEmailAddress?.emailAddress) {
                console.log("No email address found for user");
                return;
            }

            try {
                const response = await fetch("/api/user/credits", {
                    headers: {
                        email: user.primaryEmailAddress.emailAddress,
                    },
                });

                if (!response.ok) {
                    console.error("Failed to fetch credits, status:", response.status);
                    throw new Error("Failed to fetch credits");
                }

                const data = await response.json();
                setUserCredits(data.credits); // Set the fetched credits
            } catch (error) {
                console.error("Error fetching credits:", error);
                setUserCredits(5); // Default fallback value
            }
        };

        if (user) {
            fetchCredits();
        }
    }, [user]);

    const createdCourses = userCourseList?.length || 0;

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
                <h2 className='text-yellow-300 text-lg my-2 text-center'>{createdCourses} Courses Created</h2>


                <Link href={'/dashboard/upgrade'}>
                    <h2 className='text-yellow-300 text-xs my-2 text-center border border-indigo-500 rounded-lg p-1'>Upgrade Your Plan For Unlimited Course Creations</h2>
                </Link>

                {/* Display user credits */}
                <div className="credits-display mt-4">
                    <p className="text-yellow-300 rounded-lg text-sm shadow-neon text-center">Available Credits: {userCredits}</p>
                    <h2 className='text-yellow-300 text-sm my-2 text-center'> (1 Course per Token)</h2>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
