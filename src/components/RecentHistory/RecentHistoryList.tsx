import { useAuth } from "../../context/authContext";
import RecentHistoryCard from "./RecentHistoryCard";

const RecentHistoryList = () => {
  const { user } = useAuth();
  const balanceHistory = user?.transactions;

  return (
    <div className="max-w-md mx-auto">
      {balanceHistory?.map((transaction) => (
        <RecentHistoryCard 
          key={transaction.transactionId} 
          transaction={transaction} 
        />
      ))}
    </div>
  );
};

export default RecentHistoryList;
