import {
  LoginForm,
  type LoginFormProps,
} from "@/components/ui/compositions/LoginForm";
import { Text } from "../../elements/Text";

type LoginProps = LoginFormProps & {
  title: string;
  formTitle: string;
  formInfo: string;
};

export const Login: React.FC<LoginProps> = ({
  formTitle,
  formInfo,
  formSuccessMsg,
  formErrorMsg,
  LoginHandler,
}) => {
  return (
    <div className="max-w-lg mx-auto my-8">
      <Text as="h2" size="h5" className="mt-5 text-5xl mb-4 font-bold ">
        {formTitle}
      </Text>

      <LoginForm
        formSuccessMsg={formSuccessMsg}
        formErrorMsg={formErrorMsg}
        LoginHandler={LoginHandler}
      />

      <Text as="p" size="body-150" className="mt-10 md:mt-6">
        {formInfo}
      </Text>
    </div>
  );
};
