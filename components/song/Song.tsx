"use client";

import React, { useState } from "react";
import Rating from "../Rating";
import { SongType } from "@/types";
import { Button } from "../ui/button";
import UpdateSong from "./UpdateSong";
import DeleteSong from "./DeleteSong";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

type Props = {
  song: SongType;
  isOwner: boolean;
};

const Song = ({ song, isOwner }: Props) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <UpdateSong
        song={song}
        isOwner={isOwner}
        open={openUpdate}
        setOpen={() => setOpenUpdate(false)}
      />

      <DeleteSong
        songId={song.id}
        isOwner={isOwner}
        open={openDelete}
        setOpen={() => setOpenDelete(false)}
      />

      <Card className="bg-transparent text-white border-muted-foreground">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{song.title}</CardTitle>

            <CardDescription>{song.artist}</CardDescription>
          </div>

          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>

                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-[#171717] text-white border-muted-foreground">
                <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Update
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>

        <CardContent className="space-y-1.5 text-muted-foreground">
          <p>Genre: {song.genre}</p>

          <Rating rating={song.rating} />
        </CardContent>
      </Card>
    </>
  );
};

export const SongSkeleton = () => {
  return (
    <Card className="bg-transparent text-white border-muted-foreground">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-3/4" />

          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-1.5 text-muted-foreground">
        <Skeleton className="h-4 w-1/3" />

        <Skeleton className="h-4 w-1/4" />
      </CardContent>
    </Card>
  );
};

export default Song;
