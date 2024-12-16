"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { UserType } from "@/types";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserProfile } from "@/lib/actions/user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserValidator, UserSchema } from "@/lib/validators/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  user: UserType;
  isOwner: boolean;
};

const UpdateProfile = ({ user, isOwner }: Props) => {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<UserValidator>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      bio: user.bio || "",
    },
  });

  const onSubmit = (values: UserValidator) => {
    if (!isOwner) return;

    startTransition(async () => {
      await updateUserProfile(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);

            return;
          }

          toast.success(data.message);

          setOpen(false);
        })
        .catch((err) => {
          toast.error(
            err.message || "Something went wrong! internal server error."
          );
        });
    });
  };

  if (!isOwner) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2">
        <Pencil className="w-4 h-4" />
        Edit
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Avatar>
              <AvatarImage
                src={user.image || "https://github.com/shadcn.png"}
              />
            </Avatar>
          </DialogTitle>

          <DialogDescription>
            Edit your profile and make it more attractive.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="john"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="john"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Write something..."
                        {...field}
                        rows={4}
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="bg-muted w-[100px] flex items-center justify-center text-black hover:bg-muted-foreground font-bold"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
