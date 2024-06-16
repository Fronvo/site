import { Skeleton } from "../ui/skeleton";

export default function PropMessagingView() {
  return (
    <div className="flex flex-col w-max m-auto translate-x-[-175px] pb-[100px]">
      <Skeleton className="w-[164px] h-[164px] m-auto mb-3" />

      <Skeleton className="w-[300px] h-[22px] m-auto mb-6" />

      <Skeleton className="w-[125px] h-[30px] m-auto" />
    </div>
  );
}
