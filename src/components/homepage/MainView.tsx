"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function MainView() {
  const [hasJWT, setHasJWT] = useState(false);

  useEffect(() => {
    if (Cookies.get("refreshToken")) {
      setHasJWT(true);
    }
  }, []);

  return (
    <div className="xs:h-[90vh] xs:overflow-hidden h-[100vh] w-full flex flex-col items-center justify-center text-center">
      <h1 className="xs:text-[1.7rem] font-extrabold text-5xl tracking-tighter pb-3">
        Private social media, reimagined.
      </h1>

      <h1 className="xs:text-sm xs:w-[90%] w-[500px] text-lg">
        Imagine a social media world where everything is customisable and
        nothing is tracked. Now you can live in it.
      </h1>

      <div className="flex items-center mt-7">
        <Link href={`${hasJWT ? "/home" : "/auth"}`}>
          <Button className="xs:text-sm mr-2 font-semibold text-md" size="lg">
            {hasJWT ? "Get back online" : "Try Fronvo online"}
          </Button>
        </Link>

        <Link href="https://github.com/Fronvo" target="_blank">
          <Button
            variant={"outline"}
            size="lg"
            className="xs:text-sm ml-2 font-semibold text-md"
          >
            <GitHubLogoIcon className="xs:text-sm mr-2 w-[20px] h-[20px]" />
            View on Github
          </Button>
        </Link>
      </div>
    </div>
  );
}
