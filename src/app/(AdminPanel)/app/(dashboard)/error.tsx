'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className="text-xl font-bold mb-4">{error.message}</div>
            <button
                onClick={() => reset()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Retry
            </button>
        </div>
    )
}