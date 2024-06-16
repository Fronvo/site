import { Button } from "../ui/button";

export default function MessagesDM() {
  return (
    <Button
      variant={"ghost"}
      className="rounded-none flex items-center justify-start w-full h-[64px] cursor-pointer select-none"
    >
      {/* TODO: Imagekit */}
      <img
        src="/fronvo.svg"
        draggable={false}
        className="w-[32px] h-[32px] mr-1"
      />

      <h1 className="font-bold text-[0.975rem]">Stam</h1>
    </Button>
  );
}
