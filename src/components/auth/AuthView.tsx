"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function AuthView() {
  const router = useRouter();
  const params = useSearchParams();

  const isLogin = params.get("for") == "login";

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [profileId, setProfileId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  async function register() {
    // Data validation
    if (!username || !profileId || !email || !password) return;

    if (profileId.length < 3) {
      setError("Profile ID must contain atleast 3 characters");

      return;
    }

    if (password.length < 8) {
      setError("Password must contain atleast 8 characters");

      return;
    }

    setDisabled(true);

    const res = await (
      await fetch("api/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          profileId,
          email,
          password,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
    ).json();

    if (res.failure || res.errors) {
      setError(res.failure || res.errors[0].message);

      setDisabled(false);
    } else {
      Cookies.set("refreshToken", `Bearer ${res.refreshToken}`, {
        expires: 7,
      });

      Cookies.set("accessToken", `Bearer ${res.accessToken}`, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      });

      router.push("/home");
    }
  }

  async function login() {
    // Data validation
    if (!email || !password) return;

    if (password.length < 8) {
      setError("Password must contain atleast 8 characters");

      return;
    }

    setDisabled(true);

    const res = await (
      await fetch("api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
    ).json();

    if (res.failure || res.errors) {
      setError(res.failure || res.errors[0].message);

      setDisabled(false);
    } else {
      Cookies.set("refreshToken", `Bearer ${res.refreshToken}`, {
        expires: 7,
      });

      Cookies.set("accessToken", `Bearer ${res.accessToken}`, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      });

      router.push("/home");
    }
  }

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      router.replace("/home");
    }
  });

  return (
    <Tabs
      defaultValue={`${!isLogin ? "register" : "login"}`}
      className="xs:w-[300px] fixed top-0 right-0 left-0 bottom-0 m-auto w-[400px] h-max"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          disabled={disabled}
          onClick={() => {
            router.replace("/auth");
            setError("");
          }}
          value="register"
        >
          Register
        </TabsTrigger>
        <TabsTrigger
          disabled={disabled}
          onClick={() => {
            router.replace("/auth?for=login");
            setError("");
          }}
          value="login"
        >
          Login
        </TabsTrigger>
      </TabsList>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register on Fronvo</CardTitle>
            <CardDescription>
              Your private social media is one step away
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              {error && (
                <h1 className="text-destructive font-semibold mb-4">{error}</h1>
              )}

              <Label htmlFor="username">Username</Label>
              <Input
                // @ts-ignore
                onInput={(e) => setUsername(e.target.value as string)}
                id="username"
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="profileId">Profile ID</Label>
              <Input
                // @ts-ignore
                onInput={(e) => setProfileId(e.target.value as string)}
                id="profileId"
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                // @ts-ignore
                onInput={(e) => setEmail(e.target.value as string)}
                id="email"
                type="email"
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                // @ts-ignore
                onInput={(e) => setPassword(e.target.value as string)}
                type="password"
                id="password"
                disabled={disabled}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={disabled} onClick={register}>
              Join Fronvo
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login on Fronvo</CardTitle>
            <CardDescription>Regain your online privacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              {error && (
                <h1 className="text-destructive font-semibold mb-4">{error}</h1>
              )}

              <Label htmlFor="email">Email</Label>
              <Input
                // @ts-ignore
                onInput={(e) => setEmail(e.target.value as string)}
                type="email"
                id="email"
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                // @ts-ignore
                onInput={(e) => setPassword(e.target.value as string)}
                type="password"
                id="password"
                disabled={disabled}
              />

              <Button disabled={disabled} variant={"link"} className="m-0 p-0">
                Reset password
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={disabled} onClick={login}>
              Login to Fronvo
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
