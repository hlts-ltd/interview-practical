import React from "react";
import { cn } from "@/lib/utils";
import { FaStar, FaRegStar } from "react-icons/fa6";

type Props = {
  rating: number;
  className?: string;
};

const Rating = ({ rating, className }: Props) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {new Array(5).fill("").map((_, index) => (
        <span key={index}>
          {rating >= index + 1 ? (
            <FaStar className="w-4 h-4 text-yellow-500" />
          ) : (
            <FaRegStar className="w-4 h-4 text-yellow-500" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
