import { redirect } from "react-router-dom";
import { FIREBASE_URL } from "../services/api";
import type { User } from "../common/types";

export const signupAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const mobile = formData.get("mobile") as string;
  const panNumber = formData.get("panNumber") as string;
  const password = formData.get("password") as string;
  const availablebalance = 55555555;

  const accountNumber = Array.from({ length: 14 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  if (!firstName || !lastName || !email || !mobile || !panNumber || !password) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const existingUsersResponse = await fetch(`${FIREBASE_URL}/usersData.json`);
  const existingUsersData = await existingUsersResponse.json();
  const existingUsers: User[] = existingUsersData
    ? Object.values(existingUsersData)
    : [];

  const userExists = existingUsers.some((user) => user.email === email);
  if (userExists) {
    return new Response(
      JSON.stringify({ error: "User with this email already exists" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const newUser: User = {
    firstName,
    lastName,
    email,
    mobile,
    panNumber,
    password,
    accountNumber,
    transactions: {}, 
    availablebalance
  };

  await fetch(`${FIREBASE_URL}/usersData/${accountNumber}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  return redirect("/login");
};
