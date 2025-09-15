import {
  Form,
  useLoaderData,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import type { User } from "../../common/types";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const { user } = useLoaderData() as { user: User };
  const navigation = useNavigation();
  const actionData = useActionData() as { success?: boolean; message?: string };
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.message || "User updated successfully!");
      navigate('/admin/users');
    } else if (actionData?.success === false) {
      toast.error(actionData.message || "Failed to update user.");
    }
  }, [actionData]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Edit User</h2>
      <Form method="post" className="space-y-4">
        <input
          type="text"
          name="firstName"
          defaultValue={user.firstName}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          defaultValue={user.lastName}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          defaultValue={user.email}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="mobile"
          defaultValue={user.mobile}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="panNumber"
          defaultValue={user.panNumber}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="availablebalance"
          defaultValue={user.availablebalance}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="password"
          defaultValue={user.password}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 border rounded shadow transition ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isSubmitting ? "Saving changes..." : "Save Changes"}
        </button>
      </Form>
    </div>
  );
};

export default EditUser;
