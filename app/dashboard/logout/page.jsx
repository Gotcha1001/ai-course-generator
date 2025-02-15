"use client"
import React, { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


function Logout() {
    const { signOut } = useClerk();  // Hook to get the signOut function
    const router = useRouter();  // For programmatic navigation

    useEffect(() => {
        // Sign out when the component mounts
        signOut();

        // Optionally, redirect the user after sign-out
        router.push('/');  // Redirect to home or login page
    }, [signOut, router]);

    return (
        <div>
            Logging out...
        </div>
    );
}

export default Logout;
