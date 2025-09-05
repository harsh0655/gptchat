export default function LoadingSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 dark:bg-gray-600"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 dark:bg-gray-600"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 dark:bg-gray-600"></div>
    </div>
  )
}