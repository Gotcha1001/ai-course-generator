"use client"
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


function CreateCourse() {

  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const { user } = useUser()
  const router = useRouter()

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

  useEffect(() => {
    console.log("USER SELECTED STUFF:", userCourseInput)
  }, [userCourseInput])

  // Used to check Next Button Enabled or Disabled Status
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true
    }
    if (activeIndex == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)) {
      return true
    }
    if (activeIndex == 1 && (userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined)) {
      return true
    }
    else if (activeIndex == 2 && (userCourseInput?.level == undefined || userCourseInput?.duration == undefined || userCourseInput?.displayVideo == undefined || userCourseInput?.noOfChapters == undefined)) {
      return true
    }
    return false
  }

  const GenerateCourseLayout = async () => {
    setLoading(true)
    const BASIC_PROMPT = "Generate a course tutorial with the following details: Course Name, Description, Chapter Name, About, and Duration."
    const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapters}, in JSON format`;
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT
    console.log("FINAL PROMPT:", FINAL_PROMPT)
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT)
    console.log("AI RESULT:", result.response?.text())
    console.log(JSON.parse(result.response?.text()))
    setLoading(false)
    SaveCourseLayoutInDb(JSON.parse(result.response?.text()))

  }

  const SaveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4();   //COURSE ID
    setLoading(true)
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl
    })
    console.log("DB-RESULT:", result)
    setLoading(false)
    router.replace('/create-course/' + id)
  }

  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiCircleStack />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  return (
    <div className="text-white">
      {/* STEPPER  */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <FeatureMotionWrapper key={item.id} index={index}>
              <div className="flex items-center">
                <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                  <div className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index && 'bg-indigo-500 '}`}>
                    {item.icon}
                  </div>
                  <h2 className="hidden md:block md:text-sm">{item.name}</h2>
                </div>
                {index != StepperOptions?.length - 1 && (
                  <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex - 1 >= index && 'bg-indigo-500'} `}></div>
                )}
              </div>
            </FeatureMotionWrapper>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* Show Components */}
        {activeIndex == 0 ? <SelectCategory /> :
          activeIndex == 1 ? < TopicDescription /> : <SelectOption />
        }
        {/* NEXT and Previous Button */}
        <div className="flex justify-between mt-10 mb-10">
          <Button
            onClick={() => setActiveIndex(activeIndex - 1)}
            variant="sex1" disabled={activeIndex == 0}>Previous</Button>
          {activeIndex < 2 && <Button disabled={checkStatus()}
            onClick={() => setActiveIndex(activeIndex + 1)}
            variant="sex1">Next
          </Button>}

          {activeIndex == 2 && <Button disabled={checkStatus()}
            onClick={() => GenerateCourseLayout()}
            variant="sex1">Generate Course Layout
          </Button>}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;
