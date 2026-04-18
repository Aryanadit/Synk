export function formatLastSeen(lastSeen) {
  if (!lastSeen) return "last seen recently";

  const date = lastSeen instanceof Date ? lastSeen : new Date(lastSeen);
  if (Number.isNaN(date.getTime())) return "last seen recently";

  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.max(0, Math.floor(diffMs / 1000));

  if (diffSec < 10) return "last seen just now";
  if (diffSec < 60) return `last seen ${diffSec}s ago`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin === 1) return "last seen 1 min ago";
  if (diffMin < 60) return `last seen ${diffMin} min ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr === 1) return "last seen 1 hour ago";
  if (diffHr < 24) return `last seen ${diffHr} hours ago`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 1) return "last seen yesterday";
  if (diffDay < 7) return `last seen ${diffDay} days ago`;

  return `last seen ${date.toLocaleDateString()}`;
}

