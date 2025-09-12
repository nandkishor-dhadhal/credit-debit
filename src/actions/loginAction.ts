import { FIREBASE_URL } from "../services/api";
import type { User } from "../common/types";

function generateToken() {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

export const loginAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const accountNumber = formData.get("accountNumber") as string;
  const password = formData.get("password") as string;

  if (!accountNumber || !password) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(`${FIREBASE_URL}/usersData/${accountNumber}.json`);
  const user: User | null = await res.json();

  if (!user || user.password !== password) {
    return new Response(
      JSON.stringify({ error: "Invalid account number or password" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const token = generateToken();
  const userWithToken = { ...user, token };

  localStorage.setItem("loggedInUser", JSON.stringify(userWithToken));

  return user;
};
