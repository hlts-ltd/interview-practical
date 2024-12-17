import { FavoriteSongsProps } from "../types/user";


export default function FavoriteSongs({
  songs,
  editingSong,
  onEdit,
  onSave,
  onRemove,
  canEdit
}: FavoriteSongsProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Favorite Songs</h2>
      {songs.length > 0 ? (
        <ul className="space-y-4">
          {songs.map((song) =>
            editingSong && editingSong.id === song.id ? (
              <li key={song.id} className="p-4 bg-gray-100 rounded-lg shadow border space-y-2">
                <input
                  type="text"
                  value={editingSong.title}
                  onChange={(e) => onEdit({ ...editingSong, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={editingSong.artist}
                  onChange={(e) => onEdit({ ...editingSong, artist: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Artist"
                      />
                <input
                  type="text"
                  placeholder="Genre"
                  value={editingSong.genre}
                  onChange={(e) => onEdit({ ...editingSong, genre: e.target.value })}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="number"
                  placeholder="Rating (1-5)"
                  value={editingSong.rating}
                  onChange={(e) =>
                    onEdit({ ...editingSong, rating: parseInt(e.target.value) })
                    }
                  className="border p-2 rounded w-full"
                  required
                  min="1"
                  max="5"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => onSave(editingSong)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => onEdit(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ) : (
              <li key={song.id} className="p-4 bg-gray-100 rounded-lg shadow border">
                <h3 className="text-lg font-bold text-gray-800">{song.title}</h3>
                <p className="text-gray-600">Artist: {song.artist}</p>
                <p className="text-gray-600">Genre: {song.genre}</p>
                <p className="text-gray-600">Rating: {song.rating}</p>
               {canEdit && 
               <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => onEdit(song)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRemove(song.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
                }
              </li>
            )
          )}
        </ul>
      ) : (
        <p className="text-gray-600">No favorite songs listed.</p>
      )}
    </div>
  );
}
