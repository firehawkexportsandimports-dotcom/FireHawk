import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";

const cardGrid = (count: number, className = "") =>
  Array.from({ length: count }).map((_, index) => (
    <div key={index} className={`rounded-2xl border border-border/40 bg-white p-5 shadow-soft ${className}`}>
      <Skeleton className="mb-4 h-40 w-full rounded-xl" />
      <Skeleton className="mb-3 h-5 w-3/4" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ));

export function RouteSkeleton() {
  return (
    <PublicLayout>
      <section className="bg-charcoal py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto mb-6 h-10 w-40 rounded-full bg-white/10" />
            <Skeleton className="mx-auto mb-5 h-14 w-full max-w-xl bg-white/10" />
            <Skeleton className="mx-auto h-5 w-full max-w-lg bg-white/10" />
          </div>
        </div>
      </section>
      <section className="bg-gradient-warm py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cardGrid(4)}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export function HomePageSkeleton() {
  return (
    <PublicLayout>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/60" />
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <Skeleton className="mb-6 h-10 w-48 rounded-full bg-white/10" />
            <Skeleton className="mb-4 h-16 w-full max-w-2xl bg-white/10 md:h-20" />
            <Skeleton className="mb-8 h-16 w-full max-w-xl bg-white/10" />
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-14 w-44 rounded-xl bg-white/10" />
              <Skeleton className="h-14 w-32 rounded-xl bg-white/10" />
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-8 border-t border-white/10 pt-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="text-center">
                  <Skeleton className="mx-auto mb-2 h-9 w-16 bg-white/10" />
                  <Skeleton className="mx-auto h-4 w-20 bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-warm py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Skeleton className="mx-auto mb-3 h-4 w-28" />
            <Skeleton className="mx-auto mb-4 h-12 w-80 max-w-full" />
            <Skeleton className="mx-auto h-5 w-full" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cardGrid(4)}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Skeleton className="mx-auto mb-3 h-9 w-40 rounded-full bg-white/10" />
            <Skeleton className="mx-auto mb-4 h-12 w-96 max-w-full bg-white/10" />
            <Skeleton className="mx-auto h-5 w-full bg-white/10" />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <Skeleton className="mb-4 h-8 w-32 bg-white/10" />
                <Skeleton className="mb-3 h-9 w-3/4 bg-white/10" />
                <Skeleton className="mb-6 h-5 w-full bg-white/10" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20 rounded-full bg-white/10" />
                  <Skeleton className="h-8 w-24 rounded-full bg-white/10" />
                  <Skeleton className="h-8 w-16 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-warm py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Skeleton className="mx-auto mb-3 h-4 w-28" />
            <Skeleton className="mx-auto mb-4 h-12 w-80 max-w-full" />
            <Skeleton className="mx-auto h-5 w-full" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cardGrid(4)}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export function PublicHeroSkeleton() {
  return (
    <section className="bg-charcoal py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <Skeleton className="mx-auto mb-6 h-10 w-40 rounded-full bg-white/10" />
          <Skeleton className="mx-auto mb-5 h-14 w-full max-w-2xl bg-white/10" />
          <Skeleton className="mx-auto h-5 w-full max-w-xl bg-white/10" />
        </div>
      </div>
    </section>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cardGrid(count)}
    </div>
  );
}

export function ProductsPageSkeleton() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-charcoal py-20">
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-radial from-ember/20 via-saffron/10 to-transparent blur-3xl" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto mb-6 h-10 w-40 rounded-full bg-white/10" />
            <Skeleton className="mx-auto mb-6 h-16 w-full max-w-2xl bg-white/10" />
            <Skeleton className="mx-auto mb-10 h-6 w-full max-w-xl bg-white/10" />
            <Skeleton className="mx-auto h-14 w-full max-w-xl rounded-2xl bg-white/15" />
          </div>
        </div>
      </section>

      <section className="bg-gradient-warm py-16">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-9 w-28 rounded-md" />
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-24 rounded-md" />
            ))}
          </div>
          <Skeleton className="mb-8 h-4 w-32" />
          <ProductGridSkeleton count={8} />
        </div>
      </section>
    </PublicLayout>
  );
}

export function ProductDetailSkeleton() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gradient-warm">
        <div className="container py-10">
          <Skeleton className="mb-8 h-5 w-36" />
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-3xl" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 w-20 rounded-xl" />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4 flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
              <Skeleton className="mb-4 h-11 w-3/4" />
              <Skeleton className="mb-6 h-5 w-44" />
              <Skeleton className="mb-3 h-5 w-full" />
              <Skeleton className="mb-8 h-5 w-5/6" />
              <div className="mb-8 flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-24 rounded-xl" />
                ))}
              </div>
              <div className="rounded-3xl bg-white p-8 shadow-soft">
                <Skeleton className="mb-6 h-8 w-48" />
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-28 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export function AboutPageSkeleton() {
  return (
    <PublicLayout>
      <PublicHeroSkeleton />
      <section className="bg-gradient-to-r from-ember via-burnt-orange to-saffron py-8">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="text-center">
              <Skeleton className="mx-auto mb-2 h-9 w-20 bg-white/25" />
              <Skeleton className="mx-auto h-4 w-24 bg-white/25" />
            </div>
          ))}
        </div>
      </section>
      {Array.from({ length: 4 }).map((_, index) => (
        <section key={index} className={index % 2 ? "bg-charcoal py-24" : "bg-gradient-warm py-24"}>
          <div className="container grid items-center gap-16 lg:grid-cols-2">
            <div className={index % 2 ? "lg:order-2" : ""}>
              <Skeleton className={`mb-4 h-5 w-32 ${index % 2 ? "bg-white/10" : ""}`} />
              <Skeleton className={`mb-6 h-12 w-3/4 ${index % 2 ? "bg-white/10" : ""}`} />
              <Skeleton className={`mb-3 h-5 w-full ${index % 2 ? "bg-white/10" : ""}`} />
              <Skeleton className={`h-5 w-5/6 ${index % 2 ? "bg-white/10" : ""}`} />
            </div>
            <Skeleton className={`h-80 w-full rounded-3xl ${index % 2 ? "bg-white/10" : ""}`} />
          </div>
        </section>
      ))}
    </PublicLayout>
  );
}

export function ContactPageSkeleton() {
  return (
    <PublicLayout>
      <PublicHeroSkeleton />
      <section className="bg-gradient-warm py-20">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-full" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-4">
                <Skeleton className="h-14 w-14 rounded-2xl" />
                <div className="flex-1">
                  <Skeleton className="mb-2 h-4 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
            ))}
            <Skeleton className="aspect-video w-full rounded-3xl" />
          </div>
          <div className="rounded-3xl bg-white p-10 shadow-medium">
            <Skeleton className="mb-8 h-9 w-56" />
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Skeleton className="h-12 rounded-xl" />
                <Skeleton className="h-12 rounded-xl" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Skeleton className="h-12 rounded-xl" />
                <Skeleton className="h-12 rounded-xl" />
              </div>
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-14 rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export function AdminTableRowsSkeleton({
  rows = 5,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b">
          {Array.from({ length: columns }).map((__, columnIndex) => (
            <td key={columnIndex} className="p-4">
              <Skeleton className={columnIndex === 0 ? "h-12 w-full" : "h-5 w-3/4"} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function AdminPageSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <Skeleton className="mb-2 h-9 w-72" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: cards }).map((_, index) => (
            <div key={index} className="rounded-2xl border bg-white p-6 shadow-soft">
              <Skeleton className="mb-4 h-10 w-10 rounded-lg" />
              <Skeleton className="mb-3 h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
