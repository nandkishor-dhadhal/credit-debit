import { useLoaderData } from "react-router-dom";
import AllTransactionDetailCard from "./TransactionsCard";
import type { Transaction } from "../../../common/types";

const AllTransactionDetail = () => {
  const { transactionDetails } = useLoaderData() as {
    transactionDetails: Transaction[];
  };

  return (
    <div className="p-2 m-2">
      <AllTransactionDetailCard transactions={transactionDetails} />
    </div>
  );
};

export default AllTransactionDetail;
