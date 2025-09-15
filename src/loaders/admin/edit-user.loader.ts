import { FIREBASE_URL } from "../../services/api";
import type { User } from "../../common/types";
import { redirect } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editUserLoader = async ({ params }: { params: any }) => {
  const authUserData = localStorage.getItem("user");
  if (!authUserData) return redirect("/login");

  const { accountNumber } = params;
  const res = await fetch(`${FIREBASE_URL}/usersData/${accountNumber}.json`);
  if (!res.ok) throw new Error("User not found");
  const user: User = await res.json();

  return { user };
};
