import {
  SignUpForm,
  type SignUpFormProps,
} from "../../compositions/SignUpForm";
import { Text } from "../../elements/Text";

type SignUpProps = SignUpFormProps & {
  title: string;
  formTitle: string;
  formInfo: string;
};

export const SignUp: React.FC<SignUpProps> = ({
  formTitle,
  formInfo,
  formSuccessMsg,
  formErrorMsg,
  signUpHandler,
}) => {
  return (
    <div className="max-w-lg mx-auto my-8">
      <Text as="h2" size="h5" className=" text-4xl font-bold mt-5">
        {formTitle}
      </Text>

      <SignUpForm
        formSuccessMsg={formSuccessMsg}
        formErrorMsg={formErrorMsg}
        signUpHandler={signUpHandler}
        isModalOpen={false}
      />

      <Text as="p" size="body-150" className="mt-10 md:mt-6">
        {formInfo}
      </Text>
    </div>
  );
};
