import { useAuth } from "../../context/authContext";
import { Link, useLocation } from "react-router-dom";
import AvailableMoney from "../balance/AvailableBalance";

interface TransferMoneyProps {
  availablebalance: number;
}

const TransferMoney: React.FC<TransferMoneyProps> = ({ availablebalance }) => {
  const location = useLocation();
  const { user } = useAuth();
  const actionError =
    (location.state as { error?: string } | null)?.error ?? null;

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
        <AvailableMoney availablebalance={availablebalance} />
        <div className="text-center p-2 m-2">
          <Link
            to="/transfer-money"
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
