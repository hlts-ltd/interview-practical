import { FC } from "react";
import { login } from "./login.action";
import { Login } from "@/components/ui/layouts/Login";

const Page: FC = () => {
  return (
    <>
      <Login
        formErrorMsg="Invalid username or password"
        formSuccessMsg="Successfully logged in"
        formInfo=""
        formTitle="SIGN IN"
        title=""
        LoginHandler={login}
      />
    </>
  );
};

export default Page;
