import React from 'react'

const Skeleton = ({ className = '', rounded = 'rounded-xl' }) => {
  return (
    <div
      className={`
        bg-bg-surface relative overflow-hidden
        ${rounded}
        ${className}
      `}
    >
      <div className="absolute inset-0 shimmer" />
    </div>
  )
}

export const GameCardSkeleton = () => (
  <div className="bg-bg-card rounded-2xl overflow-hidden border border-cyan-500/10">
    <Skeleton className="h-28 w-full" rounded="rounded-none" />
    <div className="p-4 flex flex-col gap-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
      <div className="flex justify-between items-center mt-1">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  </div>
)

export const TransactionRowSkeleton = () => (
  <div className="flex items-center gap-4 p-4 border-b border-cyan-500/10">
    <Skeleton className="h-10 w-10 flex-shrink-0" rounded="rounded-xl" />
    <div className="flex-1 flex flex-col gap-2">
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-3 w-1/5" />
    </div>
    <Skeleton className="h-6 w-16 flex-shrink-0" rounded="rounded-lg" />
    <Skeleton className="h-4 w-20 flex-shrink-0" />
  </div>
)

export const TextSkeleton = ({ lines = 3 }) => (
  <div className="flex flex-col gap-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className="h-3"
        style={{ width: `${Math.random() * 40 + 60}%` }}
      />
    ))}
  </div>
)

export default Skeleton
