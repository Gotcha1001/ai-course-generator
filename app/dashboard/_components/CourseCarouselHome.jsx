import CourseCarousel from "./CourseCarousel";


const CarouselSection = () => {
    return (
        <section className=" py-20 px-5">
            <div className="container mx-auto">
                <h3 className="text-4xl font-bold mb-12 text-center gradient-title">
                    So Many Courses To Create And Share
                </h3>
                <CourseCarousel />
            </div>
        </section>
    );
};

export default CarouselSection;
