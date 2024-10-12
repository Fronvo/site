import { Skeleton } from "../ui/skeleton";

export default function PropChannel() {
  return (
    <div className="rounded-none flex items-center w-full m-auto h-[64px] pl-6">
      <Skeleton className="rounded-xl w-[24px] h-[24px] mr-2" />

      <Skeleton className="w-[80%] max-w-[150px] h-[20px] font-bold text-[0.975rem]" />
    </div>
  );
}
