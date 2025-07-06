import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface BorrowFormProps {
  maxQuantity: number;
  onSubmit: (data: { quantity: number; dueDate: string }) => void;
  isLoading: boolean;
}

export const BorrowForm = ({
  maxQuantity,
  onSubmit,
  isLoading,
}: BorrowFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    quantity: number;
    dueDate: string;
  }>();
  const minDate = format(new Date(), "yyyy-MM-dd");

  const defaultDueDate = format(addDays(new Date(), 7), "yyyy-MM-dd");

  const onFormSubmit = async (data: { quantity: number; dueDate: string }) => {
    // console.log("Form Submitted", data);
    try {
      await onSubmit(data);
      toast.success(
        <div>
          <h3 className="font-bold">Success!</h3>
          <p>
            {data.quantity} book(s) borrowed until{" "}
            {format(new Date(data.dueDate), "MMM dd, yyy")}
          </p>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      toast.error(
        <div>
          <h3 className="font-bold">Error!</h3>
          <p>Failed to borrow books. Please try</p>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-gray-700">Quantity</label>
        <input
          type="number"
          {...register("quantity", {
            required: "Quantity is required",
            min: { value: 1, message: "Minimum 1 copy" },
            max: {
              value: maxQuantity,
              message: `Maximum ${maxQuantity} copies available`,
            },
          })}
          className="w-full p-2 border rounded"
        />
        {errors.quantity && (
          <p className="w-full p-2 border rounded">{errors.quantity.message}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700">Due Date</label>
        <input
          type="date"
          {...register("dueDate", {
            required: "Due date is required",
            min: { value: minDate, message: "Due date must be in the futur" },
          })}
          min={minDate}
          defaultValue={defaultDueDate}
          className="w-full p-2 border rounded"
        />
        {errors.dueDate && (
          <p className="text-red-500">{errors.dueDate.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-green-600 cursor-pointer text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-green-300"
      >
        {isLoading ? "Processing..." : "Borrow Book"}
      </button>
    </form>
  );
};
