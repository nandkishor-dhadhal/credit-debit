import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useLocation } from "react-router-dom";

const TransferMoney = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [showBalance, setShowBalance] = useState(false);

  const actionError = (location.state as { error?: string })?.error || null;

  const balance = user?.availablebalance;

  const balanceButtonHandler = () => {
    if (!showBalance) {
      const pin = prompt("Enter Password");
      if (pin === user?.password) {
        setShowBalance(!showBalance);
        return;
      } else {
        alert("Wrong Password");
        return;
      }
    }
    setShowBalance(!showBalance);
  };

  return (
    <div className="border p-4 m-2 rounded-xl">
      {actionError && (
        <div className="bg-red-200 text-red-800 p-3 m-2 rounded-lg">
          ⚠️ {actionError}
        </div>
      )}

      <div className="flex justify-between">
        <div className="m-3 p-3">
          <h1 className="text-3xl">Hello, {user?.firstName}</h1>
          <h3>Here is Your Financial Overview</h3>
        </div>

        <div className="flex justify-between items-center p-2">
          <div>
            <h1>Account Number</h1>
            <h1>{user?.accountNumber.toString()}</h1>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-2 border rounded-xl">
          <div className="p-2 m-2">
            <h1 className="text-xl">Available Balance</h1>
            <div className="flex gap-8 pt-4">
              {showBalance ? (
                <>
                  <h1 className="pt-1 text-2xl">₹ {balance}</h1>
                  <button
                    className="border p-2 rounded cursor-pointer bg-green-500 hover:bg-green-600"
                    onClick={balanceButtonHandler}
                  >
                    Hide
                  </button>
                </>
              ) : (
                <>
                  <h1 className="pt-1 text-2xl">₹ ********</h1>
                  <button
                    className="border p-2 rounded cursor-pointer bg-red-500 hover:bg-red-600"
                    onClick={balanceButtonHandler}
                  >
                    Show
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="text-center p-2 m-2">
          <Link
            to="transfer-money"
            replace
            className="border p-3 rounded cursor-pointer bg-orange-400 hover:bg-orange-500"
          >
            Transfer Money ↗️
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransferMoney;
