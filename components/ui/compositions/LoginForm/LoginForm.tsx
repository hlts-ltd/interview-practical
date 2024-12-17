"use client";

import * as React from "react";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { PiWarningCircle, PiCheckCircle } from "react-icons/pi";
import { Input } from "../../elements/Input";
import { Text } from "../../elements/Text";
import { Button } from "@/components/ui/elements/Button/Button";

type LoginFormInputs = {
  password: string;
  email: string;
};

export type LoginFormProps = {
  formSuccessMsg: string;
  formErrorMsg: string;
  LoginHandler: Function;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  formSuccessMsg,
  formErrorMsg,
  LoginHandler,
}) => {
  const {
    control,
    trigger,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const [formState, setFormState] = React.useState<
    "error" | "success" | undefined
  >(undefined);

  const submitHandler = handleSubmit(async (payload) => {
    setFormState(undefined);
    const res = await LoginHandler({
      ...payload,
    });

    if (res.data?.type === "success") {
      setFormState("success");
      redirect("/users");
    } else {
      console.error("Error submitting form", res);
      setFormState("error");
    }
  });

  return (
    <form onSubmit={submitHandler} noValidate>
      <Controller
        name="email"
        control={control}
        rules={{
          required: "This field is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            type="email"
            label="Email address"
            {...field}
            trigger={trigger}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "This field is required",
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            type="password"
            label="Password"
            {...field}
            trigger={trigger}
            error={error?.message}
          />
        )}
      />

      {formState !== "success" && (
        <Button
          label={isSubmitting ? "Submitting..." : "Submit"}
          type="submit"
        />
      )}
      <p
        onClick={() => redirect("/auth/signup")}
        className="cursor-pointer ml-8"
      >
        Sign up
      </p>

      {formState && (
        <Text
          size="subtitle-150"
          className={`flex gap-2 md:text-h5 [&>svg]:shrink-0 ${
            formState === "success"
              ? "[&>svg]:text-success"
              : "mt-10 md:mt-6 [&>svg]:text-error"
          }`}
        >
          {formState === "success" ? (
            <>
              <PiCheckCircle size={32} />
              {formSuccessMsg}
            </>
          ) : (
            <>
              <PiWarningCircle size={32} />
              {formErrorMsg}
            </>
          )}
        </Text>
      )}
    </form>
  );
};
