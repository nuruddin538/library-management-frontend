import { useForm } from "react-hook-form";
import type { IBook } from "../features/book/types";
import { toast } from "react-toastify";

interface BookFormProps {
  defaultValues?: IBook;
  onSubmit: (data: Partial<IBook>) => Promise<void> | void;
  isLoading: boolean;
}

export const BookForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: BookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IBook>>({
    defaultValues,
  });

  const handleFormSubmit = async (data: Partial<IBook>) => {
    try {
      await onSubmit(data);
      toast.success("Book saved successfully!");
    } catch (error) {
      toast.error("Failed to save book. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block text-gray-700">Author</label>
        <input
          {...register("author", { required: "Author is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.author && (
          <p className="text-red-500">{errors.author.message}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700">Genre</label>
        <input
          {...register("genre", { required: "Genre is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
      </div>
      <div>
        <label className="block text-gray-700">ISBN</label>
        <input
          {...register("isbn", { required: "ISBN is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.isbn && <p className="text-red-500">{errors.isbn.message}</p>}
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Copies</label>
        <input
          type="number"
          {...register("copies", {
            required: "Copies is required",
            min: { value: 0, message: "Copies cannot be negative" },
          })}
          className="w-full p-2 border rounded"
        />
        {errors.copies && (
          <p className="text-red-500">{errors.copies.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading ? "Saving..." : "Save Book"}
      </button>
    </form>
  );
};
