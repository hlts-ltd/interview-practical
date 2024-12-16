import { notFound } from "next/navigation";
import AddSong from "@/components/AddSong";
import { getSongs } from "@/lib/data/song";
import Song from "@/components/song/Song";
import { getUserById } from "@/lib/data/users";
import Container from "@/components/Container";
import { getCurrentUser } from "@/lib/data/auth";
import UpdateProfile from "@/components/UpdateProfile";
import DownloadSongs from "@/components/song/DownloadSongs";

export default async function User({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const resolvedParams = await params;

  const pageUser = await getUserById(+`${resolvedParams.id}`);

  if (!pageUser) {
    return notFound();
  }

  const currentUser = await getCurrentUser();

  const isOwner = currentUser?.id === pageUser.id;

  const songs = await getSongs(pageUser.id);

  return (
    <Container>
      <div className="w-full flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">
            {pageUser.firstName} {pageUser.lastName}
          </h1>

          <p className="text-muted-foreground">{pageUser.email}</p>
        </div>

        {isOwner && <UpdateProfile user={pageUser} isOwner={isOwner} />}
      </div>

      {pageUser.bio && <p className="mt-5">{pageUser.bio}</p>}

      <div className="mt-10 mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Favourite Songs</h1>

        <div className="flex items-center gap-3">
          {isOwner && <AddSong isOwner={isOwner} />}

          <DownloadSongs songs={songs} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {songs.map((song) => (
          <Song
            key={song.id}
            song={song}
            isOwner={currentUser?.id === song.userId}
          />
        ))}
      </div>
    </Container>
  );
}
