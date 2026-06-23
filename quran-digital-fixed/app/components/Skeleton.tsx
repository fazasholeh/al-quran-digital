export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-stone-200 rounded-lg ${className}`}
      aria-hidden="true"
    />
  );
}

export function PrayerCardSkeleton() {
  return (
    <div className="card space-y-4">
      <Skeleton className="h-4 w-32" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-stone-100 rounded-xl p-4 space-y-2">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SurahCardSkeleton() {
  return (
    <div className="border border-stone-200 rounded-xl p-4 space-y-2">
      <div className="flex justify-between items-start">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

export function AyahSkeleton() {
  return (
    <div className="space-y-3 py-6 border-b border-stone-100">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-3/4 ml-auto" />
      <Skeleton className="h-4 w-full mt-3" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
