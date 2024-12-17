import { ListingPage } from "@/components/ui/layouts/ListingPage";
import { User } from "@/database";
import { getUsers } from "@/lib/services/users";

const Page = async () => {
  const users = await getData();
  return (
    <div className="">
      <ListingPage profiles={users} />
    </div>
  );
};

export default Page;

async function getData(): Promise<User[]> {
  const users = await getUsers();
  if (!users) {
    throw new Error("Failed to fetch data");
  }
  return users;
}
