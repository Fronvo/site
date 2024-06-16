import { Link1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import PropServer from "./PropServer";

export default function ServersList() {
  return (
    <div className="no-scrollbar text-center w-[80px] border-r pb-2 border-1 h-full overflow-x-hidden overflow-y-auto">
      <PropServer />
      <PropServer />
      <PropServer />
      <PropServer />
      <PropServer />
      <PropServer />

      <Separator className="w-[75%] m-auto mb-4" />

      <TooltipProvider>
        <Tooltip delayDuration={0} disableHoverableContent>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              size="icon"
              className="w-[50px] h-[50px] rounded-full p-3 mb-3"
            >
              <PlusIcon width={48} height={48} />
            </Button>
          </TooltipTrigger>

          <TooltipContent
            side="right"
            sideOffset={16}
            className="bg-lighter text-foreground font-semibold text-sm flex items-center select-none"
          >
            <div className="flex flex-col items-center">Create server</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip delayDuration={0} disableHoverableContent>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              size="icon"
              className="w-[50px] h-[50px] rounded-full p-3"
            >
              <Link1Icon width={48} height={48} />
            </Button>
          </TooltipTrigger>

          <TooltipContent
            side="right"
            sideOffset={16}
            className="bg-lighter text-foreground font-semibold text-sm flex items-center select-none"
          >
            <div className="flex flex-col items-center">Join server</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
