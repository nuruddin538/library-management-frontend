import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-gray-700 font-bold text-2xl">
        Welcome to Library Management System
      </h1>
      <p className="text-gray-400 font-medium">
        Manage your library collection and track book borrows
      </p>
      <div className="space-x-4 mt-6">
        <Link
          to="/books"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
        >
          View All Books
        </Link>
        <Link
          to="/create-book"
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
        >
          Add New Book
        </Link>
      </div>
    </div>
  );
};
