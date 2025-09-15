import type { Transaction } from "../../common/types";
import RecentHistoryCard from "./RecentHistoryCard";

interface RecentHistoryListProps {
  transactions: Transaction[];
}

const RecentHistoryList: React.FC<RecentHistoryListProps> = ({
  transactions,
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-7 gap-4 font-semibold border-b pb-2">
        <div>Amount</div>
        <div>Note</div>
        <div>Receiver</div>
        <div>Sender</div>
        <div>ID</div>
        <div>Type</div>
        <div>Date</div>
      </div>
      {transactions.map((transaction) => (
        <RecentHistoryCard
          key={transaction.transactionId}
          transaction={transaction}
        />
      ))}
    </div>
  );
};

export default RecentHistoryList;
