function MessagesLoadingSkeleton() {
    return (
        <div className="w-full space-y-3 py-2">
        {[...Array(6)].map((_, index) => (
            <div
            key={index}
            className={`flex w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
            >
            <div className="max-w-[min(36rem,88%)] space-y-2 animate-pulse">

                {/* Fake message lines */}
                <div className="h-3 w-32 rounded bg-base-300" />
                <div className="h-3 w-48 rounded bg-base-300" />

                {/* Fake timestamp */}
                <div className="mt-1 h-2 w-12 rounded bg-base-300/70" />

            </div>
            </div>
        ))}
        </div>
    );
}

export default MessagesLoadingSkeleton;