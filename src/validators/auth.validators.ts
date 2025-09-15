import { type SignUp } from "../common/types";
import * as Yup from "yup";


export const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string().required("Mobile is required"),
  panNumber: Yup.string().required("PanNumber is is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
  acceptPolicy: Yup.boolean().required(
    "Accepting the terms and conditions is required."
  ),
});



export const validateMail = (userDataValues: SignUp) => {
  const errors: Partial<SignUp> = {};
  const email = userDataValues.email.trim();

  if (email.includes("@")) {
    const domain = email.split("@")[1];
    if (domain !== "prominentpixel.com") {
      errors.email = "Only 'prominentpixel.com' email addresses are allowed.";
    }
  } else {
    errors.email = "Email must contain '@'.";
  }

  return errors;
};



export const validatePassword = (userDataValues: SignUp) => {
  const errors: Partial<SignUp> = {};
  const password = userDataValues.password.trim();
  if (!password) {
    errors.password = "Password is required";
  } else {
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must include at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must include at least one lowercase letter.";
    } else if (!/\d/.test(password)) {
      errors.password = "Password must include at least one number.";
    } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~/-]/.test(password)) {
      errors.password = "Password must include at least one special character.";
    }
  }
  return errors;
};


export const validateConfirmPassword = (userDataValues: SignUp) => {
  const errors: Partial<SignUp> = {};
  const confirmPassword = userDataValues.confirmPassword;
  if (!confirmPassword) {
    errors.confirmPassword = "Confirm Password is required.";
  } else if (userDataValues.password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
};

export const validatePanNumber = (userDataValues: SignUp) => {
  const errors: Partial<SignUp> = {};
  const panNumber = userDataValues.panNumber;

  if (!panNumber) {
    errors.panNumber = "Pan Number is required";
  } else {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNumber)) {
      errors.panNumber = "Invalid PAN number format";
    }
  }
  return errors;
};

export const validateMobile = (userDataValues: SignUp) => {
  const errors: Partial<SignUp> = {};
  const mobile = userDataValues.mobile;

  if (!mobile) {
    errors.mobile = "Mobile Number is required";
  } else {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      errors.mobile = "Invalid Mobile number";
    }
  }

  return errors;
};

export const validatePolicyTick = (userDataValues: SignUp) => {
  const errors: Partial<SignUp> = {};

  if (!userDataValues.acceptPolicy) {
    alert("Accepting the terms and conditions is required.");
  }

  return errors;
};
