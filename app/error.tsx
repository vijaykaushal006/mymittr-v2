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
        <div className="min-h-screen flex items-center justify-center bg-[#f4f9f7] px-4">
            <div className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-xl text-center border-2 border-gray-100">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                    ⚠️
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Something isn't right</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We encountered an unexpected issue. Please try refreshing the page or check back in a few moments.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => reset()}
                        className="w-full bg-[#1e4d45] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#153a33] transition-colors shadow-lg shadow-[#1e4d45]/20"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="block w-full bg-white text-gray-700 border-2 border-gray-200 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors"
                    >
                        Return to Home Page
                    </Link>
                </div>
            </div>
        </div>
    );
}
