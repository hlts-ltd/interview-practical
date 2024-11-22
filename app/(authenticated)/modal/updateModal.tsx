import { Music } from "@/database";
import React, { useState } from "react";

interface ModalProps {
  data: Music;
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (musicName: string, file: File | null, id: string) => void;
  title?: string;
}

const UpdateModal: React.FC<ModalProps> = ({
  data,
  isVisible,
  onClose,
  onSubmit,
  title,
}) => {
  const [musicName, setMusicName] = useState<string>(data?.musicName as string);
  const [file, setFile] = useState<File | null>(null);

  if (!isVisible) return null;

  const handleSubmit = () => {
    onSubmit(musicName, file, data?.id as string);
    setMusicName("");
    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Music Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter music name"
            value={musicName}
            onChange={(e) => setMusicName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Upload File
          </label>
          <input
            type="file"
            className="w-full"
            accept=".mp3,.wav"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
