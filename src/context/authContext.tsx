import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";
import type { Transaction } from "../common/types";
import { FIREBASE_URL } from "../services/api";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  panNumber: string;
  accountNumber: string;
  availablebalance: number;
  transactions: Transaction[];
  token: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLogin: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLogin: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLogin = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

 
  useEffect(() => {
    if (user) {
      
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      const updateUserOnFirebase = async () => {
        try {
          const response = await fetch(
            `${FIREBASE_URL}/usersData/${user.accountNumber}.json`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            }
          );

          if (!response.ok) {
            console.error("Failed to update user in Firebase");
          }
        } catch (error) {
          console.error("Error updating user in Firebase:", error);
        }
      };

      updateUserOnFirebase();
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
