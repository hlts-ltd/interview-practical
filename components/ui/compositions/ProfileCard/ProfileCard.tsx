"use client";

import * as React from "react";
import Image from "next/image";
import { Text } from "@/components/ui/elements/Text";
import { useRouter } from "next/navigation";

export type ProfileCardProps = {
  id?: string;
  userImage?: string;
  firstName: string;
  lastName: string;
  email: string;
  biography: string;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  biography,
  email,
  firstName,
  lastName,
  userImage,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/users/${id!}`);
  };

  return (
    <div
      className="flex border rounded-lg bg-white justify-center max-w-sm p-4"
      onClick={handleClick}
    >
      <div className="">
        <Image
          className={"w-full h-auto "}
          src={userImage!}
          alt={firstName}
          width={200}
          height={200}
        />
        <div className="font-semibold text-lg mt-3">
          <Text>{`${firstName} ${lastName}`}</Text>
        </div>
        <div className="mb-2 text-sm">{email}</div>
        <Text as="p" className="text-sm text-muted-foreground">
          {biography}
        </Text>
      </div>
    </div>
  );
};
