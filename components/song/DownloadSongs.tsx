"use client";

import React, { useTransition } from "react";
import { SongType } from "@/types";
import { saveAs } from "file-saver";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

type Props = {
  songs: SongType[];
};

const DownloadSongs = ({ songs }: Props) => {
  const [isPending, startTransition] = useTransition();

  const exportSongsAsJson = () => {
    startTransition(async () => {
      const json = JSON.stringify(songs, null, 2);

      const blob = new Blob([json], { type: "application/json" });

      await saveAs(blob, "favourite_songs.json");
    });
  };

  return (
    <Button onClick={exportSongsAsJson} disabled={isPending}>
      <Download className="w-4 h-4" />
      Download
    </Button>
  );
};

export default DownloadSongs;
