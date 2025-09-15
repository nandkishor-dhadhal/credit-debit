import { Link } from "react-router-dom";
import type { Transaction } from "../../common/types";
import RecentHistoryList from "./RecentHistoryList";

export interface RecentHistoryProps {
  recentHistory: Transaction[];
}

const RecentHistory: React.FC<RecentHistoryProps> = ({ recentHistory }) => {
  return (
    <div className="border p-4 m-4 rounded-xl">
      <div className="flex justify-between items-center p-2 mb-4">
        <h1 className="text-3xl font-semibold">Recent History</h1>
        <Link to='transactions' replace className="text-blue-500 cursor-pointer">See all</Link>
      </div>

      <div className="p-2">
        {recentHistory && recentHistory.length > 0 ? (
          <RecentHistoryList transactions={recentHistory} />
        ) : (
          <div className="text-gray-500 text-center">No history found</div>
        )}
      </div>
    </div>
  );
};

export default RecentHistory;
