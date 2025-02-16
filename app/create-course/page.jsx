"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  HiCircleStack,
  HiClipboardDocumentCheck,
  HiLightBulb,
} from "react-icons/hi2";
import FeatureMotionWrapper from "../_components/FramerMotionStuff/FeatureMotionWrapperMap";
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import MotionWrapperDelay from "../_components/FramerMotionStuff/MotionWrapperDelay";

function CreateCourse() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userCredits, setUserCredits] = useState(5);
  const { user } = useUser();
  const router = useRouter();
  const { userCourseInput } = useContext(UserInputContext);

  // Fetch user credits from the API
  useEffect(() => {
    const fetchCredits = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) {
        console.log("No email address found for user");
        return;
      }

      console.log("Fetching credits for email:", user.primaryEmailAddress.emailAddress);

      try {
        const response = await fetch('/api/user/credits', {
          headers: {
            'email': user.primaryEmailAddress.emailAddress
          }
        });

        if (!response.ok) {
          console.error("Failed to fetch credits, status:", response.status);
          throw new Error("Failed to fetch credits");
        }

        const data = await response.json();
        console.log("Credits fetched successfully:", data);
        setUserCredits(data.credits);
      } catch (error) {
        console.error("Error fetching credits:", error);
        setUserCredits(5);  // Default fallback value
      }
    };


    if (user) {
      fetchCredits();
    }
  }, [user]);

  const checkStatus = () => {
    if (userCredits <= 0 && activeIndex === 2) return true;
    if (!userCourseInput || Object.keys(userCourseInput).length === 0) return true;
    if (activeIndex === 0 && (!userCourseInput?.category || userCourseInput.category.length === 0)) return true;
    if (activeIndex === 1 && (!userCourseInput?.topic || userCourseInput.topic.length === 0)) return true;
    if (
      activeIndex === 2 &&
      (!userCourseInput?.level || !userCourseInput?.duration || !userCourseInput?.displayVideo || !userCourseInput?.noOfChapters)
    ) {
      return true;
    }
    return false;
  };

  const GenerateCourseLayout = async () => {
    if (userCredits <= 0) return; // Prevent course creation if credits are zero

    setLoading(true);
    try {
      const BASIC_PROMPT = "Generate a course tutorial with the following details: Course Name, Description, Chapter Name, About, and Duration.";
      const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapters}, in JSON format`;
      const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
      const responseText = await result.response?.text();
      const parsedResponse = JSON.parse(responseText);

      await SaveCourseLayoutInDb(parsedResponse);
    } catch (error) {
      console.error("Error generating course:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const id = uuid4();
    setLoading(true);

    try {
      // First save the course
      await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput?.topic,
        level: userCourseInput?.level,
        category: userCourseInput?.category,
        courseOutput: courseLayout,
        createdBy: user.primaryEmailAddress.emailAddress,
        userName: user.fullName,
        userProfileImage: user.imageUrl,
      });

      // Then update credits
      const creditsResponse = await fetch('/api/user/credits', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credits: userCredits - 1,
          email: user.primaryEmailAddress.emailAddress
        }),
      });

      if (!creditsResponse.ok) {
        throw new Error('Failed to update credits');
      }

      setUserCredits(prev => prev - 1);
      router.replace(`/create-course/${id}`);
    } catch (error) {
      console.error("Error saving course:", error);
      throw error; // Re-throw to be caught by the calling function
    } finally {
      setLoading(false);
    }
  };

  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiCircleStack /> },
    { id: 2, name: "Topic & Desc", icon: <HiLightBulb /> },
    { id: 3, name: "Options", icon: <HiClipboardDocumentCheck /> },
  ];

  return (
    <div className="text-white">
      {/* STEPPER */}
      <div className="flex flex-col justify-center items-center mt-10">
        <MotionWrapperDelay
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >   <h2 className="text-4xl text-primary font-medium">Create Course</h2></MotionWrapperDelay>

        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <FeatureMotionWrapper key={item.id} index={index}>
              <div className="flex items-center">
                <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                  <div className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index && "bg-indigo-500"}`}>
                    {item.icon}
                  </div>
                  <h2 className="hidden md:block md:text-sm">{item.name}</h2>
                </div>
                {index !== StepperOptions.length - 1 && (
                  <div className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full bg-gray-300 ${activeIndex - 1 >= index && "bg-indigo-500"}`} />
                )}
              </div>
            </FeatureMotionWrapper>
          ))}
        </div>
      </div>

      {/* Show Components */}
      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {activeIndex === 0 ? <SelectCategory /> : activeIndex === 1 ? <TopicDescription /> : <SelectOption />}

        {/* Credits Display */}
        <div className="text-center mt-4">
          <p className="text-yellow-300">Available Credits: {userCredits}</p>
        </div>

        {/* NEXT and Previous Button */}
        <div className="flex justify-between mt-10 mb-10">
          <Button onClick={() => setActiveIndex(activeIndex - 1)} variant="sex1" disabled={activeIndex === 0}>
            Previous
          </Button>

          {activeIndex < 2 && (
            <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)} variant="sex1">
              Next
            </Button>
          )}

          {activeIndex === 2 && (
            <Button disabled={checkStatus() || userCredits <= 0} onClick={() => GenerateCourseLayout()} variant="sex1">
              {userCredits > 0 ? "Generate Course Layout" : "No Credits Left"}
            </Button>
          )}
        </div>
      </div>

      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;