import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

const UserNavbar = () => {
  const [active, setActive] = useState<string>("dashboard");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const buttonHandler = (id: string) => {
    setActive(id);
    if (id === "dashboard") {
      navigate("/");
    } else if (id === "history") {
      navigate("/transactions");
    } else {
      logout();
    }
  };

  const getButtonClass = (id: string, baseColor: string) => {
    const activeClass = active === id ? "ring-4 ring-offset-2" : "";
    return `border-2 p-3 rounded-3xl cursor-pointer ${baseColor} hover:${baseColor} ${activeClass}`;
  };

  return (
    <nav className="flex items-center justify-between p-4 pt-5 border-">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="text-3xl font-bold cursor-pointer"
      >
        VaultPay
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4 gap-2">
        <button
          id="dashboard"
          onClick={() => buttonHandler("dashboard")}
          className={getButtonClass(
            "dashboard",
            "bg-green-500 hover:bg-green-600"
          )}
        >
          Dashboard
        </button>

        <button
          id="history"
          onClick={() => buttonHandler("history")}
          className={getButtonClass("history", "bg-blue-500 hover:bg-blue-600")}
        >
          History
        </button>

        <button
          id="logout"
          onClick={() => buttonHandler("logout")}
          className={getButtonClass("logout", "bg-red-500 hover:bg-red-600")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
