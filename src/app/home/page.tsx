"use client";

import { useWritable } from "react-use-svelte-store";
import {
  authenticated,
  disconnected,
  appVersion,
  messaging,
  userData,
} from "@/lib/stores";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TopNav from "@/components/global/TopNav";
import Loading from "@/components/global/Loading";
import Head from "next/head";
import Dialogs from "@/components/home/Dialogs";
import HomeContent from "@/components/home/HomeContent";
import MessagingContent from "@/components/home/MessagingContent";
import { io } from "socket.io-client";
import binaryParser from "socket.io-msgpack-parser";
import { UserData } from "@/lib/types";
import { toast } from "sonner";

export default function RouteHome() {
  let effectRan = false;
  const router = useRouter();

  const [$authenticated, setAuthenticated] = useWritable(authenticated);
  const [$disconnected, setDisconnected] = useWritable(disconnected);
  const [$messaging, setMessaging] = useWritable(messaging);
  const [_, setUserData] = useWritable(userData);
  const [__, setAppVersion] = useWritable(appVersion);

  async function regenerateAccessToken() {
    const res = await fetch("api/token", {
      headers: {
        Authorization: Cookies.get("refreshToken") as string,
      },
    });

    if (res.status != 200) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      router.replace("/auth");

      return;
    }

    Cookies.set(
      "accessToken",
      `Bearer ${(await res.json()).accessToken as string}`,
      {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      }
    );
  }

  async function fetchUserData() {
    // Get self data
    const userData = (
      await (
        await fetch("api/me", {
          headers: {
            Authorization: Cookies.get("accessToken") as string,
          },
        })
      ).json()
    ).profileData as UserData;

    // Invalid token, re-auth
    if (!userData) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      router.replace("/auth");

      return;
    }

    const extraUserData: Partial<UserData> = {
      default_tab:
        (Number(localStorage.getItem("fronvo_defaultTab")) as 0 | 1) || 0,
    };

    return { ...userData, ...extraUserData };
  }

  async function fetchExtraData() {
    const fronvoVersion = (
      await (
        await fetch("api/version", {
          headers: {
            Authorization: Cookies.get("accessToken") as string,
          },
        })
      ).json()
    ).version as string;

    return { version: fronvoVersion };
  }

  async function initProfilesSocket(data: UserData) {
    let hasDisconnected = false;

    const profilesSocket = io(`${process.env.SOCKET_URL}/profiles`, {
      transports: ["websocket", "polling"],
      parser: binaryParser,
      query: {
        authorization: Cookies.get("accessToken") as string,
      },
    });

    profilesSocket.on("statusUpdated", ({ status, userId }) => {
      if (data.id === userId) {
        setUserData({
          ...data,
          status,
        });
      }
    });

    profilesSocket.on("noteUpdated", ({ note, userId }) => {
      if (data.id === userId) {
        setUserData({
          ...data,
          note,
        });
      }
    });

    profilesSocket.on("postShared", ({ post, userId }) => {
      if (data.id !== userId) {
        toast.success(`New post shared by ${userId}`);
      }
    });

    profilesSocket.on("disconnect", () => {
      setDisconnected(true);
      hasDisconnected = true;

      toast("Disconnected from Fronvo, retrying...");
    });

    profilesSocket.on("connect", () => {
      if (!hasDisconnected) return;

      setDisconnected(false);
      hasDisconnected = false;

      toast("Reconnected to Fronvo.");
    });
  }

  async function initDMSSocket(data: UserData) {
    let hasDisconnected = false;

    const dmsSocket = io(`${process.env.SOCKET_URL}/dms`, {
      transports: ["websocket", "polling"],
      parser: binaryParser,
      query: {
        authorization: Cookies.get("accessToken") as string,
      },
    });

    dmsSocket.on("disconnect", () => {
      setDisconnected(true);
      hasDisconnected = true;

      toast("Disconnected from Fronvo, retrying...");
    });

    dmsSocket.on("connect", () => {
      if (!hasDisconnected) return;

      setDisconnected(false);
      hasDisconnected = false;

      toast("Reconnected to Fronvo.");
    });
  }

  async function initServersSocket(data: UserData) {
    let hasDisconnected = false;

    const serversSocket = io(`${process.env.SOCKET_URL}/servers`, {
      transports: ["websocket", "polling"],
      parser: binaryParser,
      query: {
        authorization: Cookies.get("accessToken") as string,
      },
    });

    serversSocket.on("disconnect", () => {
      setDisconnected(true);
      hasDisconnected = true;

      toast("Disconnected from Fronvo, retrying...");
    });

    serversSocket.on("connect", () => {
      if (!hasDisconnected) return;

      setDisconnected(false);
      hasDisconnected = false;

      toast("Reconnected to Fronvo.");
    });
  }

  async function initSockets(data: UserData) {
    initProfilesSocket(data);
    initDMSSocket(data);
    initServersSocket(data);
  }

  useEffect(() => {
    if (effectRan) return;

    effectRan = true;

    // No token, auth
    if (!Cookies.get("refreshToken")) {
      router.replace("/auth");
      return;
    }

    // Refresh token automatically
    const tokenInterval = setInterval(async () => {
      if (!Cookies.get("refreshToken")) {
        clearInterval(tokenInterval);
        return;
      }

      await regenerateAccessToken();
    }, 60 * 60 * 1000);

    regenerateAccessToken().then(() => {
      fetchUserData().then((data) => {
        if (!data) return;

        setUserData({ ...(data as UserData) });

        fetchExtraData().then((version) => {
          setAppVersion(version.version);

          initSockets(data);

          setAuthenticated(true);

          const initialToken = Cookies.get("refreshToken") as string;

          setInterval(() => {
            if (initialToken !== Cookies.get("refreshToken")) {
              // Force re-login
              location.href = location.href;
            }
          }, 5000);

          setMessaging(data.default_tab === 1 || false);

          toast(`Welcome back to Fronvo, ${data.username}.`);
        });
      });
    });
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Head>
        <title>Fronvo</title>
      </Head>

      {$authenticated ? (
        <>
          <TopNav notFixed forceShowSheet />

          {!$messaging ? <HomeContent /> : <MessagingContent />}

          <Dialogs />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
