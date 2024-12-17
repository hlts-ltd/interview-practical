import { FC } from 'react';
import { signup } from './signup.action';
import { SignUp } from "@/components/ui/layouts/SignUp";

const Page: FC = () => {
  return (
    <>
      <SignUp
        formErrorMsg="Invalid details"
        formSuccessMsg="Sign up successful"
        formInfo=""
        formTitle="SIGN UP"
        title=""
        signUpHandler={signup}
        isModalOpen={false}
      />
    </>
  );
};

export default Page;
