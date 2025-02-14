export function ChapterViewList({ course, chapters }) {
    return (
        <div className="mt-10 mb-20">
            <h2 className="text-2xl font-bold mb-5">Course Content</h2>
            <div className="space-y-6">
                {course?.courseOutput?.Chapters?.map((chapter, index) => {
                    const chapterContent = chapters?.find(c => c.chapterId === index)?.content;

                    return (
                        <div key={index} className="border border-teal-500 rounded-lg overflow-hidden">
                            <div className="bg-teal-500/10 p-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold">
                                        Chapter {index + 1}: {chapter.ChapterName}
                                    </h3>
                                    <span className="text-teal-500">
                                        {chapter.Duration}
                                    </span>
                                </div>
                                <p className="text-gray-300 mt-2">
                                    {chapter.About}
                                </p>
                            </div>

                            {chapterContent && (
                                <div className="p-4 space-y-4">
                                    {chapterContent.map((content, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <h4 className="text-lg font-semibold text-teal-500">
                                                {content.title}
                                            </h4>
                                            <p className="text-gray-300">
                                                {content.description}
                                            </p>
                                            {content.code && (
                                                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                                                    <code className="text-sm text-gray-300">
                                                        {content.code}
                                                    </code>
                                                </pre>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}