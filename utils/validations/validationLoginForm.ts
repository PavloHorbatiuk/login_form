import * as Yup from "yup";

export const validateSchema = Yup.object().shape({
  username: Yup.string()
    .required("This field is required")
    .matches(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/, "Without numbers"),
  password: Yup.string()
    .required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    // .matches(
    //   /(?=.*[a-z])(?=.*[A-Z])\w+/,
    //   "Password ahould contain at least one uppercase and lowercase character"
    // )
    .matches(/\d/, "Password should contain at least one number"),
  // .matches(
  //   /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
  //   "Password should contain at least one special character"
  // ),
});
