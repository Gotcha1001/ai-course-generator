"use client"
import React from 'react';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MotionWrapperDelay from '@/app/_components/FramerMotionStuff/MotionWrapperDelay';

const ShareScreen = ({ params }) => {
    const { user } = useUser();
    const [course, setCourse] = React.useState(null);
    const router = useRouter();

    React.useEffect(() => {
        if (params) getCourse();
    }, [params, user]);

    const getCourse = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) return;

        const result = await db.select().from(CourseList)
            .where(and(
                eq(CourseList.courseId, params?.courseId),
                eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress)
            ));

        setCourse(result[0]);
    };

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    // Updated URL to point to the full course view/learning interface
    const courseUrl = `${process.env.NEXT_PUBLIC_URL}/course/${course.courseId}`;

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(courseUrl);
            alert("Course URL copied to clipboard!");
        } catch (err) {
            alert("Failed to copy URL. Please try again.");
        }
    };

    const handleShare = (platform) => {
        const shareText = `Start learning ${course.courseOutput.CourseName}`;
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(courseUrl)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(courseUrl)}&text=${encodeURIComponent(shareText)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(courseUrl)}`,
            whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${courseUrl}`)}`
        };

        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    return (
        <div className="container mx-auto px-4 py-4 max-w-4xl">
            <Card className="gradient-background2">
                <CardHeader>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >  <CardTitle className="text-4xl text-center gradient-title">
                            Congratulations! Your Course Is Ready to Share
                        </CardTitle> </MotionWrapperDelay>

                </CardHeader>
                <CardContent className="space-y-6">
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        variants={{
                            hidden: { opacity: 0, y: -100 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    ><CourseBasicInfo course={course} /> </MotionWrapperDelay>


                    <Alert>
                        <AlertDescription className="flex items-center justify-between">
                            <span className="text-sm  break-all">{courseUrl}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleCopyUrl}
                                className="ml-2"
                            >
                                <ClipboardCheck className="h-4 w-4" />
                            </Button>
                        </AlertDescription>
                    </Alert>

                    <div className="flex flex-wrap justify-center gap-4">
                        <MotionWrapperDelay
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            variants={{
                                hidden: { opacity: 0, x: -100 },
                                visible: { opacity: 1, x: 0 },
                            }}
                        >      <Button
                            variant="outline"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => handleShare('facebook')}
                        >
                                Share on Facebook
                            </Button></MotionWrapperDelay>
                        <MotionWrapperDelay
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            variants={{
                                hidden: { opacity: 0, y: 100 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >    <Button
                            variant="outline"
                            className="bg-sky-500 hover:bg-sky-600 text-white"
                            onClick={() => handleShare('twitter')}
                        >
                                Share on Twitter
                            </Button> </MotionWrapperDelay>

                        <MotionWrapperDelay
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            variants={{
                                hidden: { opacity: 0, y: -100 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >      <Button
                            variant="outline"
                            className="bg-blue-700 hover:bg-blue-800 text-white"
                            onClick={() => handleShare('linkedin')}
                        >
                                Share on LinkedIn
                            </Button></MotionWrapperDelay>
                        <MotionWrapperDelay
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.7, delay: 0.8 }}
                            variants={{
                                hidden: { opacity: 0, y: -100 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >    <Button
                            variant="outline"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleShare('whatsapp')}
                        >
                                Share on WhatsApp
                            </Button> </MotionWrapperDelay>

                    </div>

                    <div className="text-center text-sm text-gray-500 mt-4">
                        Students will be taken directly to the full course interface when they click the link
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ShareScreen;