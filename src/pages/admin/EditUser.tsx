import { Form, useLoaderData } from "react-router-dom";
import type { User } from "../../common/types";

const EditUser = () => {
  const { user } = useLoaderData() as { user: User };

  return (
    <div className="p-6 max-w-xl mx-auto">
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
          className="px-4 py-2 border rounded shadow hover:scale-105 transition"
        >
          Save Changes
        </button>
      </Form>
    </div>
  );
};

export default EditUser;
