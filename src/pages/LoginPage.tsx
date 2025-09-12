import { useFormik } from "formik";
import type { Login } from "../common/types";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import * as Yup from "yup";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

const LoginPage = () => {
  const submit = useSubmit();
  const auth = useAuth();
  const navigate = useNavigate();
  const actionData = useActionData();
  useEffect(() => {
    if (actionData) {
      auth.login(actionData);
      navigate("/", { replace: true });
    }
  }, [actionData]);
  const initialValues: Login = {
    accountNumber: "",
    password: "",
  };

  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account Number is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("accountNumber", values.accountNumber);
      formData.append("password", values.password);

      submit(formData, { method: "post" });
    },
  });

  return (
    <div className="max-w-md mx-auto border-2 rounded-2xl mt-40 p-5">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="accountNumber" className="mb-1">
            Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            placeholder="87356473867163"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.accountNumber}
            className="w-full p-2 border rounded"
          />
          {formik.touched.accountNumber && formik.errors.accountNumber && (
            <p className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {formik.errors.accountNumber}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full p-2 border rounded"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {formik.errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-2 border rounded cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
