import * as Yup from "yup";

// login form validations
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Required field"),
  password: Yup.string().required("Required field"),
});

// register form validations
export const registerValidationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Required field"),
  name: Yup.string()
    .max(20, "Name must be at most 20 characters")
    .min(2, "Name must be at least 2 characters")
    .required("Required field"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).*$/,
      "Password must have at least 1 uppercase letter and 1 number"
    )
    .required("Required field"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required field"),
});

// reset psw schema
export const resetPswValidationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Required field"),
});
