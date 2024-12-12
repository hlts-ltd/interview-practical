import { useState } from 'react'
import { Song, AddSongFormProps } from '../types/user'

export default function AddSongForm({ onSave, onCancel }: AddSongFormProps) {
	const [newSong, setNewSong] = useState<Omit<Song, 'id'>>({
		title: '',
		artist: '',
		genre: '',
		rating: 0,
	})

	const [errors, setErrors] = useState<Record<string, string>>({})

	const validateFields = (): boolean => {
		const fieldErrors: Record<string, string> = {}

		if (!newSong.title.trim()) fieldErrors.title = 'Title is required.'
		if (!newSong.artist.trim()) fieldErrors.artist = 'Artist is required.'
		if (!newSong.genre.trim()) fieldErrors.genre = 'Genre is required.'
		if (!newSong.rating || newSong.rating <= 0 || newSong.rating > 5) {
			fieldErrors.rating = 'Rating must be between 1 and 5.'
		}

		setErrors(fieldErrors)
		return Object.keys(fieldErrors).length === 0
	}

	const handleSave = () => {
		if (validateFields()) {
			onSave(newSong)
			setNewSong({ title: '', artist: '', genre: '', rating: 0 })
			setErrors({})
		}
	}

	return (
		<div className='mt-6 p-4 bg-gray-100 rounded shadow space-y-2'>
			<h3 className='text-xl font-bold mb-4'>Add a New Song</h3>

			<div>
				<input
					type='text'
					placeholder='Title'
					value={newSong.title}
					onChange={(e) =>
						setNewSong({ ...newSong, title: e.target.value })
					}
					className={`w-full p-2 border rounded ${
						errors.title ? 'border-red-500' : 'border-gray-300'
					}`}
				/>
				{errors.title && (
					<p className='text-red-500 text-sm'>{errors.title}</p>
				)}
			</div>

			<div>
				<input
					type='text'
					placeholder='Artist'
					value={newSong.artist}
					onChange={(e) =>
						setNewSong({ ...newSong, artist: e.target.value })
					}
					className={`w-full p-2 border rounded ${
						errors.artist ? 'border-red-500' : 'border-gray-300'
					}`}
				/>
				{errors.artist && (
					<p className='text-red-500 text-sm'>{errors.artist}</p>
				)}
			</div>

			<div>
				<input
					type='text'
					placeholder='Genre'
					value={newSong.genre}
					onChange={(e) =>
						setNewSong({ ...newSong, genre: e.target.value })
					}
					className={`w-full p-2 border rounded ${
						errors.genre ? 'border-red-500' : 'border-gray-300'
					}`}
				/>
				{errors.genre && (
					<p className='text-red-500 text-sm'>{errors.genre}</p>
				)}
			</div>

			<div>
				<input
					type='number'
					placeholder='Rating (1-5)'
					value={newSong.rating}
					onChange={(e) =>
						setNewSong({
							...newSong,
							rating: parseFloat(e.target.value),
						})
					}
					className={`w-full p-2 border rounded ${
						errors.rating ? 'border-red-500' : 'border-gray-300'
					}`}
				/>
				{errors.rating && (
					<p className='text-red-500 text-sm'>{errors.rating}</p>
				)}
			</div>

			<div className='flex space-x-2'>
				<button
					onClick={handleSave}
					className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
					Save
				</button>
				<button
					onClick={onCancel}
					className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>
					Cancel
				</button>
			</div>
		</div>
	)
}
