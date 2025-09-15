import { redirect } from "react-router-dom";
import { FIREBASE_URL } from "../../services/api";
import { v4 as uuidv4 } from "uuid";
import type { Transaction } from "../../common/types";

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

export const transferMoneyAction = async ({
  request,
}: {
  request: Request;
}) => {
  const formData = await request.formData();

  const receiverAccount = formData.get("accountNumber") as string;
  const amount = Number(formData.get("amount"));
  const note = (formData.get("note") as string) || "";

  const authUserData = localStorage.getItem("user");
  if (!authUserData) return redirect("/login");

  const senderAccount = JSON.parse(authUserData).accountNumber;
  if (senderAccount === receiverAccount) {
    return { success: false, message: "You cannot send money to your own account." };
  }

  const [receiverRes, senderRes] = await Promise.all([
    fetch(`${FIREBASE_URL}/usersData/${receiverAccount}.json`),
    fetch(`${FIREBASE_URL}/usersData/${senderAccount}.json`),
  ]);

  const receiverData = await receiverRes.json();
  const senderData = await senderRes.json();

  if (!receiverData) {
    return { success: false, message: "Receiver account does not exist." };
  }

  if ((senderData.availablebalance || 0) < amount) {
    return { success: false, message: "Insufficient available balance." };
  }

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

  await Promise.all([
    fetch(
      `${FIREBASE_URL}/transactions/${receiverAccount}/${transactionId}.json`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receiverTransaction),
      }
    ),
    fetch(
      `${FIREBASE_URL}/transactions/${senderAccount}/${transactionId}.json`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(senderTransaction),
      }
    ),
  ]);

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

  return { success: true, message: "Money transferred successfully!" };
};
