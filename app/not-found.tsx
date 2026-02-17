import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f9f7] px-4">
            <div className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-xl text-center border-2 border-gray-100">
                <div className="w-24 h-24 bg-[#e6f0ed] text-[#1e4d45] rounded-full flex items-center justify-center mx-auto mb-6 text-5xl font-bold shadow-inner">
                    ?
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    We couldn't find that page
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Don't worry, you haven't done anything wrong. The page you're looking for might have moved or doesn't exist.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full bg-[#1e4d45] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#153a33] transition-colors shadow-lg shadow-[#1e4d45]/20"
                    >
                        Return to Home Page
                    </Link>
                    <Link
                        href="/services"
                        className="block w-full bg-white text-[#1e4d45] border-2 border-[#1e4d45] py-4 rounded-xl font-bold text-lg hover:bg-[#f4f9f7] transition-colors"
                    >
                        Browse Services
                    </Link>
                </div>
            </div>
        </div>
    );
}
