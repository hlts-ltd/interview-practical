import Image from 'next/image'
import { getUsers } from '../../../lib/utils/users'
import { User } from '../../../types/user'

export default async function UserProfilePage({
	params,
}: {
	params: { id: string }
}) {
	const { id } = params
	const users: User[] = await getUsers()

	const user = users.find((u) => u.id === parseInt(id))

	if (!user) {
		return <div className='p-6'>User not found.</div>
	}

	return (
		<div className='p-6'>
			<h1 className='text-3xl font-bold mb-4'>{user.name}</h1>
			<Image
				src={user.profileImage}
				alt={`${user.name}'s profile`}
				width={150}
				height={150}
				className='rounded-full mb-4'
			/>
			<p className='text-gray-600 mb-6'>{user.bio}</p>
			<h2 className='text-2xl font-semibold mb-4'>Favorite Songs</h2>
			<ul className='space-y-2'>
				{user.favoriteSongs.map((song) => (
					<li key={song.id} className='p-4 border rounded shadow'>
						<h3 className='text-xl font-bold'>{song.title}</h3>
						<p>Artist: {song.artist}</p>
						<p>Genre: {song.genre}</p>
						<p>Rating: {song.rating}/5</p>
					</li>
				))}
			</ul>
		</div>
	)
}
