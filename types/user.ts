export type User = {
	id: number
	name: string
	profileImage: string
	bio: string
	favoriteSongs: {
		id: number
		title: string
		artist: string
		genre: string
		rating: number
	}[]
}
