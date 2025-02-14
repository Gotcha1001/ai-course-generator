import { DetailItem } from "./DetailItem";

export function CourseViewDetail({ course }) {
    return (
        <div className="border p-6 rounded-xl shadow-teal mt-3 mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <DetailItem
                    label="Skill Level"
                    value={course?.courseOutput?.Level}
                />
                <DetailItem
                    label="Duration"
                    value={course?.courseOutput?.Duration}
                />
                <DetailItem
                    label="Chapters"
                    value={course?.courseOutput?.NoOfChapters}
                />
                <DetailItem
                    label="Video Included"
                    value={course?.courseOutput?.includeVideo ? "Yes" : "No"}
                />
            </div>
        </div>
    );
}
