import { Await, useLoaderData, useNavigation } from "react-router-dom";
import AllTransactionDetailCard from "./TransactionsCard";
import type { Transaction } from "../../../common/types";
import { Suspense } from "react";
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
const AllTransactionDetail = () => {
  const { transactionDetails } = useLoaderData() as {
    transactionDetails: Transaction[];
  };
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
          resolve={transactionDetails}
          errorElement={
            <ErrorFallback error={new Error("Data loading failed")} />
          }
        >
          {(resolveTransactionDetails) => (
            <div className="p-2 m-2">
              <AllTransactionDetailCard
                transactions={resolveTransactionDetails}
              />
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default AllTransactionDetail;
