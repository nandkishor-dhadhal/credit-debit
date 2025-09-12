import { useAuth } from "../../context/authContext";
import RecentHistoryList from "./RecentHistoryList";

const RecentHistory = () => {
  const { user } = useAuth();
  const balanceHistory = user?.transactions;

  return (
    <div className="border p-4 m-4 rounded-xl">
      <div className="flex justify-between items-center p-2 mb-4">
        <h1 className="text-3xl font-semibold">Recent History</h1>
        <h1 className="text-blue-500 cursor-pointer">See all</h1>
      </div>

      <div className="p-2">
        {balanceHistory && balanceHistory.length > 0 ? (
          <RecentHistoryList />
        ) : (
          <div className="text-gray-500 text-center">No history found</div>
        )}
      </div>
    </div>
  );
};

export default RecentHistory;
