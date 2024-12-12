import Image from 'next/image'
import { User } from '../types/user'
import Link from 'next/link'

type UserCardProps = {
	user: User
}

export default function UserCard({ user }: UserCardProps) {
	return (
		<Link href={`/profile/${user.id}`}>
			<li className='border p-4 rounded shadow flex items-center space-x-4'>
				<Image
					src={user.profileImage}
					alt={user.name}
					width={40}
					height={20}
				/>
				<div>
					<h2 className='text-xl font-semibold'>{user.name}</h2>
					<p className='text-gray-600'>{user.bio}</p>
				</div>
			</li>
		</Link>
	)
}
