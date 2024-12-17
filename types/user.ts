export type Song = {
    id: number
	title: string
	artist: string
	genre: string
	rating: number
}

export type User = {
	id: number
	name: string
	profileImage: string
	bio: string
	favoriteSongs: Song[]
}

export type FavoriteSongsProps = {
  songs: Song[];
  editingSong: Song | null;
  onEdit: (song: Song | null) => void;
  onSave: (song: Song) => void;
  onRemove: (songId: number) => void;
  canEdit : boolean
};

export type AddSongFormProps = {
  onSave: (song: Omit<Song, "id">) => void;
  onCancel: () => void;
};

export type ProfileDetailsProps = {
    user: User;
    canEdit : boolean
};