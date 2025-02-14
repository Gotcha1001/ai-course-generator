"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { IoIosHome } from "react-icons/io";
import { MdAutoFixHigh } from "react-icons/md";
import { GiLightningShield } from "react-icons/gi";
import { FaPowerOff } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

const Menu = [
    { id: 1, name: "Home", icon: <IoIosHome />, path: "/dashboard" },
    { id: 2, name: "Explore", icon: <MdAutoFixHigh />, path: "/dashboard/explore" },
    { id: 3, name: "Upgrade", icon: <GiLightningShield />, path: "/dashboard/upgrade" },
    { id: 4, name: "Logout", icon: <FaPowerOff />, path: "/dashboard/logout" },
];

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const path = usePathname();
    const { userCourseList } = useContext(UserCourseListContext);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative p-5 bg-gradient-to-br from-indigo-800 to-purple-600 shadow-md flex justify-between items-center">
            {/* Logo */}
            <Link href={"/"}>
                <Image
                    className="rounded-lg border border-teal-500 p-1 scale-105 transition-all"
                    src={"/logo102.jpg"}
                    alt="logo"
                    height={300}
                    width={300}
                />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
                {Menu.map((item) => (
                    <Link key={item.id} href={item.path}>
                        <div className={`flex items-center gap-2 text-white p-2 rounded-lg hover:bg-indigo-700 transition-all ${item.path === path ? "bg-indigo-600" : ""}`}>
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.name}</span>
                        </div>
                    </Link>
                ))}
                <UserButton appearance={{ elements: { avatarBox: "w-16 h-16" } }} />
            </div>

            {/* Burger Menu Button (Mobile) */}
            <div className="md:hidden flex items-center gap-4">
                <UserButton appearance={{ elements: { avatarBox: "w-16 h-16" } }} />
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <div className="space-y-2">
                        <div className={`w-8 h-1 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <div className={`w-8 h-1 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
                        <div className={`w-8 h-1 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 w-2/3 h-full bg-indigo-900 text-white p-6 z-50 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:hidden`}>
                <button onClick={toggleMenu} className="absolute top-5 right-5 text-3xl">✖</button>
                <ul className="mt-10 space-y-4">
                    {Menu.map((item) => (
                        <li key={item.id}>
                            <Link href={item.path} onClick={toggleMenu}>
                                <div className={`flex items-center gap-2 text-white p-2 rounded-lg hover:bg-indigo-700 transition-all ${item.path === path ? "bg-indigo-600" : ""}`}>
                                    <span className="text-2xl">{item.icon}</span>
                                    {item.name}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Course Progress Section */}
                <div className="mt-10">
                    <Progress value={((userCourseList?.length || 0) / 5) * 100} />
                    <h2 className="text-yellow-300 text-sm my-2">{userCourseList?.length || 0} Out Of 5 Courses Created</h2>
                    <Link href={'/dashboard/upgrade'}>
                        <h2 className="text-yellow-300 text-xs my-2 text-center border border-indigo-500 rounded-lg p-1">Upgrade Your Plan For Unlimited Course Creations</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;