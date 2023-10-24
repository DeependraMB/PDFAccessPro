import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("First name is required")
    .matches(/^[^\s\d]+$/, "Spaces and numbers are not allowed in first name")
    .matches(/^[A-Za-z]+$/, "First name should only contain letters"),

  gender: yup.string().required("Gender is required"),

  phno: yup
    .string()
    .required("Mobile Number is required")
    .matches(
      /^[1-9]\d{9}$/,
      "Mobile number must be exactly 10 digits and not start with zero"
    )
    .test("no-repeated-digits", "Repeated digits are not allowed", (value) => {
      const repeatingPattern = /(.)\1{9}/; // Matches repeated digits 10 times
      return !repeatingPattern.test(value);
    })
    .matches(/^\S*$/, "Spaces are not allowed in the mobile number"),

  email: yup
    .string()
    .required("Email address is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
export default validationSchema;
