import { getUsers } from '../../../../lib/utils/users'
import { User } from '../../../../types/user'
import UserProfileClient from './UserProfileClient'

export default async function UserProfilePage({
	params,
}: {
	params: { id: string }
}) {
	console.log(params)
	const { id } = params
	const users: User[] = await getUsers()
	const user = users.find((u) => u.id === parseInt(id))

	if (!user) {
		return <div className='p-6'>User not found.</div>
	}

    return (
        
		<div className='p-6 max-w-4xl mx-auto'>
			<UserProfileClient user={user} />
		</div>
	)
}
