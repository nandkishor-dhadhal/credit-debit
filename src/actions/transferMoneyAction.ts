import { redirect } from "react-router-dom";
import { FIREBASE_URL } from "../services/api";
import { v4 as uuidv4 } from "uuid";
import type { Transaction } from "../common/types";

// Helper: ensure transactions entry exists in transactions DB
const ensureTransactionRecord = async (accountNumber: string) => {
  const res = await fetch(`${FIREBASE_URL}/transactions/${accountNumber}.json`);
  const data = await res.json();
  if (!data) {
    await fetch(`${FIREBASE_URL}/transactions/${accountNumber}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
  }
};

export const transferMoneyAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const receiverAccount = formData.get("accountNumber") as string;
  const amount = Number(formData.get("amount"));
  const note = (formData.get("note") as string) || "";

  const authUserData = localStorage.getItem("authUser");
  if (!authUserData) return redirect("/");

  const senderAccount = JSON.parse(authUserData).accountNumber;

  // Fetch sender and receiver data
  const [receiverRes, senderRes] = await Promise.all([
    fetch(`${FIREBASE_URL}/usersData/${receiverAccount}.json`),
    fetch(`${FIREBASE_URL}/usersData/${senderAccount}.json`),
  ]);

  const receiverData = await receiverRes.json();
  const senderData = await senderRes.json();

  if (!receiverData) {
    alert("Cannot send money to a non-existing user.");
    return redirect("/");
  }

  if ((senderData.availablebalance || 0) < amount) {
    alert("Insufficient balance.");
    return redirect("/");
  }

  // Ensure transactions record exists in separate DB for both users
  await Promise.all([
    ensureTransactionRecord(receiverAccount),
    ensureTransactionRecord(senderAccount),
  ]);

  const transactionId = uuidv4().replace(/-/g, "").substring(0, 10);
  const date = new Date().toISOString();

  const receiverTransaction: Transaction = {
    transactionId,
    note,
    senderId: senderAccount,
    receiverId: receiverAccount,
    amount,
    date,
    type: "CREDIT",
  };

  const senderTransaction: Transaction = {
    transactionId,
    note,
    senderId: senderAccount,
    receiverId: receiverAccount,
    amount,
    date,
    type: "DEBIT",
  };

  // Add transactions to separate transactions node
  await Promise.all([
    fetch(`${FIREBASE_URL}/transactions/${receiverAccount}/${transactionId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(receiverTransaction),
    }),
    fetch(`${FIREBASE_URL}/transactions/${senderAccount}/${transactionId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(senderTransaction),
    }),
  ]);

  // Update balances
  await Promise.all([
    fetch(`${FIREBASE_URL}/usersData/${receiverAccount}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        availablebalance: (receiverData.availablebalance || 0) + amount,
      }),
    }),
    fetch(`${FIREBASE_URL}/usersData/${senderAccount}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        availablebalance: (senderData.availablebalance || 0) - amount,
      }),
    }),
  ]);

  return redirect("/");
};
