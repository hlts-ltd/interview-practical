import React from "react";
import Link from "next/link";
import { UserType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  user: UserType;
};

const UserCard = ({ user }: Props) => {
  return (
    <Link href={`/users/${user.id}`}>
      <Card className="bg-transparent text-white border-muted-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={user.image || "https://github.com/shadcn.png"}
              />
            </Avatar>

            <div className="space-y-1">
              <p className="tex-sm font-bold">
                {user.firstName} {user.lastName}
              </p>

              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </CardTitle>

          <CardDescription className="line-clamp-3">{user.bio}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export const UserCardSkeleton = () => {
  return (
    <Card className="bg-transparent text-white border-muted-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar>
            <Skeleton className="h-10 w-10 rounded-full" />
          </Avatar>

          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />

            <Skeleton className="h-3 w-24" />
          </div>
        </CardTitle>

        <CardDescription className="line-clamp-3">
          <Skeleton className="h-6 w-full" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
