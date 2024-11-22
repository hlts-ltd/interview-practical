"use client";
import { FC, useEffect, useState } from "react";
import { User } from "@/database";
import Link from "next/link";
import { finduserbyname, userlist } from "./userlist.action";

const Page: FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [name, setName] = useState<string>();
  const fetchUser = async () => {
    try {
      const user = await userlist(); // Await the promise here
      setUserList(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchByName = async (name: string) => {
    try {
      const user = await finduserbyname(name); // Await the promise here
      setUserList(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (name) {
      fetchByName(name);
    } else {
      fetchUser();
    }
  }, [name]);

  return (
    <div className="flex-auto self-start mt-20">
      <div className="flex justify-center pb-2">
        <input
          type="text"
          placeholder="Search"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="container mx-auto">
        <div className="col-span-2 bg-gray-800 rounded-lg shadow-md p-4">
          <table className="w-full text-left">
            <thead className="text-gray-400">
              <tr>
                {/* <th className="py-2">Profile Picture</th> */}
                <th className="py-2">User name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {userList.map((user, index) => (
                <tr key={index}>
                  {/* <td className="py-3 flex items-center">
                      <span>{user?.profilePic}</span>
                    </td> */}
                  <td>
                    <span>{user?.name || "-"}</span>
                  </td>
                  <td>
                    <span>{user?.email || "-"}</span>
                  </td>
                  <td>
                    <span>{user?.phone || "-"}</span>
                  </td>
                  <td>
                    <Link href={`/userlist/${user?.id}`}>
                      <button className="text-blue-500 hover:underline">
                        Detail
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
