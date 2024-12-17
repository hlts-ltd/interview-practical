import { readUsersFromFile } from '@/lib/utils/storage';
import UserProfileClient from './UserProfileClient'
import { session } from '@/lib/auth/session';

export default async function UserProfilePage({
	params,
}: {
	params: { id: string }
}) {
  const sessionStatus = await session({ required: false });
  const users = await readUsersFromFile();
  const user = users.find((u) => u.id === parseInt(params.id, 10));
	if (!user) {
		return <div className='p-6'>User not found.</div>
	}
  const canEdit = sessionStatus?.user.id === user.id;
    return (
        
		<div className='p-6 max-w-4xl mx-auto'>
			<UserProfileClient user={user} canEdit={canEdit} />
		</div>
	)
}
