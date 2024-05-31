"use server";
import { z } from "zod";
import db from "@/app/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "../lib/sessions";

const emailOnly = "@zod.com";

const checkUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string()
      .min(5, "Username should be at least 5 characters long.")
      .refine(checkUsername, "This username is already taken"),
    email: z
      .string()
      .email()
      .endsWith(emailOnly, `Only ${emailOnly} emails are allowed.`)
      .refine(
        checkEmail,
        "There is an account already registered with that email."
      ),
    bio: z.string().max(100, "It's too long!"),
    password: z
      .string()
      .min(10, "Password should be at least 10 characters long.")
      .regex(
        /[0-9]/,
        "Password should contain at least one number (0123456789)."
      ),
    confirmPassword: z
      .string()
      .min(10, "Password should be at least 10 characters long.")
      .regex(
        /[0-9]/,
        "Password should contain at least one number (0123456789)."
      ),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function handleSingUpForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    bio: formData.get("bio"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
        bio: result.data.bio,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/");

    //console.log(user);

    // return {
    //   formErrors: [],
    //   fieldErrors: {
    //     username: [],
    //     password: ["Welcome Back!"],
    //   },
    // };
  }
}
