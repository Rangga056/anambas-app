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
import { FileImage, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

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
  publisher: z.string().min(1, { message: "Publisher name is required" }),
  date: z.date({
    required_error: "A date is required.",
  }),
  headerImg: z.any().refine((file) => {
    if (!file) return false;
    if (file.size > MAX_FILE_SIZE) return false;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return false;
    return true;
  }),
});

const HotNewsForm = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      form.setValue("headerImg", file); // Set the file in the form state

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/webp",
    maxSize: MAX_FILE_SIZE,
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
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="">
        <Form {...form} className="w-full h-full container">
          <form
            className="w-full space-y-6 mt-6 flex flex-col justify-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem
                  className="flex md:flex-row flex-col
                  items-start md:items-center"
                >
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
              name="publisher"
              render={({ field }) => (
                <FormItem
                  className="flex md:flex-row flex-col
                  items-start md:items-center"
                >
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
                <FormItem
                  className="flex md:flex-row flex-col
                  items-start md:items-center"
                >
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
                    <FormDescription>Published Date</FormDescription>
                  </div>
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="headerImg"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem
                  className="flex md:flex-row flex-col
                  items-start gap-y-2"
                >
                  <FormLabel className="body md:paragraph-2 w-full md:max-w-[200px] flex flex-col items-start">
                    <p>Foto Header</p>
                    <p className="text-black text-muted-foreground">
                      Foto yang akan tampil sebagai thumbnail dari berita
                    </p>
                  </FormLabel>
                  {imagePreview && (
                    <div className="flex-center w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="w-full h-auto object-cover object-center rounded-xl"
                      />
                    </div>
                  )}
                  <div
                    {...getRootProps()}
                    className={cn(
                      "w-full h-[120px] md:h-[280px] bg-gray-300 flex-center border border-dashed border-black p-4",
                      isDragActive && "bg-gray-400",
                      imagePreview &&
                        "md:ml-4 bg-transparent border-none cursor-pointer",
                    )}
                  >
                    <input {...getInputProps()} />
                    {uploadedFile ? (
                      <div className="flex-center">
                        <div className="w-fit border border-black flex-center p-3 rounded-xl">
                          <p className="body">
                            File uploaded: {uploadedFile.name}
                          </p>
                          <div className="flex-center">
                            <FileImage size={30} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-center gap-x-4">
                        <p className="text-center body">
                          Drag and drop an image file here, or click to select a
                          file.
                        </p>
                        <FileImage size={30} />
                      </div>
                    )}{" "}
                  </div>{" "}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-center">
              <Button type="submit" className="w-[200px]">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default HotNewsForm;
