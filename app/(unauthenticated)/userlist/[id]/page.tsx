"use client";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Music, User } from "@/database";
import { findDetail, getMusicByUser } from "./detail.action";

const Page: FC = () => {
  const { id } = useParams();

  const [userById, setUserById] = useState<User>();
  const [musicByUser, setMusicByUser] = useState<Music[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        // Assuming findDetail returns a Promise
        const user = await findDetail(id as string); // Await the promise here
        const music = await getMusicByUser(id as string); // Await the promise here
        setUserById(user);
        setMusicByUser(music);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-auto self-start mt-20 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-black">Favourite Music</h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-gray-800 rounded-lg shadow-md p-4">
          <table className="w-full text-left">
            <thead className="text-gray-400">
              <tr>
                <th className="py-2">Music name</th>
                <th className="py-2">File</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {musicByUser.map((music, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="py-3 flex items-center">
                    <span>{music?.musicName}</span>
                  </td>
                  <td>
                    <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                      {music?.file}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            <picture>
              <img
                src={userById?.profilePic}
                alt="Profile"
                className="rounded-full w-24 h-24 mb-4"
              />
            </picture>
            <h3 className="text-xl font-semibold text-white">
              {userById?.name}
            </h3>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-medium text-white">About</h4>
            <p className="text-gray-400 mt-2 text-sm">{userById?.bio || "-"}</p>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-medium text-white">
              Contact Information
            </h4>
            <p className="text-gray-400 mt-2 text-sm">
              <span className="font-semibold">Email:</span>{" "}
              {userById?.email || "-"} <br />
              <span className="font-semibold">Phone:</span>{" "}
              {userById?.phone || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
