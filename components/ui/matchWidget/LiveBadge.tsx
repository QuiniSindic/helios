export default function LiveBadge() {
  return (
    <div className="absolute top-2 right-2 flex items-center mr-4">
      <span className="mr-1 text-sm font-semibold">Live</span>
      <div className="bg-red-600 h-4 w-4 rounded-full animate-pulse"></div>
    </div>
  );
}
