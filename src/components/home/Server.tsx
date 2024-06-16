import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function Server() {
  return (
    <div>
      <TooltipProvider>
        <Tooltip delayDuration={0} disableHoverableContent>
          <TooltipTrigger asChild>
            <img
              src={"/fronvo.svg"}
              draggable={false}
              className="rounded-full w-[48px] h-[48px] mt-3 mb-3 m-auto cursor-pointer"
            />
          </TooltipTrigger>

          <TooltipContent
            side="right"
            sideOffset={16}
            className="bg-lighter text-foreground font-bold text-sm flex items-center"
          >
            <div className="flex flex-col">
              <h1 className="w-max">Test server</h1>

              <div>
                <h1 className="font-medium text-[0.8rem]">
                  1 member • 1 online
                </h1>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
