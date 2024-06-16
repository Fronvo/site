import { ScrollArea } from "../ui/scroll-area";
import PropMessagesDM from "./PropMessagesDM";

export default function MessagesList() {
  return (
    <ScrollArea className="xs:w-[70vw] flex flex-col items-center border-r w-[250px] h-full overflow-x-hidden overflow-y-auto">
      <PropMessagesDM />
      <PropMessagesDM />
      <PropMessagesDM />
      <PropMessagesDM />
      <PropMessagesDM />
      <PropMessagesDM />
      <PropMessagesDM />
      <PropMessagesDM />
      <PropMessagesDM />
    </ScrollArea>
  );
}
