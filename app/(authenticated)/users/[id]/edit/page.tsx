import { prisma } from '@/database/prisma';
import { notFound } from 'next/navigation';
import { updateUser } from './updateUser-action';

type UserPageProps = {
  params: {
    id: string
  }
}


const User = async ({params}: UserPageProps) => {
  // NextJS 15 bug - async nature
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true
    }
  });

  console.log('who is this user?', user)

  if (!user) {
    console.log('no user')
    return notFound();
  }

  return (
      <form action={updateUser} className="max-w-sm mx-auto">
        <input type="hidden" name="id" value={id} />
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={user.email!} />
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input type="text" name='name' id='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={user.name!} />
        </div>

        <div className="mb-5">
          <label htmlFor="textarea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your bio</label>
          <input type="textarea" name='bio' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={user.profile?.bio!} />
        </div>
       
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
      </form>

    );
};

export default User;