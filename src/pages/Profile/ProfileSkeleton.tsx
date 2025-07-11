import { Skeleton } from "@/ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Skeleton className="h-[170px] w-full" />
      <Skeleton className="h-[210px] w-full" />
    </div>
  );
};
