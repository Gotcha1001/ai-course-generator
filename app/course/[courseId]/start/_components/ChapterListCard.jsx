import React from 'react'
import { GiSandsOfTime } from "react-icons/gi";

function ChapterListCard({ chapter, index }) {
    return (
        <div className='grid grid-cols-5 p-4 items-center border-b border-teal-500  '>
            <div>
                <h2 className='p-1 text-center  bg-primary text-white rounded-full w-8 h-8'> {index + 1}</h2>
            </div>
            <div className='col-span-4'>
                <h2 className='font-medium text-white'>{chapter?.ChapterName}</h2>
                <h2 className='text-yellow-300 flex items-center gap-2 text-sm'><GiSandsOfTime />{chapter?.Duration}</h2>
            </div>
        </div>
    )
}

export default ChapterListCard