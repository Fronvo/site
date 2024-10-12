import { useReadable } from "react-use-svelte-store";
import { ScrollArea } from "../ui/scroll-area";
import PropMessagesDM from "./PropMessagesDM";
import { serverData, userData } from "@/lib/stores";
import MessagesDM from "./MessagesDM";
import ServerView from "./ServerView";

export default function MessagesList() {
  const $userData = useReadable(userData);
  const $serverData = useReadable(serverData);

  return (
    <ScrollArea className="mobile:w-[70vw] flex flex-col items-center border-r w-[250px] h-full overflow-x-hidden overflow-y-auto">
      {$userData.dms?.length > 0 &&
        !$serverData &&
        $userData.dms.map((dm) => {
          return <MessagesDM dm={dm} />;
        })}

      {/* TODO: Update when dms ready */}
      {$serverData ? (
        <ServerView />
      ) : (
        <>
          <PropMessagesDM />
          <PropMessagesDM />
          <PropMessagesDM />
          <PropMessagesDM />
          <PropMessagesDM />
          <PropMessagesDM />
          <PropMessagesDM />
          <PropMessagesDM />
          <PropMessagesDM />
        </>
      )}
    </ScrollArea>
  );
}
