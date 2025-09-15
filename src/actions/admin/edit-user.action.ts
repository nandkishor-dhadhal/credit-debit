import { FIREBASE_URL } from "../../services/api";
import type { User } from "../../common/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editUserAction = async ({ request, params }: any) => {
  const formData = await request.formData();

  const updatedUser: User = {
    accountNumber: params.accountNumber,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    mobile: formData.get("mobile") as string,
    panNumber: formData.get("panNumber") as string,
    availablebalance: Number(formData.get("availablebalance")),
    password: formData.get("password") as string,
  };

  const res = await fetch(
    `${FIREBASE_URL}/usersData/${params.accountNumber}.json`,
    {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return { success: false, message: "Failed to update user." };
  }

  return { success: true, message: "User updated successfully!" };
};
