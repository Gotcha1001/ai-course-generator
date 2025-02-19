
import MotionWrapperDelay from "./_components/FramerMotionStuff/MotionWrapperDelay";
import Header from "./_components/NormalComponents/Header";
import Hero from "./_components/NormalComponents/Hero";
import CourseCarouselHome from '@/app/dashboard/_components/CourseCarouselHome'
import FeatureCard from "./dashboard/_components/HomePage/FeatureCard";
import Questions from "./dashboard/_components/HomePage/Questions";


export default function Home() {
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
      >   <Header /></MotionWrapperDelay>


      {/* Hero Section */}
      <Hero />

      <CourseCarouselHome />

      <FeatureCard />

      <Questions />


    </div>
  )
}
