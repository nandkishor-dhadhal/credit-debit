import { useState } from "react";
import { useAuth } from "../context/authContext";

interface AvailableMoneyProps {
  availablebalance: number;
}

const AvailableMoney: React.FC<AvailableMoneyProps> = ({
  availablebalance,
}) => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleShowClick = () => {
    if (!user) return alert("User not loaded yet");
    setShowPasswordInput(true);
    setPassword("");
    setError("");
  };

  const handleVerifyPassword = () => {
    if (user) {
      if (password === user.password) {
        setShowBalance(true);
        setShowPasswordInput(false);
      } else {
        setError("Wrong password, try again");
      }
    }
  };

  const handleHideClick = () => {
    setShowBalance(false);
  };

  return (
    <div className="flex flex-col p-4 border rounded-xl w-80">
      <h1 className="text-xl font-semibold">Available Balance</h1>

      <div className="flex items-center gap-4 pt-4">
        {showBalance ? (
          <>
            <h1 className="text-2xl font-bold">₹ {availablebalance}</h1>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleHideClick}
            >
              Hide
            </button>
          </>
        ) : showPasswordInput ? (
          <div className="flex flex-col gap-2 w-full">
            <input
              type="password"
              className="border rounded px-2 py-1 w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerifyPassword()}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleVerifyPassword}
              >
                Verify
              </button>
              <button
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowPasswordInput(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold">₹ ********</h1>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleShowClick}
            >
              Show
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AvailableMoney;
