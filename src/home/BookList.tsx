import type { IBook } from "../features/book/types";
import { useDeleteBookMutation } from "../api/bookApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdBookmarkBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface BookListProps {
  books: IBook[];
}

export const BookList = ({ books }: BookListProps) => {
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    toast.info(
      <div className="p-4">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="my-2">Ary you sure you want to delete this book? </p>
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={() => {
              toast.dismiss();
              deleteBook(id)
                .unwrap()
                .then(() => toast.success("Book deleted successfully!"))
                .catch(() => toast.error("Failed to deleted book"));
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
        closeOnClick: false,
      }
    );
  };

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table min-w-full bg-white rounded-lg overflow-hidden shadow">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Author</th>
            <th className="py-3 px-4 text-left">Genre</th>
            <th className="py-3 px-4 text-left">ISBN</th>
            <th className="py-3 px-4 text-left">Copies</th>
            <th className="py-3 px-4 text-left">Available</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {books.map((book) => (
            <tr key={book._id} className="hover:bg-gray-50 transition">
              <td className="py-2 px-4">{book.title}</td>
              <td className="py-2 px-4">{book.author}</td>
              <td className="py-3 px-4">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {book.genre}
                </span>
              </td>
              <td className="py-2 px-4 font-mono">{book.isbn}</td>
              <td className="py-2 px-4">{book.copies}</td>
              <td className="py-2 px-4">
                {book.available ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    No
                  </span>
                )}
              </td>
              <td className="py-3 px-4 space-x-2">
                <Link
                  to={`/edit-book/${book._id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-blue-700 bg-white rounded hover:bg-blue-50 transition"
                >
                  <CiEdit />
                </Link>
                <Link
                  to={`/borrow/${book._id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-green-300 text-green-700 bg-white rounded hover:bg-green-50 transition"
                >
                  <MdBookmarkBorder />
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-700 bg-white rounded hover:bg-red-50 transition"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile Card */}
      <div className="md:hidden space-y-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {book.genre}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{book.author}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500">ISBN:</span>
                <p className="font-mono">{book.isbn}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Copies</span>
                <p>{book.copies}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Available:</span>
                {book.available ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    No
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Link
                to={`/edit-book/${book._id}`}
                className="flex-1 text-center px-3 py-1.5 border border-blue-300 text-blue-700 bg-white rounded hover:bg-blue-50 transition"
              >
                <CiEdit />
              </Link>
              <Link
                to={`/borrow/${book._id}`}
                className="flex-1 text-center px-3 py-1.5 border border-green-300 text-green-700 bg-white rounded hover:bg-green-50 transition"
              >
                <MdBookmarkBorder />
              </Link>
              <button
                onClick={() => handleDelete(book._id)}
                className="flex-1 text-center px-3 py-1.5 border border-red-300 text-red-700 bg-white rounded hover:bg-red-50 transition"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
