import { DM } from "@/lib/types";
import { Button } from "../ui/button";

interface Props {
  dm: DM;
}

export default function MessagesDM({ dm }: Props) {
  return (
    <Button
      variant={"ghost"}
      className="rounded-none flex items-center justify-start w-full h-[64px] cursor-pointer select-none"
    >
      {/* TODO: Imagekit */}
      <img
        src={dm.other_user.avatar ? dm.other_user.avatar : "/fronvo.svg"}
        draggable={false}
        className="w-[32px] h-[32px] mr-2"
      />

      <h1 className="font-semibold text-[0.975rem]">
        {dm.other_user.username}
      </h1>
    </Button>
  );
}
