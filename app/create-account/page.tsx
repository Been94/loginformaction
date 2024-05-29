"use client";
import { useFormState } from "react-dom";
import { FormInputComponent } from "@/app/components/Form-Input";
import FormButton from "@/app/components/Form-btn";
import { InputTypeString, LogoComponent } from "@/app/etc";
import { handleSingUpForm } from "@/app/create-account/actions";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(handleSingUpForm, null);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="w-96 h-96 bg-transparent">
          <form
            action={dispatch}
            className="grid grid-rows-311  h-full w-full gap-5"
          >
            <LogoComponent />
            <FormInputComponent
              key="email"
              svgPath1="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
              svgPath2="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
              placeholder="Email"
              name="email"
              maxLength={30}
              type={InputTypeString.email}
              required
              errors={state?.fieldErrors.email}
            />
            <FormInputComponent
              key="username"
              svgPath1="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              placeholder="Username"
              name="username"
              maxLength={30}
              type={InputTypeString.text}
              required
              errors={state?.fieldErrors.username}
            />
            <FormInputComponent
              key="password"
              svgPath1="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
              placeholder="Password"
              name="password"
              type={InputTypeString.password}
              maxLength={30}
              required
              errors={state?.fieldErrors.password}
            />

            <FormInputComponent
              key="confirmPassword"
              svgPath1="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
              placeholder="Confirm Password"
              name="confirmPassword"
              type={InputTypeString.password}
              maxLength={30}
              required
              errors={state?.fieldErrors.confirmPassword}
            />

            <FormInputComponent
              key="bio"
              svgPath1="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              placeholder="Introduce yourself in one line, Simple :)"
              name="bio"
              maxLength={100}
              type={InputTypeString.text}
              required
              errors={state?.fieldErrors.bio}
            />

            <FormButton text="SignUp" />
          </form>
          <div
            onClick={() => router.back()}
            className="w-full h-14 rounded-full px-4 bg-[#efeae8] cursor-pointer font-bold mt-32 flex justify-center items-center hover:bg-neutral-300 hover:transition-all"
          >
            <span>Back</span>
          </div>
        </div>
      </div>
    </>
  );
}
