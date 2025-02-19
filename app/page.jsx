"use client"
import { useEffect } from "react";
import MotionWrapperDelay from "./_components/FramerMotionStuff/MotionWrapperDelay";
import Header from "./_components/NormalComponents/Header";
import Hero from "./_components/NormalComponents/Hero";
import CourseCarouselHome from '@/app/dashboard/_components/CourseCarouselHome'
import FeatureCard from "./dashboard/_components/HomePage/FeatureCard";
import Questions from "./dashboard/_components/HomePage/Questions";

export default function Home() {
  // Handle scroll to top when "Get Started" button is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="">

      {/* Header */}
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <Header />
      </MotionWrapperDelay>

      {/* Hero Section */}
      <Hero />

      {/* Course Carousel */}
      <CourseCarouselHome />

      {/* Feature Cards */}
      <FeatureCard />

      {/* FAQ Section */}
      <Questions />

      {/* Scroll to top button at the bottom */}
      <div className="mt-8 flex justify-center">
        <button
          variant="sex1"
          onClick={scrollToTop}
          className="block rounded-sm bg-primary px-12 mt-3 py-3 text-sm mb-16 font-medium text-white shadow-sm hover:bg-indigo-600 focus:ring-3 focus:outline-hidden"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
