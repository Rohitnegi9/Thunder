import * as z from "zod";

const emailSchema = z.preprocess(
  (value) =>
    typeof value === "string" ? value.trim().toLowerCase() : "",
  z.email("Email must be valid")
);

const passwordSchema = z
  .string()
  .min(8, "Password must have at least 8 characters")
  .max(30, "Password must have at most 30 characters")
  .regex(/[A-Z]/, "Password needs an uppercase letter")
  .regex(/[a-z]/, "Password needs a lowercase letter")
  .regex(/[0-9]/, "Password needs a number")
  .regex(
    /[~?@.,<>,{}:'!^#()&-+]/,
    "Password needs a special character"
  );

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must have at least 3 characters")
    .max(30, "Name must have at most 30 characters"),

  age: z.preprocess(
    (value) => {
      if (value === "" || value === undefined || value === null) {
        return undefined;
      }

      return Number(value);
    },
    z.number().min(10, "Minimum age is 10").max(100, "Maximum age is 100").optional()
  ),

  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

