import { BorrowSummary } from "@/home/BorrowSummary";
import { useGetBorrowSummaryQuery } from "../api/borrowApi";

export const BorrowSummaryPage = () => {
  const { data: summary, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading borrow summary</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>
      {summary && <BorrowSummary summary={summary} />}
    </div>
  );
};
