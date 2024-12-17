"use client";

import * as React from "react";
import { useState } from "react";
import { Logout } from "@/components/Logout";
import { UserCircleIcon } from "lucide-react";
import { Modal } from "../Modal";
import { SignUpForm, type SignUpFormInputs } from "../SignUpForm";

export type NavigationProps = {
  name: string;
  updateUserHandler: Function;
  defaultValues: Partial<SignUpFormInputs>;
};

export const Navigation: React.FC<NavigationProps> = ({
  name,
  updateUserHandler,
  defaultValues,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="flex justify-between items-center p-6 border-b relative">
      <p className="text-lg">
        Welcome, <span className="font-bold">{name}!</span>
      </p>

      <div className="relative">
        <button onClick={toggleDropdown} aria-label="Toggle user menu">
          <UserCircleIcon className="h-8 w-8 cursor-pointer" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
            <ul className="flex flex-col text-gray-800">
              <li className="hover:bg-gray-100 p-3 cursor-pointer">
                <Logout />
              </li>
              <li className="hover:bg-gray-100 p-3 cursor-pointer">
                <div className="text-lg" onClick={handleOpenModal}>
                  Settings
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <SignUpForm
          updateUserHandler={updateUserHandler}
          isModalOpen={isModalOpen}
          formErrorMsg="Something went wrong"
          formSuccessMsg="Successfully updated user profile"
          defaultValues={defaultValues}
        />
      </Modal>
    </div>
  );
};
