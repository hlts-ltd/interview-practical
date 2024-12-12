import { useState } from "react";
import Image from "next/image";
import { User } from "../types/user";
import { toast } from "react-toastify";

type ProfileDetailsProps = {
  user: User;
};

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState<User>(user);

  const handleSaveDetails = async () => {
    try {
      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) throw new Error("Failed to update user details");

      const updatedUser = await response.json();
      setUserDetails(updatedUser);
      setIsEditing(false);
      toast.success("User details updated successfully!");
    } catch {
      toast.error("Failed to update user details.");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-6">
        <div className="w-36 h-36 relative rounded-full overflow-hidden border">
          <Image
            src={userDetails.profileImage || "https://via.placeholder.com/150"}
            alt={`${userDetails.name}'s profile`}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-6">
          <h1 className="text-3xl font-bold text-gray-800">{userDetails.name}</h1>
          <p className="text-gray-600">{userDetails.bio}</p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isEditing ? "Cancel" : "Edit Details"}
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveDetails();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={userDetails.bio}
              onChange={(e) =>
                setUserDetails({ ...userDetails, bio: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image URL
            </label>
            <input
              type="url"
              value={userDetails.profileImage || ""}
              onChange={(e) =>
                setUserDetails({ ...userDetails, profileImage: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
