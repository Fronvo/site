import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Props {
  username: string;
  avatar: string;
  active?: boolean;
}

export default function AccountSwitchView({ username, avatar, active }: Props) {
  return (
    <div className="flex items-center border-2 w-full rounded-lg p-2 pr-4 pl-4 h-14">
      {avatar ? (
        <img src={avatar} />
      ) : (
        <PersonIcon
          width={20}
          height={20}
          className="xs:mr-0 min-w-[20px] min-h-[20px] mr-2"
        />
      )}

      <h1 className="max-w-[200px] overflow-hidden text-ellipsis font-medium">
        {username}
      </h1>

      <span className="flex-1" />

      {!active ? (
        <>
          <Button>Login</Button>
        </>
      ) : (
        <>
          <Badge variant={"secondary"}>Active</Badge>
        </>
      )}
    </div>
  );
}
