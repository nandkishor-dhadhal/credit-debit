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
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  panNumber: string;
  password: string;
  accountNumber: string;
  transactions: Record<string, Transaction>; 
  availablebalance: number;
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

export interface Login {
  accountNumber: string;
  password: string;
}
