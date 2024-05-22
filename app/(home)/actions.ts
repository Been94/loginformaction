"use server";

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("logged in!");

  const reqPassword = formData.get("password");
  if (reqPassword === "12345") {
    return { success: ["Welcome Back!"] };
  } else {
    return {
      errors: ["wrong password"],
    };
  }
}
