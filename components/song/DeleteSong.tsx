"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { deleteSong } from "@/lib/actions/song";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  songId: number;
  isOwner: boolean;
  open: boolean;
  setOpen: () => void;
};

const DeleteSong = ({ open, setOpen, songId, isOwner }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    if (!isOwner) return;

    startTransition(async () => {
      await deleteSong(songId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);

            return;
          }

          toast.success(data.message);

          setOpen();
        })
        .catch((err) => {
          toast.error(
            err.message || "Something went wrong! internal server error."
          );
        });
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-[#171717] text-white border-muted-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your song
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-black" onClick={() => setOpen()}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={onDelete}
            disabled={!isOwner || isPending}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSong;
