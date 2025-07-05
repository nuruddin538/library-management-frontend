import type { IBorrowSummary } from "../features/borrow/types";

interface BorrowSummaryProps {
  summary: IBorrowSummary[];
}

export const BorrowSummary = ({ summary }: BorrowSummaryProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Book Title</th>
            <th className="py-2 px-4 border">ISBN</th>
            <th className="py-2 px-4 border">Total Quantity Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{item.bookTitle}</td>
              <td className="py-2 px-4 border">{item.isbn}</td>
              <td className="py-2 px-4 border">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
