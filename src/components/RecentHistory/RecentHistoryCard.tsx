import type { Transaction } from "../../common/types";

interface TransactionProp {
  transaction: Transaction;
}

const RecentHistoryCard: React.FC<TransactionProp> = ({ transaction }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col space-y-2">
      <div className="text-lg font-semibold">
        Amount: ₹{transaction.amount}
      </div>
      <div className="text-gray-600">Note: {transaction.note}</div>
      <div className="text-gray-600">Receiver ID: {transaction.receiverId}</div>
      <div className="text-gray-600">Sender ID: {transaction.senderId}</div>
      <div className="text-gray-600">Transaction ID: {transaction.transactionId}</div>
      <div className="text-gray-600">Type: {transaction.type}</div>
      <div className="text-gray-500 text-sm">
        Date: {new Date(transaction.date).toLocaleString()}
      </div>
    </div>
  );
};

export default RecentHistoryCard;
