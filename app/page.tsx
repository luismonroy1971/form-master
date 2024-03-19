'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  // if not user logged in, redirect to login page
  useEffect(() => {
    // This code runs only on the client side
    if (!localStorage.getItem('token')) {
      // If not user logged in, redirect to login page
      router.push('/login');
    } else {
      // If user is logged in, redirect to admin page
      router.push('/admin');
    }
  }, [router]); // Adding router as a dependency

  // Return null, a loader, or any placeholder component during the redirect decision
  return null;
}
