
import { Button } from '../../../components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <div className='flex justify-between items-center p-5 gradient-background2 '>
            <Image className='shadow-neon bg-indigo-600 p-1 rounded-xl border-2 border-teal-500' src="/logo102.jpg" alt='Logo' width={250} height={100} />
            <Link href={'/dashboard'}>
                <Button variant="sex1" >Get Started</Button>
            </Link>

        </div>
    )
}

export default Header