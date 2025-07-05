import { BookList } from "../home/BookList";
import { useGetBooksQuery } from "@/api/bookApi";
import { Notification } from "../home/Notification";

export const BookListPage = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading books</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Books</h1>
      {books && <BookList books={books} />}
      <Notification />
    </div>
  );
};
