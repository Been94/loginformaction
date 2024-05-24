"use server";
import { z } from "zod";
const emailOnly = "@zod.com";

const formSchema = z.object({
  username: z.string().min(5, "Username should be at least 5 characters long."),
  email: z
    .string()
    .email()
    .endsWith(emailOnly, `Only ${emailOnly} emails are allowed.`),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .regex(
      /[0-9]/,
      "Password should contain at least one number (0123456789)."
    ),
});

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    return {
      formErrors: [],
      fieldErrors: {
        username: [],
        password: ["Welcome Back!"],
      },
    };
  }
}
