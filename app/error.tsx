'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-gray-100">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    ⚠️
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
                <p className="text-gray-600 mb-8">
                    We encountered an unexpected error. Please try again later.
                </p>
                <div className="space-y-3">
                    <button
                        onClick={() => reset()}
                        className="w-full bg-[#1e4d45] text-white py-3 rounded-xl font-bold hover:bg-[#153a33] transition-colors"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
