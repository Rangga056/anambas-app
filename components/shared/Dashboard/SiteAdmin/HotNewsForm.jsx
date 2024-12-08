"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 5000000;

function checkFileType(file) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "jpg" || fileType === "png") return true;
  }
  return false;
}

// Zod form schema
const FormSchema = z.object({
  title: z
    .string()
    .min(8, {
      message: "Title must be at least 8 characters.",
    })
    .max(36, {
      message: "Title must not exceed 36 characters",
    }),
  subTitle: z.string().min(8, {
    message: "Title must be at least 8 characters.",
  }),
  publisher: z.string().min(1, { message: "Publisher name is required" }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  headerImg: z
    .any()
    .refine((file) => file?.length !== 0, "File is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
    .refine(
      (file) => checkFileType(file),
      "Only .jpg, .png formats are supported.",
    ),
  description: z
    .string()
    .min(60, { message: "Description need to be at least 60 characters" }),
});

const HotNewsForm = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      publisher: "",
      date: "",
      headerImg: "",
      description: "",
    },
  });

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="">
        <Form {...form} className="w-full h-full container">
          <form className="w-full space-y-6 mt-6 flex flex-col justify-center">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="body md:paragraph-2 w-full max-w-[200px]">
                    Judul
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      placeholder="Judul berita..."
                      {...field}
                      className="rounded-none border border-black h-[45px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subTitle"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="body md:paragraph-2 w-full max-w-[200px]">
                    Sub Judul{" "}
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      placeholder="Sub judul berita..."
                      type="text"
                      {...field}
                      className="rounded-none border border-black h-[45px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="body md:paragraph-2 w-full max-w-[200px]">
                    Penerbit{" "}
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      placeholder="Penerbit berita..."
                      type="text"
                      {...field}
                      className="rounded-none border border-black h-[45px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="body md:paragraph-2 w-full max-w-[200px]">
                    Tanggal{" "}
                  </FormLabel>
                  <div className="flex items-center gap-x-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                  </div>
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
export default HotNewsForm;
