"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function WaitingFor() {
  const [hasJWT, setHasJWT] = useState(false);

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      setHasJWT(true);
    }
  }, []);

  return (
    <div
      id="try"
      className="h-[70vh] flex flex-col items-center justify-center mb-20 text-center"
    >
      <h1 className="xs:text-2xl font-black text-4xl tracking-tight">
        Now what?
      </h1>

      <h1 className="xs:text-sm xs:w-[75%] w-[500px] text-lg">
        Nothing to lose if you try it.
      </h1>

      <div className="mobile:mt-6 flex items-center justify-center mt-10">
        {!hasJWT && (
          <>
            <Link href="/auth?for=login">
              <Button
                variant={"outline"}
                size="lg"
                className="xs:text-sm font-semibold text-md"
              >
                Login
              </Button>
            </Link>

            <Separator orientation="vertical" className="mr-6 ml-6" />
          </>
        )}

        <Link href={`${hasJWT ? "/home" : "/auth"}`}>
          <Button size="lg" className="xs:text-sm font-semibold text-md">
            {hasJWT ? "Go to storage" : "Register"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
