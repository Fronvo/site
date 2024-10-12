import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SettingsHeader({ children, className }: Props) {
  return (
    <h1 className={`${className} mobile:text-sm font-bold mt-1 text-lg w-full`}>
      {children}
    </h1>
  );
}
