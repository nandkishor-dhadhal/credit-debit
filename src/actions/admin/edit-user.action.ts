import { FIREBASE_URL } from "../../services/api";
import { redirect } from "react-router-dom";

export const editUserAction = async ({
  request,
  params,
}: {
  request: Request;
  params: any;
}) => {
  const formData = await request.formData();

  const updatedUser = Object.fromEntries(formData);

  await fetch(`${FIREBASE_URL}/usersData/${params.accountNumber}.json`, {
    method: "PATCH",
    body: JSON.stringify(updatedUser),
    headers: { "Content-Type": "application/json" },
  });

  return redirect("/admin/users");
};
