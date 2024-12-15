"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { SongType } from "@/types";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SongValidator, SongSchema } from "@/lib/validators/song";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateSong } from "@/lib/actions/song";

type Props = {
  song: SongType;
  isOwner: boolean;
  open: boolean;
  setOpen: () => void;
};

const UpdateSong = ({ song, open, setOpen, isOwner }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SongValidator>({
    resolver: zodResolver(SongSchema),
    defaultValues: {
      title: song.title || "",
      artist: song.artist || "",
      genre: song.genre || "",
      rating: song.rating || 0,
    },
  });

  const onSubmit = (values: SongValidator) => {
    if (!isOwner) return;

    startTransition(async () => {
      await updateSong({ songId: song.id, values })
        .then((data) => {
          if (data.error) {
            toast.error(data.error);

            return;
          }

          toast.success(data.message);

          setOpen();
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Song</DialogTitle>

          <DialogDescription>Edit your song details.</DialogDescription>
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
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSong;
