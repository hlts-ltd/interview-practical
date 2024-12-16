"use client";

import React, { useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { Search, XIcon } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();

  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          name: value,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-3 border border-muted-foreground px-4 py-1.5 rounded-lg"
    >
      <input
        className="bg-transparent flex-1 rounded-none text-sm border-none outline-none ring-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Users..."
      />

      {value.length > 0 && (
        <button type="button" onClick={() => setValue("")}>
          <XIcon className="w-4 h-4" />
        </button>
      )}

      <button type="submit">
        <Search />
      </button>
    </form>
  );
};

export default SearchBar;
