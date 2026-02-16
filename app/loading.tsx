export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
                    <div className="w-12 h-12 border-4 border-[#1e4d45] rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="text-[#1e4d45] font-bold animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
