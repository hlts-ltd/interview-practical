import { redirect } from 'next/navigation';
import { prisma } from '@/database/prisma'; 
import { revalidatePath } from 'next/cache';

export const updateUser = async (formData: FormData) => {
  'use server';

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const bio = formData.get('bio') as string;


  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      profile: {
        delete: {},
        create: 
        {
          bio
        }
      }
    },
    include: { profile: true}
  });

  revalidatePath('/');
  redirect(`/users/${id}/edit`);
};