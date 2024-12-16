import React from "react";
import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { SongSkeleton } from "@/components/song/Song";

const loading = () => {
  return (
    <Container>
      <div className="w-full flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-8 w-48" />

          <Skeleton className="h-4 w-64" />
        </div>

        <Skeleton className="h-4 w-[100px]" />
      </div>

      <Skeleton className="h-4 w-full mt-5" />

      <div className="mt-10 mb-5 flex items-center justify-between">
        <Skeleton className="h-8 w-48" />

        <Skeleton className="h-4 w-[100px]" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SongSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
};

export default loading;
