import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-slate-200/80', className)} {...props} />
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-40 w-full rounded-3xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-2xl border border-border p-4 sm:flex-row sm:items-center"
            >
              <Skeleton className="h-20 w-full rounded-xl sm:h-16 sm:w-28" />
              <div className="min-w-0 flex-1 space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    </div>
  )
}

export function CourseDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
        <div className="grid lg:grid-cols-2">
          <Skeleton className="min-h-[280px] rounded-none" />
          <div className="space-y-4 p-6 sm:p-8">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-9 w-4/5" />
            <Skeleton className="h-16 w-full" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
            </div>
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-border bg-white p-6 sm:p-8">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="mt-4 h-20 w-full" />
      </div>
      <div className="rounded-3xl border border-border bg-white p-6 sm:p-8">
        <Skeleton className="h-8 w-52" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-border bg-white p-6 sm:p-8">
        <Skeleton className="h-8 w-48" />
        <div className="mt-5 overflow-hidden rounded-2xl border border-border">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full rounded-none border-b border-border last:border-b-0" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export { Skeleton }
