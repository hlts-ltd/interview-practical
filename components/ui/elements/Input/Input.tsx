import * as React from "react";
import type { FieldValues, UseFormTrigger } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Text } from "../Text";
import { PiWarningDiamondFill } from "react-icons/pi";

export type InputProps = {
  name?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  onCheckedChange?: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
  error?: string;
  trigger?: UseFormTrigger<FieldValues["x"]>;
  className?: string;
  value?: string;
};

type FormValidation = "success" | "error";

const formValidationClassMapper: Record<FormValidation, string> = {
  success: /*tw:*/ "border-success border-2 group-hover/input:border-success",
  error: /*tw:*/ "border-error border-2 group-hover/input:border-error",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      name,
      label,
      trigger,
      onChange,
      error,
      checked,
      placeholder,
      className,
      value,
      ...props
    },
    ref
  ) => {
    const [validation, setValidation] = React.useState<
      FormValidation | undefined
    >(undefined);
    return (
      <div className={twMerge("group/input my-4", className)}>
        <label
          htmlFor={`input-${name}`}
          className="mb-2.5 block text-muted-foreground"
        >
          {label}
        </label>

        <input
          ref={ref}
          type={type}
          name={name}
          id={`input-${name}`}
          placeholder={placeholder}
          checked={checked}
          onChange={onChange}
          value={value}
          className={twMerge(
            "w-full rounded border border-grey-400  p-2 duration-200 [appearance:textfield] placeholder:text-black focus:border-black  group-hover/input:border-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
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
