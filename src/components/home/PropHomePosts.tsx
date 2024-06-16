import { Skeleton } from "../ui/skeleton";

export default function PropHomePosts() {
  return (
    <div className="overflow-hidden">
      <div className="flex items-center mb-2">
        <Skeleton className="rounded-full w-[48px] h-[48px]" />
        <Skeleton className="w-[150px] h-[20px] ml-2" />
      </div>
      <Skeleton className="w-[500px] h-[400px]" />
      <div className="flex mt-2">
        <Skeleton className="w-[25%] h-[25px]" />
        <Skeleton className="w-[73%] ml-[2%] h-[25px]" />
      </div>

      <div className="flex items-center mt-16 mb-2">
        <Skeleton className="rounded-full w-[48px] h-[48px]" />
        <Skeleton className="w-[150px] h-[20px] ml-2" />
      </div>
      <Skeleton className="w-[500px] h-[400px]" />
      <div className="flex mt-2">
        <Skeleton className="w-[25%] h-[25px]" />
        <Skeleton className="w-[73%] ml-[2%] h-[25px]" />
      </div>
    </div>
  );
}
