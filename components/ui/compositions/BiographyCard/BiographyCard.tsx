import { Text } from "@/components/ui/elements/Text";
import React from "react";

export type BiographyCardProps = {
  biography: string;
};

export const BiographyCard: React.FC<BiographyCardProps> = ({ biography }) => {
  return (
    <div className="">
      <Text as="h2" size="h5" className="font-semibold text-lg my-2">
        Biography
      </Text>
      <Text className={"text-sm text-muted-foreground"} size="body-100">
        {biography}
      </Text>
    </div>
  );
};
