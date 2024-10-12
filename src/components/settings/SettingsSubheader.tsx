import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SettingsSubheader({ children, className }: Props) {
  return (
    <h1
      className={`${className} mobile:text-[0.7rem] text-[0.8rem] mb-4 font-normal tracking-wide opacity-40`}
    >
      {children}
    </h1>
  );
}
