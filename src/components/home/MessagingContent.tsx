import MessagesList from "./MessagesList";
import PropMessagingView from "./PropMessagingView";
import ServersList from "./ServersList";

export default function MessagingContent() {
  return (
    <div className="flex flex-wrap items-center fixed left-0 right-0 top-[70px] bottom-0 w-screen m-auto">
      <ServersList />

      <MessagesList />

      <PropMessagingView />
    </div>
  );
}
