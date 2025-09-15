import { useLoaderData, Await, useNavigation } from "react-router-dom";
import { Suspense } from "react";
import RecentHistory from "../../components/recent-history/RecentHistory";
import TransferMoney from "../../components/transfer/TransferMoneyForm";
import type { Transaction } from "../../common/types";

interface HomePageLoaderData {
  recentHistory: Promise<Transaction[]>;
  availablebalance: Promise<number>;
}

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64 space-y-4">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-300"></div>
    <p className="text-lg text-amber-300 animate-pulse">
      Loading your account data...
    </p>
  </div>
);


const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex flex-col items-center justify-center h-64 space-y-4">
    <div className="text-red-500 text-xl">⚠️</div>
    <p className="text-red-500">${error.message}</p>
    <button
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Retry
    </button>
  </div>
);

const HomePage = () => {
  const { recentHistory, availablebalance } =
    useLoaderData() as HomePageLoaderData;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="h-full w-full p-2">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <LoadingSpinner />
          </div>
        </div>
      )}

      <Suspense fallback={<LoadingSpinner />}>
        <Await
          resolve={Promise.all([recentHistory, availablebalance])}
          errorElement={
            <ErrorFallback error={new Error("Data loading failed")} />
          }
        >
          {([resolvedRecentHistory, resolvedAvailableBalance]) => (
            <div className="flex gap-4">
              <div className="flex-1">
                <TransferMoney availablebalance={resolvedAvailableBalance} />
              </div>
              <div className="flex-1">
                <RecentHistory recentHistory={resolvedRecentHistory} />
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default HomePage;
