"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSong } from "@/lib/actions/song";
import { zodResolver } from "@hookform/resolvers/zod";
import { SongValidator, SongSchema } from "@/lib/validators/song";
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
  isOwner: boolean;
};

const AddSong = ({ isOwner }: Props) => {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<SongValidator>({
    resolver: zodResolver(SongSchema),
    defaultValues: {
      title: "",
      artist: "",
      genre: "",
      rating: 0,
    },
  });

  const onSubmit = (values: SongValidator) => {
    if (!isOwner) return;

    startTransition(async () => {
      await createSong(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);

            return;
          }

          toast.success(data.message);

          form.reset();

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
      <DialogTrigger className="flex items-center gap-2 text-sm">
        <Pencil className="w-4 h-4" />
        Create
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Song</DialogTitle>

          <DialogDescription>Create your favourite song</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="title..."
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
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artist</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="artist..."
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
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Jazz, pop etc..."
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
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={5}
                        placeholder="0-5 stars"
                        {...field}
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
                "Create"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSong;
