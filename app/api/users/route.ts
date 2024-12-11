import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { User } from '../../../types/user'

const USERS_FILE_PATH = path.join(process.cwd(), 'storage/database/users.json')

// reuable function to read users
async function readUsersFromFile(): Promise<User[]> {
	try {
		const fileData = await readFile(USERS_FILE_PATH, 'utf-8')
		return JSON.parse(fileData) as User[]
	} catch (error) {
		console.error('Error reading users file:', error)
		throw new Error('Failed to read users file.')
	}
}

// reuable function to write users
async function writeUsersToFile(users: User[]): Promise<void> {
	try {
		await writeFile(
			USERS_FILE_PATH,
			JSON.stringify(users, null, 2),
			'utf-8',
		)
	} catch (error) {
		console.error('Error writing users file:', error)
		throw new Error('Failed to write users file.')
	}
}

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
