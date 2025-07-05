import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold hover:text-blue-200 transition-colors"
          >
            Library Management
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/books"
              className="text-xl font-bold hover:text-blue-200 transition-colors"
            >
              All Books
            </Link>
            <Link
              to="/create-book"
              className="text-xl font-bold hover:text-blue-200 transition-colors"
            >
              Add Book
            </Link>
            <Link
              to="/borrow-summary"
              className="text-xl font-bold hover:text-blue-200 transition-colors"
            >
              Borrow Summary
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-2 pb-3 space-y-2">
            <Link
              to="/books"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md bg-blue-700 text-white"
            >
              All Books
            </Link>
            <Link
              to="/create-book"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md bg-blue-700 text-white"
            >
              Add Book
            </Link>
            <Link
              to="/borrow-summary"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md bg-blue-700 text-white"
            >
              Borrow Summary
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
