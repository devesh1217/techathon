"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Error() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center pb-32'>
            <Image src={'/images/error.png'} width={300} height={300} alt='Error'></Image>
            <h1 className='sm:text-5xl text-3xl mb-5'>Some thing went wrong!</h1>
            <div className='sm:text-3xl text-xl'>Go to <Link href={'/'} className='text-amber-300 italic hover:underline hover:cursor-pointer'>Home Page</Link></div>
        </div>
    )
}

export default Error