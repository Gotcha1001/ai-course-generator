import React from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';
import Header from '@/app/dashboard/_components/Header';

function ChapterContent({ chapter, content }) {
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className='p-4 md:p-10 mt-4'>
                <h2 className='gradient-title text-4xl text-center'>{chapter?.ChapterName}</h2>
                <p className='text-primary text-center'>{chapter?.About}</p>

                {/* Video container with responsive sizing */}
                <div className='relative w-full my-6 px-4 md:px-0'>
                    <div className='aspect-video'>
                        <YouTube
                            videoId={content?.videoId}
                            opts={opts}
                            className='absolute top-0 left-0 w-full h-full'
                            iframeClassName='w-full h-full'
                        />
                    </div>
                </div>

                <div>
                    {content?.content?.chapters.map((item, index) => (
                        <div key={index} className='p-5 bg-slate-50 mb-3 rounded-lg'>
                            <h2 className='text-purple-500 font-medium text-lg'>{item.title}</h2>
                            <ReactMarkdown>{item?.description}</ReactMarkdown>

                            {item.code && (
                                <div className='p-4 gradient-background2 text-white rounded-md mt-3'>
                                    <pre>
                                        <code>{item.code}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChapterContent;