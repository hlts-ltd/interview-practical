import { Music, musics } from "@/database";

export function findmusicbyuser(id: string) {
  return musics.findMany((music) => music.userId === id);
}

export function uploadmusic(details: Omit<Music, "id">) {
  const music: Music = {
    ...details,
    id: crypto.randomUUID(),
  };

  musics.add(music);

  return music;
}

export function deletemusic(musicId: string) {
  // Find the music with the matching id
  const musicToDelete = musics.find((music) => music.id === (musicId as Music));

  // If the music exists, delete it from the collection
  if (musicToDelete) {
    musics.delete(musicToDelete); // Assuming musics is a Set or similar structure
  }

  return;
}

export function updateusermusic(details: Music) {
  musics.update(
    (row) => row.id === details.id,
    (row) => ({
      ...row,
      musicName: details?.musicName,
      file: details?.file,
    })
  );

  return;
}
