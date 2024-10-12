import { useWritable } from "react-use-svelte-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Server as ServerType } from "@/lib/types";
import { serverData } from "@/lib/stores";

interface Props {
  server: ServerType;
}

export default function HomeButton() {
  const [$serverData, setServerData] = useWritable(serverData);

  return (
  <div className="select-none">
      <TooltipProvider>
        <Tooltip delayDuration={0} disableHoverableContent>
          <TooltipTrigger asChild>
            <img
              src={"/fronvo.svg"}
              draggable={false}
              className={`${
                !$serverData && "bg-accent"
              } hover:bg-accent transition-[100ms] w-[50px] h-[50px] rounded-full p-1.5 mt-3 mb-3 m-auto cursor-pointer border border-1 object-cover`}
              // @ts-ignore
              onClick={() => setServerData(undefined)}
            />
          </TooltipTrigger>

          <TooltipContent
            side="right"
            sideOffset={18}
            className="font-bold text-sm flex items-center"
          >
            <div className="flex flex-col">
              <h1 className="w-max">Home</h1>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
