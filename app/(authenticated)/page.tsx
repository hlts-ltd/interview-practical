"use client";
import { FC, useEffect, useState } from "react";
import Modal from "./modal/modal";
import { Music, User } from "@/database";
import {
  deleteMusic,
  findDetail,
  getUserMusic,
  updatedetail,
  updateUserMusic,
  uploadMusic,
} from "./action";
import UpdateModal from "./modal/updateModal";

const Page: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [value, setValue] = useState<User>();
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [music, setMusic] = useState<Music[]>([]);
  const [musicData, setMusicData] = useState<Music>();

  const profileEdit = () => {
    setEditProfile(!editProfile);
  };

  const handleSubmit = (musicName: string, file: File | null) => {
    if (file) {
      const data = { musicName: musicName, file: file.name, userId: id };
      uploadMusic(data);
      setUpdating(true);
    } else {
      console.log("No file selected");
    }
  };

  const handleUpdateMusic = (
    musicName: string,
    file: File | null,
    musicid: string
  ) => {
    if (file) {
      const data = { musicName: musicName, file: file.name, id: musicid };
      updateUserMusic(data);
      setUpdating(true);
    } else {
      console.log("No file selected");
    }
  };

  useEffect(() => {
    const getCookieValue = (name: string) => {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? decodeURIComponent(match[2]) : null;
    };

    // Retrieve the "session" cookie value
    const sessionValue = getCookieValue("session");
    const decoded = atob(sessionValue as string); // Decode Base64 string
    const json = JSON.parse(decoded);
    setValue(json?.user);
    setName(json?.user?.name);
    setBio(json?.user?.bio);
    setEmail(json?.user?.email);
    setPhone(json?.user?.phone);
    setId(json?.user?.id);
  }, [id, updating]);

  useEffect(() => {
    const getCookieValue = (name: string) => {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? decodeURIComponent(match[2]) : null;
    };

    // Retrieve the "session" cookie value
    const sessionValue = getCookieValue("session");
    const decoded = atob(sessionValue as string); // Decode Base64 string
    const json = JSON.parse(decoded);

    setId(json?.user?.id);
    const fetchUser = async () => {
      try {
        // Assuming findDetail returns a Promise
        const user = await findDetail(json?.user?.id as string); // Await the promise here
        setValue(user);
        setName(user?.name as string);
        setBio(user?.bio as string);
        setEmail(user?.email as string);
        setPhone(user?.phone as string);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchMusic = async () => {
      try {
        const musicValue = await getUserMusic(json?.user?.id as string); // Await the promise here
        setMusic(musicValue);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchMusic();

    if (updating) {
      fetchUser();
    }
  }, [id, updating]);

  const updateDetail = () => {
    const user = { name, email, bio, phone, id };
    updatedetail(user as User);
    setUpdating(true);
    setEditProfile(!editProfile);
  };

  const modalOpen = (data: Music) => {
    setIsUpdateModalVisible(true);
    setMusicData(data);
  };

  const downloadJSON = () => {
    // Create a Blob from the music array in JSON format
    const jsonBlob = new Blob([JSON.stringify(music, null, 2)], {
      type: "application/json",
    });

    // Create a temporary download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(jsonBlob);
    link.download = "favorite_music.json"; // Name of the downloaded file
    link.click(); // Trigger the download
  };

  return (
    <>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-black">Favourite Music</h2>
          <div className="justify-end">
            {editProfile ? (
              <>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none mr-3"
                  onClick={() => updateDetail()}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 bg-red-900 text-white rounded focus:outline-none mr-3"
                  onClick={() => profileEdit()}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none mr-3"
                  onClick={() => profileEdit()}
                >
                  Edit Profile
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none mr-3"
                  onClick={() => setIsModalVisible(true)}
                >
                  Add Music
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                  onClick={downloadJSON}
                >
                  Download Music
                </button>
              </>
            )}
          </div>
          <Modal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSubmit={handleSubmit}
            title="Upload Music"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-gray-800 rounded-lg shadow-md p-4">
            <table className="w-full text-left">
              <thead className="text-gray-400">
                <tr key="index">
                  <th className="py-2">Music name</th>
                  <th className="py-2">File</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {music.map((musicmap, index) => (
                  <tr key={index} className="hover:bg-gray-700">
                    <td className="py-3 flex items-center">
                      <span>{musicmap?.musicName || "-"}</span>
                    </td>
                    <td>
                      <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                        {musicmap?.file || "-"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none mr-3"
                        onClick={() => modalOpen(musicmap)}
                      >
                        Update
                      </button>
                      <button
                        className="px-4 py-2 bg-red-900 text-white rounded focus:outline-none mr-3"
                        onClick={() => deleteMusic(musicmap?.id as string)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <UpdateModal
            data={musicData as Music}
            isVisible={isUpdateModalVisible}
            onClose={() => setIsUpdateModalVisible(false)}
            onSubmit={handleUpdateMusic}
            title="Update Music Detail"
          />
          {/* Profile Section */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <picture>
                <img
                  src={value?.profilePic || "/profile.jpg"}
                  alt="Profile"
                  className="rounded-full w-24 h-24 mb-4"
                />
              </picture>
              {editProfile ? (
                <input
                  type="name"
                  name="name"
                  value={name}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Enter name"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ) : (
                <h3 className="text-xl font-semibold text-white">
                  {value?.name}
                </h3>
              )}
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-medium text-white">About</h4>
              {editProfile ? (
                <input
                  type="text"
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  id="bio"
                  placeholder="Description"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ) : (
                <p className="text-gray-400 mt-2 text-sm">
                  {value?.bio || "-"}
                </p>
              )}
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-medium text-white">
                Contact Information
              </h4>
              <p className="text-gray-400 mt-2 text-sm">
                <span className="font-semibold">Email:</span>{" "}
                {editProfile ? (
                  <>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="Enter email"
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
                    />
                  </>
                ) : (
                  value?.email || "-"
                )}{" "}
                <br />
                <span className="font-semibold">Phone:</span>{" "}
                {editProfile ? (
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="phone"
                    placeholder="Enter Phone Number"
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                ) : (
                  value?.phone || "-"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
