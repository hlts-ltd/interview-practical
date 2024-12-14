"use client";

import Link from "next/link";
import { FC } from "react";
import { Logout } from "@/components/Logout";

interface HeaderProps {
  session: { user: { name: string } } | false;
}

const Header: FC<HeaderProps> = ({ session }) => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-xl font-bold hover:underline">
          HAIDI
        </Link>
        <nav className="flex space-x-4 items-center">
          <Link
            href="/users"
            className="hover:underline hover:text-gray-300 transition"
          >
            All Users
          </Link>

          {session ? (
            <>
              <span className="text-gray-300">
                Welcome, <strong>{session.user.name}</strong>!
              </span>
              <Logout />
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hover:underline hover:text-gray-300 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="hover:underline hover:text-gray-300 transition"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
