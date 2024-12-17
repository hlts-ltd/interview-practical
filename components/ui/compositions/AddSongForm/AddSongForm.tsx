"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { PiWarningCircle, PiCheckCircle } from "react-icons/pi";
import { Input } from "../../elements/Input";
import { Text } from "../../elements/Text";
import { isInputEmptyCheck } from "@/lib/utils/isInputEmptyCheck";
import { Button } from "@/components/ui/elements/Button/Button";
import { useUser } from "@/hooks";
import { useRouter } from "next/navigation";

type AddSongFormInputs = {
  id?: string;
  title: string;
  artist: string;
  genre: string;
  rating: string;
  userId: string;
};

export type AddSongFormProps = {
  formSuccessMsg: string;
  formErrorMsg: string;
  addSongHandler?: Function;
  updateSongHandler?: Function;
  defaultValues?: Partial<AddSongFormInputs>;
};

export const AddSongForm: React.FC<AddSongFormProps> = ({
  formSuccessMsg,
  formErrorMsg,
  addSongHandler,
  updateSongHandler,
  defaultValues,
}) => {
  const router = useRouter();
  const session = useUser();

  const {
    control,
    trigger,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AddSongFormInputs>({
    defaultValues: {
      title: "",
      artist: "",
      genre: "",
      rating: "",
      userId: session?.id,
      ...defaultValues,
    },
  });

  const [formState, setFormState] = React.useState<
    "error" | "success" | undefined
  >(undefined);

  React.useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title || "",
        artist: defaultValues.artist || "",
        genre: defaultValues.genre || "",
        rating: defaultValues.rating || "",
        userId: session?.id,
      });
    }
  }, [defaultValues, reset, session?.id]);

  const submitHandler = handleSubmit(async (payload) => {
    setFormState(undefined);
    let res;
    if (updateSongHandler && defaultValues) {
      res = await updateSongHandler({
        ...payload,
        id: defaultValues.id,
      });
    } else {
      res = await (addSongHandler as Function)({ ...payload });
    }

    if (res.data?.type === "success") {
      setFormState("success");
      router.refresh();
    } else {
      console.error("Error submitting form", res);
      setFormState("error");
    }
  });

  return (
    <form onSubmit={submitHandler} noValidate className=" p-4 rounded-lg">
      <Controller
        name="title"
        control={control}
        rules={{
          required: "This field is required",
          validate: { isEmpty: (v) => isInputEmptyCheck(v) },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Title"
            {...field}
            trigger={trigger}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="artist"
        control={control}
        rules={{
          required: "This field is required",
          validate: { isEmpty: (v) => isInputEmptyCheck(v) },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Artist"
            {...field}
            trigger={trigger}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="genre"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Genre"
            {...field}
            trigger={trigger}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="rating"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field, fieldState: { error } }) => (
          <Input
            type="number"
            label="Rating"
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
          className="mt-4"
        />
      )}

      {formState && (
        <Text
          size="subtitle-150"
          className={`flex gap-2 mt-4 ${
            formState === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {formState === "success" ? (
            <>
              <PiCheckCircle size={20} />
              {formSuccessMsg}
            </>
          ) : (
            <>
              <PiWarningCircle size={20} />
              {formErrorMsg}
            </>
          )}
        </Text>
      )}
    </form>
  );
};
