"use client";


import axios from "axios";
import React, { useEffect, useState } from "react";
import { TotalUsageContext } from "./_context/TotalUsageContext";
import { CreditContext } from "./_context/CreditContext";
import { UpdateCreditUsageContext } from "./_context/UpdateCreditUsageContext";
import { useUser } from "@clerk/nextjs";


function Provider({ children }) {
    const { user } = useUser();
    const [userDetail, setUserDetail] = useState(null);
    const [credits, setCredits] = useState(0);
    const [courseCount, setCourseCount] = useState(0); // Track number of courses
    const [updateCreditUsage, setUpdateCreditUsage] = useState(null);

    useEffect(() => {
        if (user) {
            verifyUser();
            fetchCourseCount();
        }
    }, [user]);

    const verifyUser = async () => {
        try {
            const response = await axios.post("/api/verify-user", { user });
            setUserDetail(response.data.result);
            setCredits(response.data.result?.credits || 5);
        } catch (error) {
            console.error("Error verifying user:", error);
        }
    };

    const fetchCourseCount = async () => {
        try {
            const response = await axios.get(`/api/get-course-count?email=${user.primaryEmailAddress.emailAddress}`);
            setCourseCount(response.data.courseCount || 0);
        } catch (error) {
            console.error("Error fetching course count:", error);
        }
    };

    return (
        <CreditContext.Provider value={{ credits, setCredits, userDetail }}>
            <TotalUsageContext.Provider value={{ courseCount, setCourseCount }}>
                <UpdateCreditUsageContext.Provider value={{ updateCreditUsage, setUpdateCreditUsage }}>
                    {children}
                </UpdateCreditUsageContext.Provider>
            </TotalUsageContext.Provider>
        </CreditContext.Provider>
    );
}

export default Provider;
