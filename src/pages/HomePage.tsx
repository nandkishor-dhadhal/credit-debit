import RecentHistory from "../components/RecentHistory/RecentHistory";
import TransferMoney from "../components/TransferMoney";

const HomePage = () => {
  return (
    <div className=" h-full w-full p-2">
      <div className="flex gap-4">
        <div className="flex-1">
          <TransferMoney />
        </div>
        <div className="flex-1">
          <RecentHistory />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
