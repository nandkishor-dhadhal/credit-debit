import { useFormik } from "formik";
import type { Login } from "../common/types";
import { Link, useActionData, useNavigate, useSubmit } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

const LoginPage = () => {
  const submit = useSubmit();
  const auth = useAuth();
  const navigate = useNavigate();

  const actionData = useActionData() as
    | { token?: string; user?: never; error?: string }
    | undefined;

  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (actionData?.token && actionData.user) {
      auth.login(actionData.token, actionData.user);
      navigate("/", { replace: true });
    } else if (actionData?.error) {
      setServerError(actionData.error);
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
        {serverError && (
          <p className="text-red-500 text-sm text-center">{serverError}</p>
        )}
        <div className="flex flex-col">
          <label htmlFor="accountNumber">Account Number</label>
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
            <p className="text-red-500 text-xs">
              {formik.errors.accountNumber}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
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
            <p className="text-red-500 text-xs">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-2 border rounded cursor-pointer"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?
          <Link to="/signup" className="text-blue-700 pl-1 underline">
            Signup
          </Link>
        </p>
      </form>
      <h1 className="pl-27 pt-5">Admin : 25477596035297</h1>
    </div>
  );
};

export default LoginPage;
