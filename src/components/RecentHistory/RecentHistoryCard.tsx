import type { Transaction } from "../../common/types";

interface TransactionProp {
  transaction: Transaction;
}

const RecentHistoryCard: React.FC<TransactionProp> = ({ transaction }) => {
  const truncate = (text: string | undefined, length = 9) => {
    if (!text || text.trim().length === 0) return "No Note";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <div className="grid grid-cols-7 gap-4 py-2 border-b text-sm items-center">
      <div>₹{transaction.amount}</div>
      <div title={transaction.note}>{truncate(transaction.note)}</div>
      <div title={transaction.receiverId}>
        {truncate(transaction.receiverId)}
      </div>
      <div title={transaction.senderId}>{truncate(transaction.senderId)}</div>
      <div title={transaction.transactionId}>
        {truncate(transaction.transactionId)}
      </div>
      <div>{transaction.type}</div>
      <div>{new Date(transaction.date).toLocaleString()}</div>
    </div>
  );
};

export default RecentHistoryCard;
