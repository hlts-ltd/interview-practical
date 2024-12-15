import { Suspense } from "react";
import { getUsers } from "@/lib/data/users";
import Container from "@/components/Container";
import SearchBar from "@/components/SearchBar";
import UserCard, { UserCardSkeleton } from "@/components/UserCard";

export default async function Home({
  searchParams: { name },
}: {
  searchParams: { name: string };
}) {
  const users = await getUsers(name);

  return (
    <Suspense
      fallback={
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <Container>
        <div className="w-full md:hidden mb-5">
          <SearchBar />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </Container>
    </Suspense>
  );
}
