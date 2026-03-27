function MessagesLoadingSkeleton() {
    return (
        <div className="max-w-2xl mx-auto space-y-4 px-8 py-8">
        {[...Array(6)].map((_, index) => (
            <div
            key={index}
            className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
            >
            <div className="max-w-md space-y-2 animate-pulse">

                {/* Fake message lines */}
                <div className="h-3 w-32 bg-slate-700 rounded" />
                <div className="h-3 w-48 bg-slate-700 rounded" />

                {/* Fake timestamp */}
                <div className="h-2 w-12 bg-slate-600 rounded mt-1" />

            </div>
            </div>
        ))}
        </div>
    );
}

export default MessagesLoadingSkeleton;