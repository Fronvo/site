"use client";

import { updatingProfileNote, userData } from "@/lib/stores";
import { useWritable } from "react-use-svelte-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  CheckIcon,
  Cross1Icon,
  Cross2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import Cookies from "js-cookie";

export default function Dialogs() {
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [$userData, setUserData] = useWritable(userData);

  // ProfileNote
  const [$updatingProfileNote, setUpdatingProfileNote] =
    useWritable(updatingProfileNote);

  async function updateProfileNote() {
    const element = document.getElementById("profile-note") as HTMLInputElement;

    const note = element.value.trim() as string;

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

    const res = await fetch("api/me/updateNote", {
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

    const res = await fetch("api/me/updateNote", {
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

  return (
    <>
      <Dialog open={$updatingProfileNote} onOpenChange={setUpdatingProfileNote}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile note</DialogTitle>
            <DialogDescription>Visible to everyone</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {error && <h1 className="text-destructive font-medium">{error}</h1>}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profile-note" className="text-right">
                Note
              </Label>
              <Input
                defaultValue={$userData.note}
                maxLength={30}
                id="profile-note"
                className="col-span-3"
                onKeyDown={(e) => e.key == "Enter" && updateProfileNote()}
              />
            </div>
          </div>
          <DialogFooter>
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
            >
              <CheckIcon className="mr-2" />
              Update note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
