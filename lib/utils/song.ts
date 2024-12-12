import { Song } from '../../types/user'

export const fetchSongs = async (userId: number): Promise<Song[]> => {
	const response = await fetch(`/api/users/songs?userId=${userId}`)
	if (!response.ok) throw new Error('Failed to fetch songs')
	return await response.json()
}

export const addSong = async (userId: number, newSong: Song): Promise<Song> => {
	const response = await fetch(`/api/users/songs`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId, song: newSong }),
	})
	if (!response.ok) throw new Error('Failed to add song')
	return await response.json()
}

export const updateSong = async (
	userId: number,
	updatedSong: Song,
): Promise<Song> => {
	const response = await fetch(`/api/users/songs`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId, song: updatedSong }),
	})
	if (!response.ok) throw new Error('Failed to update song')
	return await response.json()
}

export const deleteSong = async (
	userId: number,
	songId: number,
): Promise<void> => {
	const response = await fetch(`/api/users/songs`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId, songId }),
	})
	if (!response.ok) throw new Error('Failed to delete song')
}
