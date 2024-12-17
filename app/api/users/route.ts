import { NextResponse } from "next/server";
import { readUsersFromFile, writeUsersToFile } from "@/lib/utils/storage";
import { User

 } from '../../../types/user'


// async func to get all users
export async function GET() {
	try {
		const users = await readUsersFromFile()
		return NextResponse.json(users, { status: 200 })
	} catch (error) {
		console.error('GET error:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
// async func to update user details and songs

export async function PUT(req: Request) {
	try {
		const updatedData: Partial<User> = await req.json()
		const userId = updatedData.id

		if (!userId) {
			return NextResponse.json(
				{ message: 'User ID is required' },
				{ status: 400 },
			)
		}

		const users = await readUsersFromFile()

		const userIndex = users.findIndex((user) => user.id === userId)
		if (userIndex === -1) {
			return NextResponse.json(
				{ message: 'User not found' },
				{ status: 404 },
			)
		}

		users[userIndex] = { ...users[userIndex], ...updatedData }

		await writeUsersToFile(users)

		return NextResponse.json(users[userIndex], { status: 200 })
	} catch (error) {
		console.error('PUT error:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
