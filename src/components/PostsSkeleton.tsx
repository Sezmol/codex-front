import { Skeleton } from "@/ui/skeleton";

export const PostsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 grow max-w-[880px]">
      <Skeleton className="h-[217px] w-full" />
      <Skeleton className="h-[217px] w-full" />
      <Skeleton className="h-[217px] w-full" />
    </div>
  );
};
