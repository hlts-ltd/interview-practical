import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { User } from "lucide-react";
import Container from "./Container";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { getCurrentUser } from "@/lib/data/auth";

const Nav = async () => {
  const currentUser = await getCurrentUser();

  return (
    <nav className="h-14 flex items-center border-b border-muted-foreground">
      <Container className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">Take Home</h1>
        </Link>

        <div className="hidden md:inline flex-1 max-w-lg">
          <SearchBar />
        </div>

        {currentUser ? (
          <div className="flex items-center gap-2">
            <UserButton />

            <p className="text-sm font-semibold">
              {currentUser.firstName} {currentUser.lastName}
            </p>
          </div>
        ) : (
          <Link href="/auth/sign-in">
            <Button className="text-base flex gap-2">
              <User fill="#000" />
              Login
            </Button>
          </Link>
        )}
      </Container>
    </nav>
  );
};

export default Nav;
