import React from 'react'
import Link from 'next/link'

function Unauthorised() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center pb-32'>
            <h1 className='sm:text-5xl text-3xl mb-5'>Error 401: Unauthorised Access</h1>
            <div className='sm:text-3xl text-xl'>Go to <Link href={'/auth/login'} className='text-blue-600 italic hover:underline hover:cursor-pointer'>LogIn/SignUp Page</Link></div>
        </div>
    )
}

export default Unauthorised