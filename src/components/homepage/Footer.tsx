import Link from "next/link";
import { Separator } from "../ui/separator";

interface Props {
  fixed?: boolean;
}

export default function Footer({ fixed }: Props) {
  return (
    <div
      className={`${
        fixed ? "fixed bottom-0 right-0 left-0" : ""
      }bg-background m-auto w-full pr-0 pl-0 h-[64px] max-h-[64px] p-4 select-none`}
    >
      <Separator />

      <div className="flex items-center justify-center pt-2 pb-2">
        <h1 className="mobile:text-sm font-medium text-sm">
          © Stamatis Tsagkliotis 2024 | Much ♥ to{" "}
          <Link href="https://ui.shadcn.com" target="_blank">
            shadcn
          </Link>
        </h1>
      </div>
    </div>
  );
}
