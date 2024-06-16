import { Skeleton } from "../ui/skeleton";

export default function PropMessagesDM() {
  return (
    <div className="rounded-none flex items-center w-full h-[64px] pl-4">
      <Skeleton className="rounded-xl w-[32px] h-[32px] mr-2" />

      <Skeleton className="w-[150px] h-[20px] font-bold text-[0.975rem]" />
    </div>
  );
}
