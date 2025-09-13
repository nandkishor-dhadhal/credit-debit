import { useLoaderData } from "react-router-dom";
import RecentHistory from "../components/RecentHistory/RecentHistory";
import TransferMoney from "../components/TransferMoney";
import type { Transaction } from "../common/types";

interface HomePageLoaderData {
  recentHistory: Transaction[];
  availablebalance: number;
}

const HomePage = () => {
  const { recentHistory, availablebalance } =
    useLoaderData() as HomePageLoaderData;

  return (
    <div className="h-full w-full p-2">
      <div className="flex gap-4">
        <div className="flex-1">
          <TransferMoney availablebalance={availablebalance} />
        </div>
        <div className="flex-1">
          <RecentHistory recentHistory={recentHistory} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
