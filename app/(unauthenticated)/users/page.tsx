import { getUsers } from "../../../lib/utils/users";
import UserCard from "../../../components/UserCard";

export default async function UserListingPage() {
  const users = await getUsers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Listing</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
