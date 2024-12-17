import * as React from "react";
import { Text } from "@/components/ui/elements/Text";
import Image from "next/image";

export type HeaderCardProps = {
  name: string;
  email: string;
  userImage: string;
};

export const HeaderCard: React.FC<HeaderCardProps> = ({
  name,
  email,
  userImage,
}) => {
  return (
    <div className="w-full">
      <Image src={userImage} alt={name} width={200} height={200} className="" />
      <div>
        <Text as="p" className="text-5xl font-bold mt-3" size="h1-lg">
          {name}
        </Text>
        <Text as="p" className="text-sm" size="h1-sm">
          {email}
        </Text>
      </div>
    </div>
  );
};
