"use client";
import * as React from "react";
import {
  BiographyCard,
  FavoriteSongsTable,
  HeaderCard,
} from "@/components/ui/compositions";
import { Text } from "@/components/ui/elements";
import { type Song } from "@/database/songs";

export type ProfileProps = {
  id: string;
  data: Song[];
  email: string;
  name: string;
  userImage: string;
  biography: string;
  addSongHandler: Function;
  updateFavoriteSong: Function;
  deleteSongHandler: Function;
  downloadHandler: Function;
};

export const Profile: React.FC<ProfileProps> = ({
  id,
  email,
  name,
  data,
  userImage,
  biography,
  addSongHandler,
  updateFavoriteSong,
  deleteSongHandler,
  downloadHandler,
}) => {
  const download = async (id: string) => {
    const url = await downloadHandler(id);
    const a = document.createElement("a");
    a.href = url as string;
    a.download = `${id}-song.json`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url as string);
  };

  return (
    <div className="p-6">
      <HeaderCard email={email} name={name} userImage={userImage} />
      <BiographyCard biography={biography} />
      <Text className="text-2xl font-semibold mt-4">{"Favorite Songs"}</Text>
      <FavoriteSongsTable
        id={id}
        data={data}
        addSongHandler={addSongHandler}
        updateSongHandler={updateFavoriteSong}
        deleteSongHandler={deleteSongHandler}
        downloadHandler={download}
      />
    </div>
  );
};
