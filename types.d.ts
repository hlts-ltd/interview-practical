export type UserType = {
  id: number;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string | null;
  bio: string | null;
  createdAt: Date | null;
};

export type SongType = {
  id: number;
  createdAt: Date | null;
  userId: number;
  title: string;
  artist: string;
  genre: string;
  rating: number;
};
