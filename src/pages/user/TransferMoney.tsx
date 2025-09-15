import { useFormik } from "formik";
import { useActionData, useNavigate, useNavigation, useSubmit } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import * as Yup from "yup";

const TransferMoneyPage = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as { success?: boolean; message?: string };
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();

  const initialValues = {
    accountNumber: "",
    amount: "",
    note: "",
  };

  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account Number is required"),
    amount: Yup.number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
    note: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("accountNumber", values.accountNumber);
      formData.append("amount", values.amount);
      formData.append("note", values.note || "");
      submit(formData, { method: "post" });
    },
  });

  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.message || "Transfer successful!");
      navigate('/')
    } else if (actionData?.success === false) {
      toast.error(actionData.message || "Failed to transfer money.");
    }
  }, [actionData]);

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 max-w-md mx-auto p-4"
      >
        <div>
          <label className="block mb-1">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            className="w-full border p-2 rounded"
          />
          {formik.touched.accountNumber && formik.errors.accountNumber && (
            <div className="text-red-500 text-sm">
              {formik.errors.accountNumber}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            className="w-full border p-2 rounded"
          />
          {formik.touched.amount && formik.errors.amount && (
            <div className="text-red-500 text-sm">{formik.errors.amount}</div>
          )}
        </div>

        <div>
          <label className="block mb-1">Note (Optional)</label>
          <textarea
            name="note"
            value={formik.values.note}
            onChange={formik.handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 border rounded shadow transition ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isSubmitting ? "Sending..." : "Send Money"}
        </button>
      </form>
    </>
  );
};

export default TransferMoneyPage;
