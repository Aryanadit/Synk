export default function UsersLoadingSkeleton() {
  return (
    <div className="space-y-3 px-3 py-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex items-center gap-3 py-2 animate-pulse"
        >
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-[var(--bg-hover)]/70" />

          {/* Text */}
          <div className="flex-1 space-y-2">
            <div className="h-3 rounded bg-[var(--bg-hover)] w-2/3" />
            <div className="h-2.5 rounded bg-[var(--bg-hover)]/60 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}