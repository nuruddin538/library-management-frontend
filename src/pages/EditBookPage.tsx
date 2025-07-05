import type { IBook } from "../features/book/types";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../api/bookApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BookForm } from "../home/BookForm";

export const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading: isFetching } = useGetBookByIdQuery(id || "");
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: Partial<IBook>) => {
    if (!id) return;
    try {
      await updateBook({ id, changes: data }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/books");
    } catch (err) {
      toast.error("Failed to update book");
    }
  };

  if (isFetching) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <BookForm
        defaultValues={book}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};
