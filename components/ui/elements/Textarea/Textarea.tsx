import * as React from "react";
import type { FieldValues, UseFormTrigger } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { twMerge } from "tailwind-merge";
import { PiWarningDiamondFill } from "react-icons/pi";
import { Text } from "../Text";

export type TextareaProps = {
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  trigger?: UseFormTrigger<FieldValues["x"]>;
  error?: string;
  className?: string;
};

type FormValidation = "success" | "error";

const formValidationClassMapper: Record<FormValidation, string> = {
  success: /*tw:*/ "border-success border-2 group-hover/input:border-success",
  error: /*tw:*/ "border-error border-2 group-hover/input:border-error",
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, label, trigger, onChange, error, className, ...props }, ref) => {
    const [validation, setValidation] = React.useState<
      FormValidation | undefined
    >(undefined);

    return (
      <div className={twMerge("group/input", className)}>
        <label
          htmlFor={`input-${name}`}
          className="mb-2 block text-subtitle-150"
        >
          {label}
        </label>

        <TextareaAutosize
          ref={ref}
          id={`input-${name}`}
          name={name}
          onChange={onChange}
          minRows={8}
          className={twMerge(
            "w-full rounded border border-grey-400  p-4 text-body-150 outline-black duration-200 focus:border-black group-hover/input:border-black",
            validation ? formValidationClassMapper[validation] : "",
            error ? formValidationClassMapper.error : ""
          )}
          {...props}
          onBlur={async () => {
            if (trigger) {
              const isFieldValid = await trigger(name);
              setValidation(isFieldValid ? "success" : "error");
            }
          }}
        />

        {error && (
          <Text
            as="span"
            className="mb-2.5 mt-1.5 flex min-h-6 gap-x-2 text-[#F87D7D]"
          >
            {error && (
              <>
                <PiWarningDiamondFill size={24} />
                {error}
              </>
            )}
          </Text>
        )}
      </div>
    );
  }
);
