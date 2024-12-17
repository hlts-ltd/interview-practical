"use client";

import * as React from "react";
import { ProfileCard, ProfileCardProps } from "@/components/ui/compositions";
import { Input } from "../../elements";
import { Button } from "../../elements/Button/Button";

export type ListingPageProps = {
  profiles: ProfileCardProps[];
};

export const ListingPage: React.FC<ListingPageProps> = ({ profiles }) => {
  const [users, setUsers] = React.useState(profiles);
  const [currentPage, setCurrentPage] = React.useState(1);
  const profilesPerPage = 8;

  const totalPages = Math.ceil(users.length / profilesPerPage);

  const paginatedProfiles = users.slice(
    (currentPage - 1) * profilesPerPage,
    currentPage * profilesPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = profiles.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.biography.toLowerCase().includes(searchTerm)
    );
    setUsers(filteredUsers);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 ">User Profiles</h1>
      <div className="mb-6">
        <Input
          className="w-full"
          placeholder="Search users by name..."
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProfiles.map(
          (
            { biography, firstName, email, lastName, userImage, id },
            index: number
          ) => (
            <ProfileCard
              id={id}
              key={index}
              biography={biography}
              email={email}
              firstName={firstName}
              lastName={lastName}
              userImage={userImage}
            />
          )
        )}
      </div>

      {paginatedProfiles.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No users found.</p>
      )}

      <div className="flex justify-center items-center space-x-4 mt-8">
        <Button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          mode="previous"
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? " text-gray-500 cursor-not-allowed"
              : " text-white "
          }`}
          label="Previous"
        />
        <span className="text-gray-600">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </span>
        <Button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? " text-gray-500 cursor-not-allowed"
              : " text-white "
          }`}
          label="Next"
        />
      </div>
    </div>
  );
};
