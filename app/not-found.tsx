import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold border-4 border-white shadow-sm">
                    ?
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="block w-full bg-[#1e4d45] text-white py-3 rounded-xl font-bold hover:bg-[#153a33] transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
