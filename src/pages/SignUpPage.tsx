import { useFormik } from "formik";

import type { SignUp } from "../common/types";
import {
  validateConfirmPassword,
  validateMail,
  validateMobile,
  validatePanNumber,
  validatePassword,
  validationSchema,
} from "../validators/authValidators";
import { Link, useSubmit } from "react-router-dom";

const SignUpPage = () => {
  const submit = useSubmit();

  const initialValues: SignUp = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    panNumber: "",
    password: "",
    confirmPassword: "",
    acceptPolicy: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validate: (values) => {
      const errors: Partial<SignUp> = {};

      if (!values.acceptPolicy) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errors.acceptPolicy = "You must accept the terms and conditions" as any;
      }

      const emailErrors = validateMail(values);
      const passwordErrors = validatePassword(values);
      const confirmPasswordErrors = validateConfirmPassword(values);
      const panNumberErrors = validatePanNumber(values);
      const mobileErrors = validateMobile(values);

      if (emailErrors.email) {
        errors.email = emailErrors.email;
      }
      if (passwordErrors.password) {
        errors.password = passwordErrors.password;
      }
      if (confirmPasswordErrors.confirmPassword) {
        errors.confirmPassword = confirmPasswordErrors.confirmPassword;
      }
      if (panNumberErrors.panNumber) {
        errors.panNumber = panNumberErrors.panNumber;
      }
      if (mobileErrors.mobile) {
        errors.mobile = mobileErrors.mobile;
      }
      return errors;
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("password", values.password);
      formData.append("panNumber", values.panNumber);

      submit(formData, { method: "post" });
    },
  });

  return (
    <div className="max-w-md mx-auto  border-2 rounded-2xl mt-10 p-3">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex flex-col w-full">
            <label htmlFor="firstName" className="mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Rahul"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {formik.errors.firstName}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="lastName" className="mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Verma"
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {formik.errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onBlur={formik.handleBlur}
            placeholder="rahulverma@gmail.com"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs font-medium flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {formik.errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="mobile" className="mb-1">
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            onBlur={formik.handleBlur}
            placeholder="9510193337"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.mobile}
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <p className="text-red-500 text-xs font-medium flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {formik.errors.mobile}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="panNumber" className="mb-1">
            PAN Number
          </label>
          <input
            type="text"
            id="panNumber"
            onBlur={formik.handleBlur}
            name="panNumber"
            placeholder="JKDPD2071N"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.panNumber}
          />
          {formik.touched.panNumber && formik.errors.panNumber && (
            <p className="text-red-500 text-xs font-medium flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {formik.errors.panNumber}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              placeholder="********"
              className="w-full p-2 border rounded"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onBlur={formik.handleBlur}
              placeholder="********"
              className="w-full p-2 border rounded"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="acceptPolicy"
            name="acceptPolicy"
            className="form-checkbox"
            onChange={formik.handleChange}
            checked={formik.values.acceptPolicy}
          />
          <span>Agree to Terms and Conditions</span>
        </label>
        {formik.touched.acceptPolicy && formik.errors.acceptPolicy && (
          <p className="text-red-500 text-xs font-medium flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {formik.errors.acceptPolicy}
          </p>
        )}

        <button
          type="submit"
          className="w-full p-2 border rounded cursor-pointer"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account?
          <Link to='/login' type="button" className="text-blue-700 pl-1 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
