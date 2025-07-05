import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../api/bookApi";
import type { IBook } from "../features/book/types";
import { toast } from "react-toastify";
import { BookForm } from "@/home/BookForm";

export const AddBookPage = () => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: Partial<IBook>) => {
    try {
      await createBook(data).unwrap();
      toast.success("Book created successfully!");
      navigate("/books");
    } catch (err) {
      toast.error("Failed to create book");
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <BookForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};
