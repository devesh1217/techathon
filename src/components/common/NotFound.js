import React from 'react'

function NotFound() {
    return (
        <div>
            <div className='w-full h-screen flex flex-col items-center justify-center pb-32'>
            <h1 className='sm:text-5xl text-3xl mb-5'>Error 404: Page Not Found</h1>
            <div className='sm:text-3xl text-xl'>Go to <Link href={'/'} className='text-blue-600 italic hover:underline hover:cursor-pointer'>Home Page</Link></div>
        </div>
        </div>
    )
}

export default NotFound