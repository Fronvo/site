"use client";

import {
  appVersion,
  banningMembers,
  changingPassword,
  creatingChannel,
  creatingServer,
  deletingAccount,
  deletingChannel,
  deletingChannelData,
  deletingServer,
  editingChannel,
  editingChannelData,
  editingServer,
  joiningServer,
  leavingServer,
  loggingOut,
  managingMembers,
  requestingData,
  serverData,
  settingsOpen,
  sharingPost,
  switchingAccounts,
  updatingProfileNote,
  userData,
} from "@/lib/stores";
import { useReadable, useWritable } from "react-use-svelte-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleBackslashIcon,
  Cross1Icon,
  Cross2Icon,
  DoubleArrowUpIcon,
  GearIcon,
  HamburgerMenuIcon,
  ImageIcon,
  Pencil1Icon,
  PersonIcon,

} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  BannedMember,
  DMOption,
  FilterOption,
  Member,
  Server,
  TabOption,
  ThemeOption,
  UserData,
} from "@/lib/types";
import { useTheme } from "next-themes";
import SettingsChoice from "../settings/SettingsChoice";
import SettingsHeader from "../settings/SettingsHeader";
import SettingsSubheader from "../settings/SettingsSubheader";
import SettingsSeparator from "../settings/SettingsSeparator";
import { DialogClose } from "@radix-ui/react-dialog";
import AccountSwitchView from "./AccountSwitchView";
import { toast } from "sonner";
import ImageKit from "imagekit-javascript";
import { v4 } from "uuid";
import { Textarea } from "../ui/textarea";
import { DataTable } from "../global/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableSortableHeader } from "../global/DataTableSortableHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { normaliseDate } from "@/lib/utils";

type SettingsHeader = "Account" | "Privacy" | "Appearance" | "About";

export default function Dialogs() {
  const { setTheme, theme } = useTheme();

  const [disabled, setDisabled] = useState(false);
  const [selectedHeader, setSelectedHeader] =
    useState<SettingsHeader>("Account");
  const [$userData, setUserData] = useWritable(userData);

  const $appVersion = useReadable(appVersion);

  const [themeOption, setThemeOption] = useState<ThemeOption>(
    theme === "light" ? 0 : 1
  );
  const [tabOption, setTabOption] = useState<TabOption>($userData.default_tab);

  const [dmOption, setDMOption] = useState<DMOption>($userData.dm_option);
  const [filterOption, setFilterOption] = useState<FilterOption>(
    $userData.filter_option
  );

  const [moreShown, setMoreShown] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [extraInput, setExtraInput] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postData, setPostData] = useState("");

  const [serverName, setServerName] = useState("");
  const [serverAvatarData, setServerAvatarData] = useState("");
  const [serverBannerData, setServerBannerData] = useState("");

  const [inviteLink, setInviteLink] = useState("");

  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");

  // Profile options
  const [$updatingProfileNote, setUpdatingProfileNote] =
    useWritable(updatingProfileNote);
  const [$sharingPost, setSharingPost] = useWritable(sharingPost);
  const [$settingsOpen, setSettingsOpen] = useWritable(settingsOpen);
  const [$switchingAccounts, setSwitchingAccounts] =
    useWritable(switchingAccounts);
  const [$loggingOut, setLoggingOut] = useWritable(loggingOut);
  const [$changingPassword, setChangingPassword] =
    useWritable(changingPassword);
  const [$deletingAccount, setDeletingAccount] = useWritable(deletingAccount);
  const [$requestingData, setRequestingData] = useWritable(requestingData);
  const [$creatingServer, setCreatingServer] = useWritable(creatingServer);
  const [$joiningServer, setJoiningServer] = useWritable(joiningServer);
  const [$editingServer, setEditingServer] = useWritable(editingServer);
  const [$deletingServer, setDeletingServer] = useWritable(deletingServer);
  const [$leavingServer, setLeavingServer] = useWritable(leavingServer);
  const [$serverData, setServerData] = useWritable(serverData);
  const [$creatingChannel, setCreatingChannel] = useWritable(creatingChannel);
  const [$editingChannel, setEditingChannel] = useWritable(editingChannel);
  const [$editingChannelData, setEditingChannelData] =
    useWritable(editingChannelData);
  const [$deletingChannel, setDeletingChannel] = useWritable(deletingChannel);
  const [$deletingChannelData, setDeletingChannelData] =
    useWritable(deletingChannelData);
  const [$managingMembers, setManagingMembers] = useWritable(managingMembers);
  const [$banningMembers, setBanningMembers] = useWritable(banningMembers);

  // Settings
  const settingHeaders: SettingsHeader[] = [
    "Account",
    "Appearance",
    "Privacy",
    "About",
  ];

  const memberColumns: ColumnDef<Member>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableSortableHeader column={column} title="ID" />
      ),
    },
    {
      accessorKey: "username",
      header: ({ column }) => (
        <DataTableSortableHeader column={column} title="Username" />
      ),
      cell({ getValue }) {
        return <h1 className="ml-5">{getValue() as string}</h1>;
      },
    },
    {
      accessorKey: "joined_at",
      header: ({ column }) => (
        <DataTableSortableHeader column={column} title="Joined at" />
      ),
      cell({ getValue }) {
        return normaliseDate(getValue() as string);
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const member = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <HamburgerMenuIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{member.id}</DropdownMenuLabel>
              <DropdownMenuItem>
                <PersonIcon className="mr-2" /> View profile
              </DropdownMenuItem>

              {member.id !== $serverData.owner_id && (
                <>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Cross2Icon className="mr-2" color={"red"} /> Kick
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <CircleBackslashIcon className="mr-2" color={"red"} /> Ban
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <DoubleArrowUpIcon className="mr-2" /> Transfer
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const bannedColumns: ColumnDef<BannedMember>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableSortableHeader column={column} title="ID" />
      ),
    },
    {
      accessorKey: "username",
      header: ({ column }) => (
        <DataTableSortableHeader column={column} title="Username" />
      ),
      cell({ getValue }) {
        return <h1 className="ml-5">{getValue() as string}</h1>;
      },
    },
    {
      accessorKey: "banned_at",
      header: ({ column }) => (
        <DataTableSortableHeader column={column} title="Banned at" />
      ),
      cell({ getValue }) {
        return normaliseDate(getValue() as string);
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const member = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <HamburgerMenuIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{member.id}</DropdownMenuLabel>
              <DropdownMenuItem>
                <PersonIcon className="mr-2" /> View profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <CircleBackslashIcon className="mr-2" color={"red"} /> Unban
                member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  async function updateProfileNote() {
    const note = extraInput;

    if (note.length == 0 || note === $userData.note) {
      setUpdatingProfileNote(false);

      return;
    }

    const tempNote = $userData.note;

    // Dialog button hidden till dialog close
    setTimeout(() => {
      setUserData({
        ...$userData,
        note,
      });
    }, 100);

    setUpdatingProfileNote(false);

    const res = await fetch("api/me/note", {
      method: "POST",

      body: JSON.stringify({
        note,
      }),

      headers: {
        Authorization: Cookies.get("accessToken") as string,
        "content-type": "application/json",
      },
    });

    // Revert if failed
    if (!res.ok) {
      setUserData({
        ...$userData,
        note: tempNote,
      });
    }
  }

  async function clearProfileNote() {
    const tempNote = $userData.note;

    setUserData({
      ...$userData,
      note: "",
    });

    setUpdatingProfileNote(false);

    const res = await fetch("api/me/note", {
      method: "POST",

      body: JSON.stringify({
        note: "",
      }),

      headers: {
        Authorization: Cookies.get("accessToken") as string,
        "content-type": "application/json",
      },
    });

    // Revert if failed
    if (!res.ok) {
      setUserData({
        ...$userData,
        note: tempNote,
      });
    }
  }

  async function sharePost() {
    setDisabled(true);

    toast.promise(sharePostPromise, {
      loading: "Sharing post...",
      success: () => "Post shared!",
    });

    async function sharePostPromise() {
      const authRes = (await (await fetch("uploadInit")).json()) as {
        publicKey: string;
        urlEndpoint: string;
      };

      const imagekit = new ImageKit({
        publicKey: authRes.publicKey,
        urlEndpoint: authRes.urlEndpoint,
      });

      const auth = (await (await fetch("upload")).json()) as {
        expire: number;
        token: string;
        signature: string;
      };

      const attachment = (
        await imagekit.upload({
          file: postData,
          fileName: v4(),
          token: auth.token,
          signature: auth.signature,
          expire: auth.expire,
          folder: `posts/${$userData.id.replaceAll(".", "_")}`,
          useUniqueFileName: false,
        })
      ).url;

      await fetch("api/me/post", {
        method: "POST",
        headers: {
          Authorization: Cookies.get("accessToken") as string,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          text: postTitle,
          attachment,
        }),
      });

      setDisabled(false);
      setSharingPost(false);

      setTimeout(() => {
        setPostTitle("");
        setPostData("");
      }, 100);
    }
  }

  async function updateTabOption(newOption: TabOption) {
    localStorage.setItem("fronvo_defaultTab", `${newOption}`);
  }

  async function updateDMOption(newOption: DMOption) {
    await fetch("api/me/dm", {
      method: "POST",

      body: JSON.stringify({
        dmOption: newOption,
      }),

      headers: {
        Authorization: Cookies.get("accessToken") as string,
        "content-type": "application/json",
      },
    });
  }

  async function updateFilterOption(newOption: FilterOption) {
    await fetch("api/me/filter", {
      method: "POST",

      body: JSON.stringify({
        filterOption: newOption,
      }),

      headers: {
        Authorization: Cookies.get("accessToken") as string,
        "content-type": "application/json",
      },
    });
  }

  async function requestData() {
    setDisabled(true);

    const res = await fetch("api/me/data", {
      method: "POST",
      headers: {
        Authorization: Cookies.get("accessToken") as string,
        "content-type": "application/json",
      },
    });

    if (res.status !== 200) {
      toast.error((await res.json()).errors[0].message);
    } else {
      setRequestingData(false);

      toast.success("Your data has been sent!");
    }

    setDisabled(false);
  }

  function logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    localStorage.removeItem("fronvo_defaultTab");

    location.href = "/auth";
  }

  async function switchAccount() {}

  async function changePassword() {
    setDisabled(true);

    const res = await fetch("api/me/password", {
      method: "POST",
      body: JSON.stringify({
        password: passwordInput,
        newPassword: extraInput,
      }),
      headers: {
        Authorization: Cookies.get("accessToken") as string,
        "content-type": "application/json",
      },
    });

    if (res.status !== 200) {
      toast.error((await res.json()).errors[0].message);
    } else {
      logout();
    }

    setDisabled(false);
  }

  async function deleteAccount() {
    setDisabled(true);

    const res = await fetch("api/login", {
      method: "DELETE",
      body: JSON.stringify({
        password: passwordInput,
      }),
      headers: {
        Authorization: Cookies.get("accessToken") as string,
        "content-type": "application/json",
      },
    });

    if (res.status !== 200) {
      toast.error((await res.json()).errors[0].message);
    } else {
      logout();
    }

    setDisabled(false);
  }

  async function createServer() {
    if (!serverName) {
      toast.error("Server name is required");
      return;
    }

    setDisabled(true);

    toast.promise(createServerPromise, {
      loading: "Creating server...",
      success: () => "Server created!",
    });

    async function createServerPromise() {
      const finalDict: { [key: string]: any } = { name: serverName };

      if (serverAvatarData) {
        const authRes = (await (await fetch("uploadInit")).json()) as {
          publicKey: string;
          urlEndpoint: string;
        };

        const imagekit = new ImageKit({
          publicKey: authRes.publicKey,
          urlEndpoint: authRes.urlEndpoint,
        });

        const auth = (await (await fetch("upload")).json()) as {
          expire: number;
          token: string;
          signature: string;
        };

        const avatar = (
          await imagekit.upload({
            file: serverAvatarData,
            fileName: v4(),
            token: auth.token,
            signature: auth.signature,
            expire: auth.expire,
            folder: `avatars/`,
            useUniqueFileName: false,
          })
        ).url;

        finalDict["avatar"] = avatar;
      }

      if (serverBannerData) {
        const authRes = (await (await fetch("uploadInit")).json()) as {
          publicKey: string;
          urlEndpoint: string;
        };

        const imagekit = new ImageKit({
          publicKey: authRes.publicKey,
          urlEndpoint: authRes.urlEndpoint,
        });

        const auth = (await (await fetch("upload")).json()) as {
          expire: number;
          token: string;
          signature: string;
        };

        const banner = (
          await imagekit.upload({
            file: serverBannerData,
            fileName: v4(),
            token: auth.token,
            signature: auth.signature,
            expire: auth.expire,
            folder: `banners/`,
            useUniqueFileName: false,
          })
        ).url;

        finalDict["banner"] = banner;
      }

      const res = await fetch("/api/servers/create", {
        method: "POST",
        body: JSON.stringify(finalDict),
        headers: {
          Authorization: Cookies.get("accessToken") as string,
          "content-type": "application/json",
        },
      });

      if (res.status === 200) {
        const userData = (
          await (
            await fetch("api/me", {
              headers: {
                Authorization: Cookies.get("accessToken") as string,
              },
            })
          ).json()
        ).profileData as UserData;

        setUserData(userData);
      }

      setDisabled(false);
      setCreatingServer(false);
      setServerName("");
      setServerAvatarData("");
      setServerBannerData("");
    }
  }

  async function joinServer() {
    if (!inviteLink || inviteLink?.length !== 8) {
      toast.error("Invite is required");
      return;
    }

    setDisabled(true);

    toast.promise(joinServerPromise, {
      loading: "Joining server...",
      success: () => "Server joined!",
      error: (e) => e,
    });

    async function joinServerPromise() {
      return new Promise(async (resolve, reject) => {
        const res = await fetch("/api/servers/join", {
          method: "POST",
          body: JSON.stringify({
            invite: inviteLink,
          }),
          headers: {
            Authorization: Cookies.get("accessToken") as string,
            "content-type": "application/json",
          },
        });

        if (res.status === 200) {
          resolve("");

          const userData = (
            await (
              await fetch("api/me", {
                headers: {
                  Authorization: Cookies.get("accessToken") as string,
                },
              })
            ).json()
          ).profileData as UserData;

          setUserData(userData);
          setJoiningServer(false);
          setInviteLink("");
        } else {
          reject((await res.json()).errors[0].message);
        }

        setDisabled(false);
      });
    }
  }

  async function editServer() {
    if (!serverName) {
      toast.error("Server name is required");
      return;
    }

    setDisabled(true);

    toast.promise(editServerPromise, {
      loading: "Updating server...",
      success: () => "Server updated!",
      error: (e) => `${e}`,
    });

    async function editServerPromise() {
      return new Promise(async (resolve, reject) => {
        const finalDict: { [key: string]: any } = {
          id: $serverData.id,
          name: serverName,
        };

        if (serverAvatarData) {
          if (serverAvatarData?.includes("imagekit")) {
            if (finalDict["resetAvatar"]) delete finalDict["resetAvatar"];
            finalDict["avatar"] = serverAvatarData;
          } else {
            const authRes = (await (await fetch("uploadInit")).json()) as {
              publicKey: string;
              urlEndpoint: string;
            };

            const imagekit = new ImageKit({
              publicKey: authRes.publicKey,
              urlEndpoint: authRes.urlEndpoint,
            });

            const auth = (await (await fetch("upload")).json()) as {
              expire: number;
              token: string;
              signature: string;
            };

            const avatar = (
              await imagekit.upload({
                file: serverAvatarData,
                fileName: v4(),
                token: auth.token,
                signature: auth.signature,
                expire: auth.expire,
                folder: `avatars/`,
                useUniqueFileName: false,
              })
            ).url;

            if (finalDict["resetAvatar"]) delete finalDict["resetAvatar"];
            finalDict["avatar"] = avatar;
          }
        } else {
          if (finalDict["avatar"]) delete finalDict["avatar"];
          finalDict["resetAvatar"] = true;
        }

        if (serverBannerData) {
          if (serverBannerData?.includes("imagekit")) {
            if (finalDict["resetBanner"]) delete finalDict["resetBanner"];
            finalDict["banner"] = serverBannerData;
          } else {
            const authRes = (await (await fetch("uploadInit")).json()) as {
              publicKey: string;
              urlEndpoint: string;
            };

            const imagekit = new ImageKit({
              publicKey: authRes.publicKey,
              urlEndpoint: authRes.urlEndpoint,
            });

            const auth = (await (await fetch("upload")).json()) as {
              expire: number;
              token: string;
              signature: string;
            };

            const banner = (
              await imagekit.upload({
                file: serverBannerData,
                fileName: v4(),
                token: auth.token,
                signature: auth.signature,
                expire: auth.expire,
                folder: `banners/`,
                useUniqueFileName: false,
              })
            ).url;

            if (finalDict["resetBanner"]) delete finalDict["resetBanner"];
            finalDict["banner"] = banner;
          }
        } else {
          if (finalDict["banner"]) delete finalDict["banner"];
          finalDict["resetBanner"] = true;
        }

        const res = await fetch("/api/servers/edit", {
          method: "POST",
          body: JSON.stringify(finalDict),
          headers: {
            Authorization: Cookies.get("accessToken") as string,
            "content-type": "application/json",
          },
        });

        if (res.status === 200) {
          const newServerData = (await res.json())
            .serverData as Partial<Server>;

          setServerData({
            ...$serverData,
            ...newServerData,
          });

          let newServers = $userData.servers;

          newServers = newServers.map((v) => {
            if (v.id === $serverData.id) {
              return { ...$serverData, ...newServerData };
            } else return v;
          });

          setUserData({
            ...$userData,
            servers: newServers,
          });

          resolve("");
        } else {
          reject((await res.json()).errors[0].message);
        }

        setDisabled(false);
        setEditingServer(false);
        setServerName("");
        setServerAvatarData("");
        setServerBannerData("");
      });
    }
  }

  async function deleteServer() {
    setDisabled(true);

    toast.promise(deleteServerPromise, {
      loading: "Deleting server...",
      success: () => "Server deleted!",
      error: (e) => `${e}`,
    });

    async function deleteServerPromise() {
      return new Promise(async (resolve, reject) => {
        const res = await fetch("api/servers/delete", {
          method: "DELETE",
          body: JSON.stringify({
            id: $serverData.id,
          }),
          headers: {
            Authorization: Cookies.get("accessToken") as string,
            "content-type": "application/json",
          },
        });

        if (res.status === 200) {
          const userData = (
            await (
              await fetch("api/me", {
                headers: {
                  Authorization: Cookies.get("accessToken") as string,
                },
              })
            ).json()
          ).profileData as UserData;

          setUserData(userData);

          // @ts-ignore
          setServerData(undefined);
          setDeletingServer(false);

          resolve("");
        } else {
          reject((await res.json()).errors[0].message);
        }

        setDisabled(false);
      });
    }
  }

  async function leaveServer() {
    setDisabled(true);

    toast.promise(leaveServerPromise, {
      loading: "Leaving server...",
      success: () => "Left server!",
      error: (e) => `${e}`,
    });

    async function leaveServerPromise() {
      return new Promise(async (resolve, reject) => {
        const res = await fetch("api/servers/leave", {
          method: "DELETE",
          body: JSON.stringify({
            id: $serverData.id,
          }),
          headers: {
            Authorization: Cookies.get("accessToken") as string,
            "content-type": "application/json",
          },
        });

        if (res.status === 200) {
          const userData = (
            await (
              await fetch("api/me", {
                headers: {
                  Authorization: Cookies.get("accessToken") as string,
                },
              })
            ).json()
          ).profileData as UserData;

          setUserData(userData);

          // @ts-ignore
          setServerData(undefined);
          setLeavingServer(false);

          resolve("");
        } else {
          reject((await res.json()).errors[0].message);
        }

        setDisabled(false);
      });
    }
  }

  async function createChannel() {
    if (!channelName) {
      toast.error("Channel name is required");
      return;
    }

    setDisabled(true);

    toast.promise(createChannelPromise, {
      loading: "Creating channel...",
      success: () => "Channel created!",
      error: (e) => e,
    });

    async function createChannelPromise() {
      return new Promise(async (resolve, reject) => {
        const res = await fetch("/api/channels/create", {
          method: "POST",
          body: JSON.stringify({
            id: $serverData.id,
            name: channelName,
            description: channelDescription,
          }),
          headers: {
            Authorization: Cookies.get("accessToken") as string,
            "content-type": "application/json",
          },
        });

        if (res.status === 200) {
          resolve("");

          const userData = (
            await (
              await fetch("api/me", {
                headers: {
                  Authorization: Cookies.get("accessToken") as string,
                },
              })
            ).json()
          ).profileData as UserData;

          setUserData(userData);
          setServerData(
            userData.servers.filter((v) => v.id === $serverData.id)[0]
          );
          setCreatingChannel(false);
          setChannelName("");
          setChannelDescription("");
        } else {
          reject((await res.json()).errors[0].message);
        }

        setDisabled(false);
      });
    }
  }

  async function editChannel() {
    setDisabled(true);

    toast.promise(editChannelPromise, {
      loading: "Updating channel...",
      success: () => "Channel updated!",
      error: (e) => e,
    });

    async function editChannelPromise() {
      return new Promise(async (resolve, reject) => {
        const res = await fetch("/api/channels/edit", {
          method: "POST",
          body: JSON.stringify({
            id: $serverData.id,
            channelId: $editingChannelData.id,
            name: channelName || $editingChannelData.name,
            description: channelDescription,
          }),
          headers: {
            Authorization: Cookies.get("accessToken") as string,
            "content-type": "application/json",
          },
        });

        if (res.status === 200) {
          resolve("");

          const userData = (
            await (
              await fetch("api/me", {
                headers: {
                  Authorization: Cookies.get("accessToken") as string,
                },
              })
            ).json()
          ).profileData as UserData;

          setUserData(userData);
          setServerData(
            userData.servers.filter((v) => v.id === $serverData.id)[0]
          );
          setEditingChannel(false);
          setChannelName("");
          setChannelDescription("");
        } else {
          reject((await res.json()).errors[0].message);
        }

        setDisabled(false);
      });
    }
  }

  async function deleteChannel() {
    setDisabled(true);

    toast.promise(deleteChannelPromise, {
      loading: "Deleting channel...",
      success: () => "Channel deleted!",
      error: (e) => e,
    });

    async function deleteChannelPromise() {
      return new Promise(async (resolve, reject) => {
        const res = await fetch("/api/channels/delete", {
          method: "DELETE",
          body: JSON.stringify({
            id: $serverData.id,
            channelId: $deletingChannelData.id,
          }),
          headers: {
            Authorization: Cookies.get("accessToken") as string,
            "content-type": "application/json",
          },
        });

        if (res.status === 200) {
          resolve("");

          const userData = (
            await (
              await fetch("api/me", {
                headers: {
                  Authorization: Cookies.get("accessToken") as string,
                },
              })
            ).json()
          ).profileData as UserData;

          setUserData(userData);
          setServerData(
            userData.servers.filter((v) => v.id === $serverData.id)[0]
          );
          setDeletingChannel(false);
          setChannelName("");
          setChannelDescription("");
        } else {
          reject((await res.json()).errors[0].message);
        }

        setDisabled(false);
      });
    }
  }

  // Update on theme change
  useEffect(() => {
    setThemeOption(theme === "light" ? 0 : 1);
  }, [theme]);

  useEffect(() => {
    if ($editingServer) {
      setServerName($serverData.name);
      setServerAvatarData($serverData.avatar);
      setServerBannerData($serverData.banner);
    }
  }, [$editingServer]);

  return (
    <>
      <Dialog open={$updatingProfileNote} onOpenChange={setUpdatingProfileNote}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile note</DialogTitle>
            <DialogDescription>Visible to everyone</DialogDescription>
          </DialogHeader>
          <div className="flex">
            <div className="grid grid-cols-4 items-center gap-4 mt-2 mb-2">
              <Label htmlFor="profile-note" className="text-right">
                Note
              </Label>
              <Input
                defaultValue={$userData.note}
                maxLength={30}
                className="col-span-3 w-full"
                onKeyDown={(e) => e.key == "Enter" && updateProfileNote()}
                onInput={(e) => {
                  // @ts-ignore
                  setExtraInput(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter className="mobile:flex-col">
            {$userData.note && (
              <>
                <Button variant={"outline"} onClick={clearProfileNote}>
                  <Cross2Icon className="mr-2" />
                  Clear note
                </Button>

                <span className="flex-1" />
              </>
            )}

            <Button
              disabled={disabled}
              type="submit"
              onClick={updateProfileNote}
              className="mobile:mt-2"
            >
              <CheckIcon className="mr-2" />
              Update note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={$sharingPost} onOpenChange={setSharingPost}>
        <DialogContent className="h-[90vh] min-w-[500px] w-[45vw] max-w-none flex flex-col justify-center items-center text-center">
          <div className="grid gap-4 py-4 h-full">
            {!postData ? (
              <>
                <div className="flex flex-col items-center justify-center h-full">
                  <ImageIcon width={80} height={80} />
                  <h1 className="text-md font-normal mt-2 mb-4">
                    Drag an image or upload one from your device
                  </h1>
                  <Button
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";

                      input.onchange = (e) => {
                        // @ts-ignore
                        let image = e.target.files[0];

                        if (!image.type.includes("image/")) {
                          toast.error("Only images allowed");

                          return;
                        }

                        // Max 25MB
                        if (image.size > 2000000) {
                          toast.error("Images must be under 2MB");
                          return;
                        }

                        let reader = new FileReader();
                        reader.readAsDataURL(image);
                        reader.onload = (e) => {
                          setPostData(e.target?.result as string);
                        };
                      };

                      input.click();
                    }}
                  >
                    Select image
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center text-center m-auto h-[80vh]">
                  <Input
                    disabled={disabled}
                    placeholder="Title"
                    className="mb-2 text-md"
                    maxLength={50}
                    onChange={(e) => {
                      setPostTitle(e.target.value);
                    }}
                    defaultValue={postTitle}
                  />

                  <img
                    src={postData}
                    className="h-[70vh] max-h-[800px] max-w-full mb-2 rounded-lg"
                  />

                  <span className="flex-1" />

                  <div className="flex items-center justify-center w-full">
                    <Button
                      disabled={disabled}
                      onClick={() => {
                        setPostTitle("");
                        setPostData("");
                      }}
                      variant={"outline"}
                      className="mr-2"
                    >
                      Reset
                    </Button>

                    <Button
                      onClick={sharePost}
                      disabled={disabled}
                      className="ml-2"
                    >
                      Share post
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={$settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="mobile:h-screen mobile:w-screen mobile:rounded-none mobile:border-none w-[90vw] max-w-none h-[90vh] flex flex-col p-0">
          <div className="mobile:flex-col flex p-0 m-0 flex-1">
            <div className="bg-accent/15 border-r border-1 flex mobile:justify-center lg:flex-col mr-6 pl-6 pr-6 mobile:mr-0 mobile:pl-0 mobile:mb-1">
              <h1 className="mobile:hidden font-bold text-center mb-2 mt-2">
                Settings
              </h1>

              {settingHeaders.map((v) => {
                return (
                  <>
                    <Button
                      className={`mobile:text-[0.8rem] mobile:pt-3 mobile:pb-3 w-[125px] mobile:w-[25%] mobile:h-full mobile:rounded-none mobile:border-r-0 mobile:border-l-0 mobile:mt-0 mobile:mb-0 mt-1 mb-1`}
                      variant={selectedHeader === v ? "secondary" : "outline"}
                      onClick={() => setSelectedHeader(v)}
                    >
                      {v}
                    </Button>
                  </>
                );
              })}

              <h1 className="mobile:hidden text-center font-thin opacity-50 text-sm mt-2">
                v{$appVersion}
              </h1>
            </div>

            <div className="mobile:pr-5 mobile:pl-5 flex flex-col flex-1 pr-10 overflow-auto mobile:max-h-[90vh] max-h-[89.75vh]">
              <div className="flex flex-col flex-1 mt-2 m-auto w-full">
                {selectedHeader !== "Privacy" &&
                  selectedHeader !== "Appearance" && (
                    <SettingsHeader className="mb-3">
                      {selectedHeader}
                    </SettingsHeader>
                  )}

                {selectedHeader === "Account" && (
                  <>
                    <div className="pb-4 flex flex-col flex-1">
                      <div className="p-3 border rounded-md">
                        <div className="flex items-center">
                          {!$userData?.avatar ? (
                            <PersonIcon
                              width={20}
                              height={20}
                              className="mobile:min-w-[16px] mobile:min-h-[16px] min-w-[24px] min-h-[24px] mr-2"
                            />
                          ) : (
                            <img
                              src={$userData.avatar}
                              className="mobile:min-w-[16px] mobile:min-h-[16px] mobile:w-[16px] mobile:h-[16px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] rounded-full mr-2"
                            />
                          )}

                          <h1 className="max-w-[150px] overflow-hidden text-ellipsis mobile:text-xs text-sm font-semibold m-0 p-0">
                            {$userData.username}
                          </h1>

                          <span className="flex-1" />

                          <Button
                            className="mobile:text-[0.7rem]"
                            size={"default"}
                          >
                            Edit Profile
                          </Button>
                        </div>
                      </div>

                      <SettingsSeparator />

                      <div>
                        <SettingsHeader className="mb-4">
                          Security
                        </SettingsHeader>

                        <Button
                          onClick={() => setChangingPassword(true)}
                          variant={"outline"}
                          size="default"
                          className="mobile:text-[0.7rem]"
                        >
                          <Pencil1Icon className="mr-2" /> Change password
                        </Button>

                        <SettingsSeparator />

                        <SettingsHeader>Extra Auth</SettingsHeader>

                        <SettingsSubheader>
                          Authenticator apps allow you to protect your account
                          with a randomly-generated code
                        </SettingsSubheader>

                        {/* TODO: Enable in future version */}
                        <Button
                          className="mobile:text-[0.7rem]"
                          disabled
                          variant={"outline"}
                          size="default"
                        >
                          <GearIcon className="mr-2" /> Add authenticator
                        </Button>

                        <SettingsSeparator />

                        <Button
                          onClick={() => setMoreShown(!moreShown)}
                          variant={moreShown ? "ghost" : "ghost"}
                          className="mobile:text-[0.8rem]"
                        >
                          {!moreShown ? (
                            <ChevronDownIcon className="w-[16px] h-[16px] mr-2" />
                          ) : (
                            <ChevronUpIcon className="w-[16px] h-[16px] mr-2" />
                          )}
                          Show {moreShown ? "less" : "more"}
                        </Button>

                        {moreShown && (
                          <div className="border-red-500 border-2 rounded-md border mt-4 p-4 pt-3">
                            <SettingsHeader className="mt-0">
                              Danger zone
                            </SettingsHeader>

                            <SettingsSubheader>
                              Proceed with caution
                            </SettingsSubheader>

                            <Button
                              variant={"destructive"}
                              onClick={() => setDeletingAccount(true)}
                              className="mobile:text-[0.7rem]"
                            >
                              <Cross1Icon className="mr-2" />
                              Delete account
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {selectedHeader === "Appearance" && (
                  <>
                    <div className="pb-4 flex flex-col flex-1">
                      <div>
                        <SettingsHeader>Theme</SettingsHeader>

                        <SettingsSubheader>
                          Adjust the Fronvo app theme
                        </SettingsSubheader>

                        <SettingsChoice
                          selected={themeOption}
                          values={["White", "Dark"]}
                          clickListener={(i) => {
                            setThemeOption(i as 0 | 1);
                            setTheme(i === 0 ? "light" : "dark");
                          }}
                        />

                        <SettingsSeparator />

                        <SettingsHeader>Default tab</SettingsHeader>

                        <SettingsSubheader>
                          Change the default landing page of Fronvo
                        </SettingsSubheader>

                        <SettingsChoice
                          selected={tabOption}
                          values={["Home", "Messaging"]}
                          clickListener={(i) => {
                            setTabOption(i as 0 | 1);
                            updateTabOption(i as 0 | 1);
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedHeader === "Privacy" && (
                  <>
                    <div className="pb-4 flex flex-col flex-1">
                      <div>
                        <SettingsHeader>Direct Messages</SettingsHeader>

                        <SettingsSubheader>
                          Set who can message you directly, outside of a server
                          or group
                        </SettingsSubheader>

                        <SettingsChoice
                          selected={dmOption}
                          values={["Everyone", "Friends Only"]}
                          clickListener={(i) => {
                            setDMOption(i as 0 | 1);
                            updateDMOption(i as 0 | 1);
                          }}
                        />

                        <SettingsSeparator />

                        <SettingsHeader>Filter messages</SettingsHeader>

                        <SettingsSubheader>
                          Update message filtering to hide vulgar words
                        </SettingsSubheader>

                        <SettingsChoice
                          selected={filterOption}
                          values={["Everything", "Nothing"]}
                          clickListener={(i) => {
                            setFilterOption(i as 0 | 1);
                            updateFilterOption(i as 0 | 1);
                          }}
                        />
                      </div>

                      <SettingsSeparator />

                      <SettingsHeader>Request data</SettingsHeader>

                      <SettingsSubheader>
                        Fetch all of your data straight from the Fronvo servers
                      </SettingsSubheader>

                      <div>
                        <Button
                          className="mobile:text-[0.7rem]"
                          onClick={() => setRequestingData(true)}
                        >
                          Request data
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {selectedHeader === "About" && (
                  <>
                    <div className="m-auto pb-4 flex flex-col flex-1 items-center justify-center">
                      <img
                        className="mobile:min-w-[128px] mobile:w-[128px] mobile:min-h-[128px] mobile:h-[128px] min-w-[164px] w-[164px] min-h-[164px] h-[164px]"
                        src="/favicon.ico"
                      />

                      <h1 className="font-bold mobile:text-[1.7rem] text-[2.2rem] translate-y-[-20px]">
                        Fronvo
                      </h1>

                      <SettingsSubheader className="translate-y-[-20px]">
                        Version {$appVersion}
                      </SettingsSubheader>

                      <span className="flex-1" />

                      <h1 className="font-medium mobile:text-xs text-sm opacity-50">
                        Created with ♥ by{" "}
                        <Link href={"https://stamtsag.com"} target="_blank">
                          Stam
                        </Link>
                      </h1>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={$loggingOut} onOpenChange={setLoggingOut}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log out</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of Fronvo?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose disabled={disabled}>
              <Button variant={"outline"} className="mobile:hidden">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={logout} variant={"destructive"}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={$switchingAccounts} onOpenChange={setSwitchingAccounts}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Switch accounts</DialogTitle>
            <DialogDescription>
              Choose or add another account to use on Fronvo
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center mb-6 mt-6">
            <AccountSwitchView
              username={$userData.username}
              avatar={$userData.avatar}
              active
            />
          </div>

          <DialogFooter className="mobile:flex mobile:w-max mobile:m-auto">
            <DialogClose disabled={disabled} className="mobile:flex">
              <Button variant={"outline"} className="mobile:hidden">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled
              onClick={switchAccount}
              variant={"default"}
              className="mobile:w-max"
            >
              Add account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={$deletingAccount}
        onOpenChange={() => {
          setDeletingAccount(false);
          setPasswordInput("");
          setExtraInput("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete my account</DialogTitle>
            <DialogDescription>
              Follow the steps below to delete your account
            </DialogDescription>
          </DialogHeader>

          <hr />

          <h1>Type in your password</h1>
          <Input
            onInput={(e) => {
              // @ts-ignore
              setPasswordInput(e.target.value.trim());
            }}
            type="password"
            placeholder="Password"
          />

          <h1 className="mt-4">
            Type{" "}
            <span className="font-bold select-none">delete my account</span>{" "}
            below
          </h1>

          <Input
            className="font-bold"
            onInput={(e) => {
              // @ts-ignore
              setExtraInput(e.target.value);
            }}
          />

          <DialogFooter>
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button
              disabled={
                disabled ||
                extraInput !== "delete my account" ||
                passwordInput.length < 8
              }
              onClick={deleteAccount}
              variant={"destructive"}
            >
              Delete account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={$changingPassword}
        onOpenChange={() => {
          setChangingPassword(false);
          setPasswordInput("");
          setExtraInput("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change my password</DialogTitle>
            <DialogDescription>
              Follow the steps below to change the password of your account
            </DialogDescription>
          </DialogHeader>

          <hr />

          <h1>Type in your password</h1>
          <Input
            onInput={(e) => {
              // @ts-ignore
              setPasswordInput(e.target.value.trim());
            }}
            type="password"
            placeholder="Password"
          />

          <h1 className="mt-4">Type your new password below</h1>

          <Input
            onInput={(e) => {
              // @ts-ignore
              setExtraInput(e.target.value);
            }}
            type="password"
            placeholder="New password"
          />

          <DialogFooter>
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button
              disabled={
                disabled || extraInput.length < 8 || passwordInput.length < 8
              }
              onClick={changePassword}
            >
              Change password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={$requestingData} onOpenChange={setRequestingData}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request my data</DialogTitle>
            <DialogDescription>
              Get all of your account data sent to your email
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button disabled={disabled} onClick={requestData}>
              Request data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={$creatingServer}
        onOpenChange={(e) => {
          setCreatingServer(e);
          setServerName("");
          setServerAvatarData("");
          setServerBannerData("");
        }}
      >
        <DialogContent className="w-max max-w-none min-w-none pt-10 h-[375px]">
          {!serverBannerData ? (
            <div className="mobile:w-full w-[600px] h-[240px] border border-1 rounded-md">
              <Pencil1Icon
                width={32}
                height={32}
                className="hover:bg-accent transition-[100ms] cursor-pointer fixed m-auto right-0 translate-x-[-36px] translate-y-2 border border-1 p-1.5 rounded-full"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";

                  input.onchange = (e) => {
                    // @ts-ignore
                    let image = e.target.files[0];

                    if (!image.type.includes("image/")) {
                      toast.error("Only images allowed");

                      return;
                    }

                    if (image.size > 2000000) {
                      toast.error("Images must be under 2MB");
                      return;
                    }

                    let reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = (e) => {
                      setServerBannerData(e.target?.result as string);
                    };
                  };

                  input.click();
                }}
              />
            </div>
          ) : (
            <div className="mobile:w-full w-[600px] h-[240px] border border-1 rounded-md">
              <Pencil1Icon
                width={32}
                height={32}
                className="hover:bg-accent bg-background transition-[100ms] cursor-pointer fixed m-auto right-0 translate-x-[-72px] translate-y-2 border border-1 p-1.5 rounded-full"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";

                  input.onchange = (e) => {
                    // @ts-ignore
                    let image = e.target.files[0];

                    if (!image.type.includes("image/")) {
                      toast.error("Only images allowed");

                      return;
                    }

                    // Max 25MB
                    if (image.size > 2000000) {
                      toast.error("Images must be under 2MB");
                      return;
                    }

                    let reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = (e) => {
                      setServerBannerData(e.target?.result as string);
                    };
                  };

                  input.click();
                }}
              />

              <Cross1Icon
                width={32}
                height={32}
                className="hover:bg-accent bg-background transition-[100ms] cursor-pointer fixed m-auto right-0 translate-x-[-36px] translate-y-2 border border-1 p-1.5 rounded-full"
                onClick={() => {
                  setServerBannerData("");
                }}
              />

              <img
                src={serverBannerData}
                className="mobile:w-full w-[600px] h-[240px] border border-1 rounded-md object-cover"
              />
            </div>
          )}

          <div className="flex">
            <Button
              className={`${
                !serverAvatarData && "opacity-0 cursor-default"
              } fixed mobile:translate-y-[-60px] translate-y-[-68px] mobile:translate-x-14 translate-x-20 rounded-full  mobile:w-[24px] w-[32px] mobile:h-[24px] p-1 z-10`}
              size="sm"
              variant={"outline"}
              onClick={() => setServerAvatarData("")}
            >
              <Cross1Icon width={14} height={14} />
            </Button>

            {!serverAvatarData ? (
              <div
                className="hover:bg-background/75 transition-[100ms] mobile:min-w-[56px] mobile:min-h-[56px] min-w-[64px] min-h-[64px] bg-background border border-1 rounded-md mobile:translate-x-2 mobile:translate-y-[-50px] translate-y-[-56px] translate-x-10 cursor-pointer"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";

                  input.onchange = (e) => {
                    // @ts-ignore
                    let image = e.target.files[0];

                    if (!image.type.includes("image/")) {
                      toast.error("Only images allowed");

                      return;
                    }

                    // Max 25MB
                    if (image.size > 2000000) {
                      toast.error("Images must be under 2MB");
                      return;
                    }

                    let reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = (e) => {
                      setServerAvatarData(e.target?.result as string);
                    };
                  };

                  input.click();
                }}
              ></div>
            ) : (
              <div className="hover:opacity-90 transition-[100ms] mobile:min-w-[56px] mobile:min-h-[56px] min-w-[64px] min-h-[64px] bg-background border border-1 rounded-md mobile:translate-x-2 mobile:translate-y-[-50px] translate-y-[-56px] translate-x-10 cursor-pointer">
                <img
                  src={serverAvatarData}
                  className="hover:opacity-90 transition-[100ms] mobile:min-w-[56px] mobile:w-[56px] min-w-[64px] max-w-[64px] mobile:min-h-[56px] mobile:h-[56px] min-h-[64px] max-h-[64px] rounded-md cursor-pointer object-cover"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";

                    input.onchange = (e) => {
                      // @ts-ignore
                      let image = e.target.files[0];

                      if (!image.type.includes("image/")) {
                        toast.error("Only images allowed");

                        return;
                      }

                      // Max 25MB
                      if (image.size > 2000000) {
                        toast.error("Images must be under 2MB");
                        return;
                      }

                      let reader = new FileReader();
                      reader.readAsDataURL(image);
                      reader.onload = (e) => {
                        setServerAvatarData(e.target?.result as string);
                      };
                    };

                    input.click();
                  }}
                />
              </div>
            )}
            <Input
              placeholder="Server Name"
              maxLength={30}
              autoFocus
              onChange={(e) => {
                setServerName(e.target.value);
              }}
              defaultValue={serverName}
              className="mobile:translate-x-4 translate-y-[-36px] translate-x-14 mobile:w-[60%] w-[250px] bg-background"
            ></Input>
          </div>
          <DialogFooter className="translate-y-[-52px]">
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"} disabled={disabled}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={disabled || serverName.length === 0}
              onClick={createServer}
            >
              Create server
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={$joiningServer}
        onOpenChange={(e) => {
          setJoiningServer(e);
          setInviteLink("");
        }}
      >
        <DialogContent>
          <DialogTitle>Join Server</DialogTitle>
          <DialogDescription>
            Enter a server invite link in order to join
          </DialogDescription>

          <Input
            onChange={(e) => setInviteLink(e.target.value)}
            maxLength={8}
            placeholder="hellowor"
          />

          <DialogFooter>
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"} disabled={disabled}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={disabled || inviteLink.length !== 8}
              onClick={joinServer}
            >
              Join server
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={$editingServer}
        onOpenChange={(e) => {
          setEditingServer(e);
          setServerName("");
          setServerAvatarData("");
          setServerBannerData("");
        }}
      >
        <DialogContent className="w-max max-w-none min-w-none pt-10 h-[375px]">
          {!serverBannerData ? (
            <div className="mobile:w-full w-[600px] h-[240px] border border-1 rounded-md">
              <Pencil1Icon
                width={32}
                height={32}
                className="hover:bg-accent transition-[100ms] cursor-pointer fixed m-auto right-0 translate-x-[-36px] translate-y-2 border border-1 p-1.5 rounded-full"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";

                  input.onchange = (e) => {
                    // @ts-ignore
                    let image = e.target.files[0];

                    if (!image.type.includes("image/")) {
                      toast.error("Only images allowed");

                      return;
                    }

                    // Max 25MB
                    if (image.size > 2000000) {
                      toast.error("Images must be under 2MB");
                      return;
                    }

                    let reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = (e) => {
                      setServerBannerData(e.target?.result as string);
                    };
                  };

                  input.click();
                }}
              />
            </div>
          ) : (
            <div className="mobile:w-full w-[600px] h-[240px] border border-1 rounded-md">
              <Pencil1Icon
                width={32}
                height={32}
                className="hover:bg-accent bg-background transition-[100ms] cursor-pointer fixed m-auto right-0 translate-x-[-72px] translate-y-2 border border-1 p-1.5 rounded-full"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";

                  input.onchange = (e) => {
                    // @ts-ignore
                    let image = e.target.files[0];

                    if (!image.type.includes("image/")) {
                      toast.error("Only images allowed");

                      return;
                    }

                    // Max 25MB
                    if (image.size > 2000000) {
                      toast.error("Images must be under 2MB");
                      return;
                    }

                    let reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = (e) => {
                      setServerBannerData(e.target?.result as string);
                    };
                  };

                  input.click();
                }}
              />

              <Cross1Icon
                width={32}
                height={32}
                className="hover:bg-accent bg-background transition-[100ms] cursor-pointer fixed m-auto right-0 translate-x-[-36px] translate-y-2 border border-1 p-1.5 rounded-full"
                onClick={() => {
                  setServerBannerData("");
                }}
              />

              <img
                src={serverBannerData}
                className="mobile:w-full w-[600px] h-[240px] border border-1 rounded-md object-cover"
              />
            </div>
          )}

          <div className="flex">
            <Button
              className={`${
                !serverAvatarData && "opacity-0 cursor-default"
              } fixed mobile:translate-y-[-60px] translate-y-[-68px] mobile:translate-x-14 translate-x-20 rounded-full  mobile:w-[24px] w-[32px] mobile:h-[24px] p-1 z-10`}
              size="sm"
              variant={"outline"}
              onClick={() => setServerAvatarData("")}
            >
              <Cross1Icon width={14} height={14} />
            </Button>

            {!serverAvatarData ? (
              <div
                className="hover:bg-background transition-[100ms] mobile:min-w-[56px] mobile:min-h-[56px] min-w-[64px] min-h-[64px] bg-background border border-1 rounded-md mobile:translate-x-2 mobile:translate-y-[-50px] translate-y-[-56px] translate-x-10 cursor-pointer"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";

                  input.onchange = (e) => {
                    // @ts-ignore
                    let image = e.target.files[0];

                    if (!image.type.includes("image/")) {
                      toast.error("Only images allowed");

                      return;
                    }

                    // Max 25MB
                    if (image.size > 2000000) {
                      toast.error("Images must be under 2MB");
                      return;
                    }

                    let reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = (e) => {
                      setServerAvatarData(e.target?.result as string);
                    };
                  };

                  input.click();
                }}
              ></div>
            ) : (
              <div className="hover:bg-background transition-[100ms] mobile:min-w-[56px] mobile:min-h-[56px] min-w-[64px] min-h-[64px] bg-background border border-1 rounded-md mobile:translate-x-2 mobile:translate-y-[-50px] translate-y-[-56px] translate-x-10 cursor-pointer">
                <img
                  src={serverAvatarData}
                  className="hover:opacity-75 transition-[100ms] mobile:min-w-[56px] mobile:w-[56px] min-w-[64px] max-w-[64px] mobile:min-h-[56px] mobile:h-[56px] min-h-[64px] max-h-[64px] rounded-md cursor-pointer object-cover"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";

                    input.onchange = (e) => {
                      // @ts-ignore
                      let image = e.target.files[0];

                      if (!image.type.includes("image/")) {
                        toast.error("Only images allowed");

                        return;
                      }

                      // Max 25MB
                      if (image.size > 2000000) {
                        toast.error("Images must be under 2MB");
                        return;
                      }

                      let reader = new FileReader();
                      reader.readAsDataURL(image);
                      reader.onload = (e) => {
                        setServerAvatarData(e.target?.result as string);
                      };
                    };

                    input.click();
                  }}
                />
              </div>
            )}
            <Input
              placeholder="Server Name"
              maxLength={30}
              onChange={(e) => {
                setServerName(e.target.value);
              }}
              defaultValue={serverName}
              className="mobile:translate-x-4 translate-y-[-36px] translate-x-14 mobile:w-[60%] w-[250px] bg-background"
            ></Input>
          </div>
          <DialogFooter className="translate-y-[-52px]">
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"} disabled={disabled}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={disabled || serverName.length === 0}
              onClick={editServer}
            >
              Update server
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={$leavingServer} onOpenChange={setLeavingServer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave server</DialogTitle>
            <DialogDescription>
              Are you sure you want to leave from <b>{$serverData?.name}</b>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button
              disabled={disabled}
              onClick={leaveServer}
              variant={"destructive"}
            >
              Leave server
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={$deletingServer}
        onOpenChange={() => {
          setDeletingServer(false);
          setPasswordInput("");
          setExtraInput("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete server</DialogTitle>
            <DialogDescription>
              Follow the steps below to delete {$serverData?.name}
            </DialogDescription>
          </DialogHeader>

          <hr />

          <h1>Type in the server name</h1>
          <Input
            onInput={(e) => {
              // @ts-ignore
              setServerName(e.target.value.trim());
            }}
            type="text"
            placeholder="Server Name"
          />

          <h1 className="mt-4">
            Type <span className="font-bold select-none">delete my server</span>{" "}
            below
          </h1>

          <Input
            className="font-bold"
            onInput={(e) => {
              // @ts-ignore
              setExtraInput(e.target.value);
            }}
          />

          <DialogFooter>
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button
              disabled={
                disabled ||
                extraInput !== "delete my server" ||
                serverName !== $serverData?.name
              }
              onClick={deleteServer}
              variant={"destructive"}
            >
              Delete server
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={$creatingChannel} onOpenChange={setCreatingChannel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create channel</DialogTitle>
            <DialogDescription>Publicly visible</DialogDescription>
          </DialogHeader>
          <div className="flex-col">
            <div className="grid grid-cols-4 items-center gap-4 mt-2 mb-2">
              <Label htmlFor="profile-note" className="text-right">
                Name
              </Label>
              <Input
                maxLength={20}
                className="col-span-3 w-full"
                onInput={(e) => {
                  // @ts-ignore
                  setChannelName(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mt-2 mb-2">
              <Label htmlFor="profile-note" className="text-right">
                Description
              </Label>
              <Textarea
                maxLength={500}
                className="col-span-3 w-full max-h-40"
                onInput={(e) => {
                  // @ts-ignore
                  setChannelDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter className="mobile:flex-col">
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>

            <Button
              disabled={disabled}
              type="submit"
              onClick={createChannel}
              className="mobile:mt-2"
            >
              Create channel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={$editingChannel} onOpenChange={setEditingChannel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create channel</DialogTitle>
            <DialogDescription>Publicly visible</DialogDescription>
          </DialogHeader>
          <div className="flex-col">
            <div className="grid grid-cols-4 items-center gap-4 mt-2 mb-2">
              <Label htmlFor="profile-note" className="text-right">
                Name
              </Label>
              <Input
                maxLength={20}
                className="col-span-3 w-full"
                defaultValue={$editingChannelData?.name}
                onInput={(e) => {
                  // @ts-ignore
                  setChannelName(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mt-2 mb-2">
              <Label htmlFor="profile-note" className="text-right">
                Description
              </Label>
              <Textarea
                maxLength={500}
                className="col-span-3 w-full max-h-40"
                defaultValue={$editingChannelData?.description}
                onInput={(e) => {
                  // @ts-ignore
                  setChannelDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter className="mobile:flex-col">
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>

            <Button
              disabled={disabled}
              type="submit"
              onClick={editChannel}
              className="mobile:mt-2"
            >
              Update channel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={$deletingChannel} onOpenChange={setDeletingChannel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete channel</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <b className="text-primary">{$deletingChannelData?.name}</b>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mobile:flex-col">
            <DialogClose disabled={disabled} className="mobile:hidden">
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>

            <Button
              disabled={disabled}
              type="submit"
              onClick={deleteChannel}
              className="mobile:mt-2"
              variant={"destructive"}
            >
              Delete channel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={$managingMembers} onOpenChange={setManagingMembers}>
        <DialogContent className="flex flex-col w-[90vw] max-w-none h-[90vh]">
          <DialogTitle>
            {$serverData?.members.length} member
            {$serverData?.members.length !== 1 ? "s" : ""}
          </DialogTitle>

          <DataTable
            viewOptions
            columns={memberColumns}
            data={$serverData?.members}
          />

          <DialogFooter>
            <DialogClose disabled={disabled}>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={$banningMembers} onOpenChange={setBanningMembers}>
        <DialogContent className="flex flex-col w-[90vw] max-w-none h-[90vh]">
          <DialogTitle>Bans</DialogTitle>

          <DataTable
            viewOptions
            columns={bannedColumns}
            data={$serverData?.banned_members}
          />

          <DialogFooter>
            <DialogClose disabled={disabled}>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
