"use client";

import { FaEyeSlash, FaEye } from "react-icons/fa";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import Link from "next/link";

// Zod form schema
const FormSchema = z.object({
  username: z
    .string()
    .min(8, {
      message: "Username must be at least 8 characters.",
    })
    .max(36, {
      message: "Username must not exceed 36 characters",
    }),
  password: z.string().min(1),
});

const LoginPage = () => {
  const [passwordType, setPasswordType] = useState("password");
  const { toast } = useToast();

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data) {
    // TODO: Change to fetch POST login to API
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
    <div className="flex-center min-h-[100dvh] w-full lg:bg-none bg-hero-beach-img bg-cover bg-center">
      <div className="flex-center gap-x-4 container p-0 md:px-8">
        <div className="lg:w-1/2 w-full mx-6 p-6 sm:px-0 sm:w-4/5 flex-center flex-col bg-white py-16 rounded-3xl z-10 shadow-md lg:shadow-none">
          <Form {...form} className="w-full h-full min-w-[455px]">
            {/* LOGO */}
            <div className="w-full flex justify-start items-center gap-x-3 max-w-[455px]">
              <div className="w-10 md:w-12 aspect-square rounded-full bg-black" />
              <span className="uppercase header-3 md:header-2 ">logo</span>
            </div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-[455px] space-y-6 mt-6 flex flex-col justify-center"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="paragraph-3">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        className="rounded-2xl h-[45px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="flex-between paragraph-3">
                      Password{" "}
                      <Link
                        href={"dashboard/login/forgot-password"}
                        className="text-neutral-700 opacity-85 hover:text-black hover:opacity-100 transition-colors delay-150 "
                      >
                        Forgot?
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={passwordType}
                        {...field}
                        className="rounded-2xl h-[45px]"
                      />
                    </FormControl>
                    <span
                      disabled={false}
                      className="absolute bg-transparent hover:bg-transparent text-blue text-xl p-3 rounded-lg uppercase w-10  right-1 top-6 cursor-pointer"
                      onClick={togglePassword}
                    >
                      {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="rounded-2xl w-full h-[45px] paragraph-3 md:paragraph-2 bg-blue text-white hover:bg-white hover:text-blue hover:border border-blue active:scale-95 transition-all delay-250 ease-linear"
              >
                Login
              </Button>
              <Link
                href={"/dashboard/register"}
                className="w-full flex-center body md:paragraph-2 text-center"
              >
                <p>
                  {" "}
                  Don’t Have an Account Register
                  <Button
                    variant="link"
                    className="text-blue body md:paragraph-2 px-2 active:scale-95 transition-transform delay-250 ease-linear underline"
                  >
                    Here
                  </Button>
                </p>
              </Link>
            </form>
          </Form>
        </div>
        <div className="hidden lg:flex lg:w-1/2 w-full bg-hero-beach-img bg-cover bg-center h-[90svh] max-h-[770px] rounded-xl" />
      </div>
    </div>
  );
};

export default LoginPage;
