"use server";
import { z } from "zod";
import bcrypt from "bcrypt";
import db from "@/app/lib/db";
import getSession from "../lib/sessions";
import { redirect } from "next/navigation";

const emailOnly = "@zod.com";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .endsWith(emailOnly, `Only ${emailOnly} emails are allowed.`)
    .refine(checkEmailExists, "An account with this email does not exist."),
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
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "x"
    );

    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/");
    } else {
      return {
        formErrors: [],
        fieldErrors: {
          email: [],
          password: ["Wrong Password!"],
        },
      };
    }
  }
}
