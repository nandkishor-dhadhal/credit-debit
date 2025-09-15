import { useFormik } from "formik";
import { useSubmit } from "react-router-dom";
import * as Yup from "yup";

const TransferMoneyPage = () => {
  const submit = useSubmit();

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

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
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
          <div className="text-red-500 text-sm">{formik.errors.accountNumber}</div>
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
        className="bg-blue-500 text-white p-2 rounded"
      >
        Transfer
      </button>
    </form>
  );
};

export default TransferMoneyPage;



