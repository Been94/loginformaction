"use client";
import { useFormState } from "react-dom";
import { TweetFormInputComponent } from "../components/TweetFormInput";
import { uploadTweet } from "./actions";

export default function TweetForm() {
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <>
      <form
        //action={logOut}
        action={action}
        className="flex justify-start w-full h-full mt-5"
      >
        <TweetFormInputComponent
          name="TweetMsg"
          required
          minLength={5}
          maxLength={100}
          errors={state?.fieldErrors.TweetMsg}
          type="text"
          svgPath1="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
        />
      </form>
    </>
  );
}
