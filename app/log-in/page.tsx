"use client";
import { useFormState } from "react-dom";
import { FormInputComponent } from "@/app/components/Form-Input";
import FormButton from "@/app/components/Form-btn";
import { InputTypeString, LogoComponent } from "@/app/etc";
import { handleForm } from "@/app/log-in/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [state, dispatch] = useFormState(handleForm, null);
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
              svgPath1="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
              placeholder="Password"
              name="password"
              type={InputTypeString.password}
              maxLength={30}
              required
              errors={state?.fieldErrors.password}
            />
            <FormButton text="Log in" />

            <div className="w-full h-full">
              <Link href="/create-account">
                <div className="w-full h-14 rounded-full px-4 bg-[#efeae8] cursor-pointer font-bold disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-white hover:bg-neutral-300 hover:transition-all flex justify-center items-center">
                  <span>CreateAccount</span>
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
