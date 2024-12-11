'use client'

import { useEffect, useState } from 'react'
import UserCard from '../../../components/UserCard'
import { User } from '@/types/user'

export default function UserListingPage() {
	const [users, setUsers] = useState<User[]>([])
	const [searchTerm, setSearchTerm] = useState<string>('')

	// feetching data from users pi to show oand to search the user in realtime

	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await fetch('/api/users')
				if (!response.ok) throw new Error('Failed to fetch users')
				const data = await response.json()
				setUsers(data)
			} catch (error) {
				if (error instanceof Error) {
					console.error('Error fetching users:', error.message)
				} else {
					console.error('Unexpected error:', error)
				}
			}
		}
		fetchUsers()
	}, [])

	// function to filter user
	const filteredUser = users.filter((user) =>
		user.name.toLowerCase().includes(searchTerm.toLowerCase()),
	)
	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>User Listing</h1>
			<input
				type='text'
				placeholder='Search users by name'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className='border p-2 rounded w-full mb-4'
			/>
			<ul className='space-y-4'>
				{filteredUser.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</ul>
		</div>
	)
}