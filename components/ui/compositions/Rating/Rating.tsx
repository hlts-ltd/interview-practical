import { memo } from "react";
import { listItems } from "@/lib/utils";
import { Star } from "lucide-react";

type StarProps = {
  score: number;
};

const Rating = ({ score }: StarProps) => {
  return (
    <div className="flex items-center">
      {listItems(5).map((_, index) => (
        <Star
          key={index}
          className="w-3 h-3"
          style={{ color: index < score ? "#878787" : "#CBCBCB" }}
        />
      ))}
    </div>
  );
};

export default memo(Rating);
