export type TransactionType = "CREDIT" | "DEBIT";

export interface Transaction {
  transactionId: string;
  note?: string;
  senderId: string;
  receiverId: string;
  amount: number;
  date: string;
  type: TransactionType;
}

export interface User {
  accountNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password : string;
  panNumber: string;
  availablebalance: number;
}


export interface LoaderData {
  user?: User;
  transactions?: Transaction[];
  users?: Record<string, User>;
}


export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export interface Login {
  accountNumber: string;
  password: string;
}

export interface LoginActionResponse {
  token: string;
  user: User;
}

export interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  panNumber: string;
  password: string;
  confirmPassword: string;
  acceptPolicy: boolean;
}
