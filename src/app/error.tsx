'use client'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Error = ({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) => {
    const pathName = usePathname()
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className='text-center max-w-4xl'>
                <div className="mb-4">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
                    <p className="text-gray-600 mb-4">An error occurred while loading this page.</p>
                </div>

                <details className="">
                    <summary className="cursor-pointer text-base text-gray-500 hover:text-gray-700">
                        Error details
                    </summary>
                    <pre className="mt-2 text-sm bg-gray-100 p-3 rounded overflow-auto">
                        {error.message}
                    </pre>
                </details>

                <div className="flex items-center justify-center gap-3 mt-8">
                    <Button
                        onClick={reset}

                        size={'sm'}
                        className='lg:text-base text-base rounded-sm'
                    >
                        Try again
                    </Button>
                    {
                        pathName !== '/' &&
                        <Button
                            variant="outline"
                            size={'sm'}
                            className='lg:text-base text-base rounded-sm'
                            asChild
                        >
                            <Link href={"/"}>Go to homepage</Link>
                        </Button>
                    }
                </div>

            </div>
        </div>
    )
}

export default Error