import { useBorrowBookMutation } from "../api/borrowApi";
import { useGetBookByIdQuery } from "../api/bookApi";
import { BorrowForm } from "../home/BorrowForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const BorrowBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading: isFetching } = useGetBookByIdQuery(id || "");
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const handleSubmit = async (data: { quantity: number; dueDate: string }) => {
    // console.log("Parent submit triggered", data);

    if (!id || !book) return;

    // console.log("Calling borrowBook API with", { bookId: id, ...data });

    try {
      await borrowBook({ bookId: id, ...data }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err) {
      toast.error("Failed to borrow book");
    }
  };
  if (isFetching) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1>Borrow Book: {book.title}</h1>
      <div className="max-w-md mx-auto">
        <BorrowForm
          maxQuantity={book.copies}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
