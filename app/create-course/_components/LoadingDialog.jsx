import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'



function LoadingDialog({ loading }) {
    return (
        <div>
            <AlertDialog open={loading}>
                <AlertDialogContent >
                    <AlertDialogHeader className="gradient-background2 rounded-xl">
                        <AlertDialogDescription>
                            <div className='flex flex-col items-center py-10'>
                                <Image src={'/loader.gif'} alt='Loader' height={100} width={100} />
                                <h2 className='font-bold text-teal-500 animate-bounce mt-10'>Please wait... AI is working on your course</h2>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default LoadingDialog