"use client";

import * as React from "react";
import { redirect, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { PiWarningCircle, PiCheckCircle } from "react-icons/pi";
import { Input } from "../../elements/Input";
import { Text } from "../../elements/Text";
import { Textarea } from "../../elements/Textarea";
import { isInputEmptyCheck } from "@/lib/utils/isInputEmptyCheck";
import { Button } from "@/components/ui/elements/Button/Button";

export type SignUpFormInputs = {
  id?: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  biography: string;
};

export type SignUpFormProps = {
  formSuccessMsg: string;
  formErrorMsg: string;
  signUpHandler?: Function;
  isModalOpen: boolean;
  updateUserHandler?: Function;
  defaultValues?: Partial<SignUpFormInputs>;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({
  formSuccessMsg,
  formErrorMsg,
  signUpHandler,
  updateUserHandler,
  isModalOpen,
  defaultValues,
}) => {
  const router = useRouter();

  const {
    control,
    trigger,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SignUpFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      biography: "",
      id: "",
      ...defaultValues,
    },
  });

  const [formState, setFormState] = React.useState<
    "error" | "success" | undefined
  >(undefined);

  React.useEffect(() => {
    if (defaultValues) {
      reset({
        firstName: defaultValues.firstName || "",
        lastName: defaultValues.lastName || "",
        biography: defaultValues.biography || "",
      });
    }
  }, [defaultValues, reset]);

  const submitHandler = handleSubmit(async (payload) => {
    setFormState(undefined);

    const res = isModalOpen
      ? await (updateUserHandler as Function)({
          ...payload,
          id: defaultValues?.id,
        })
      : await (signUpHandler as Function)({
          ...payload,
        });

    if (res.data?.type === "success") {
      setFormState("success");
      !isModalOpen && redirect("/auth/login");
      isModalOpen && router.refresh();
    } else {
      console.error("Error submitting form", res);
      setFormState("error");
    }
  });

  return (
    <form onSubmit={submitHandler} noValidate>
      <Controller
        name="firstName"
        control={control}
        rules={{
          required: "This field is required",
          validate: {
            isEmpty: (v) => isInputEmptyCheck(v),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="First name"
            {...field}
            trigger={trigger}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        rules={{
          required: "This field is required",
          validate: {
            isEmpty: (v) => isInputEmptyCheck(v),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Last name"
            {...field}
            trigger={trigger}
            error={error?.message}
          />
        )}
      />

      {!isModalOpen && (
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
      )}

      {!isModalOpen && (
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
      )}

      <Controller
        name="biography"
        control={control}
        rules={{
          required: "This field is required",
          validate: {
            isEmpty: (v) => isInputEmptyCheck(v),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Textarea
            label="Biography"
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
      {!isModalOpen && (
        <p
          onClick={() => redirect("/auth/login")}
          className="cursor-pointer ml-8"
        >
          Sign in
        </p>
      )}
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
