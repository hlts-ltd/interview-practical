import * as React from "react";
import { Profile } from "@/components/ui/layouts/Profile";
import { notFound } from "next/navigation";
import {
  addFavoriteSong,
  updateFavoriteSong,
  deleteSong,
  downloadSong,
} from "../user.action";
import { service } from "@/lib/services";


const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const {
    songs,
    user: { biography, email, firstName, lastName, userImage },
  } = await getData(id);

  return (
    <div className="">
      <Profile
        id={id}
        addSongHandler={addFavoriteSong}
        updateFavoriteSong={updateFavoriteSong}
        deleteSongHandler={deleteSong}
        downloadHandler={downloadSong}
        data={songs}
        email={email}
        biography={biography}
        userImage={userImage!}
        name={`${firstName} ${lastName}`}
      />
    </div>
  );
};

export default Page;

async function getData(id: string) {
  const user = await service.getUser(id);
  const songs = await service.getSongs(id);
  if (!user) {
    notFound();
  }
  return { user, songs };
}
