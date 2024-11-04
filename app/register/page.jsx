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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Register } from "@/lib/actions/auth/user.actions";

// Zod form schema
const FormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    username: z
      .string()
      .min(8, {
        message: "Username must be at least 8 characters.",
      })
      .max(36, {
        message: "Username must not exceed 36 characters",
      }),
    password: z.string().min(8),
    verifyPassword: z.string().min(8),
    role: z.enum(["siteadmin", "districtadmin"], {
      required_error: "You need to select a role.",
    }),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Passwords do not match",
    path: ["verifyPassword"],
  });

const RegisterPage = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [verifiyPasswordType, setVerifiyPasswordType] = useState("password");

  const { toast } = useToast();

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const toggleVerifyPassword = () => {
    if (verifiyPasswordType === "password") {
      setVerifiyPasswordType("text");
      return;
    }
    setVerifiyPasswordType("password");
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      verifyPassword: "",
      role: "",
    },
  });

  async function onSubmit(data) {
    try {
      const result = await Register(data);

      if (result.success) {
        toast({
          title: "Registration Successful!",
          description: "You have registered successfully.",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex-center min-h-[100dvh] w-full lg:bg-none bg-hero-beach-img bg-cover bg-center">
      <div className="flex-center gap-x-4 container p-0 md:px-8">
        <div className="hidden lg:flex lg:w-1/2 w-full bg-hero-beach-img bg-cover bg-center h-[90svh] max-h-[770px] rounded-xl" />
        <div className="lg:w-1/2 w-full mx-6 p-6 sm:px-0 sm:w-4/5 flex-center flex-col bg-white py-6 rounded-3xl z-10 shadow-md lg:shadow-none max-h-[100vh]">
          <Form {...form} className="w-full h-full min-w-[455px]">
            {/* LOGO */}
            <div className="w-full flex justify-start items-center gap-x-3 max-w-[455px]">
              <div className="w-10 aspect-square rounded-full bg-black" />
              <span className="uppercase header-4 md:header-3">logo</span>
            </div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-[455px] space-y-2 md:space-y-4 mt-4 md:mt-6 flex flex-col justify-center"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body md:paragraph-3">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@gmail.com"
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body md:paragraph-3">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
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
                    <FormLabel className="flex-between body md:paragraph-3">
                      Password{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
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
              <FormField
                control={form.control}
                name="verifyPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="flex-between body md:paragraph-3">
                      Verify Password{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="verify password"
                        type={verifiyPasswordType}
                        {...field}
                        className="rounded-2xl h-[45px]"
                      />
                    </FormControl>
                    <span
                      disabled={false}
                      className="absolute bg-transparent hover:bg-transparent text-blue text-xl p-3 rounded-lg uppercase w-10  right-1 top-6 cursor-pointer"
                      onClick={toggleVerifyPassword}
                    >
                      {verifiyPasswordType === "password" ? (
                        <FaEye />
                      ) : (
                        <FaEyeSlash />
                      )}
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="text-center">
                    <FormLabel className="body md:paragraph-3">
                      Select Role
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex-center gap-x-3 pb-2"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="siteadmin" />
                          </FormControl>
                          <FormLabel className="text-sm md:paragraph-3">
                            Site Admin
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="districtadmin" />
                          </FormControl>
                          <FormLabel className="text-sm md:paragraph-3">
                            District Admin
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="rounded-2xl w-full h-[45px] body md:paragraph-3 bg-blue text-white hover:bg-white hover:text-blue hover:border border-blue active:scale-95 transition-all delay-250 ease-linear"
              >
                Sign Up
              </Button>
              <Link
                href={"/login"}
                className="w-full flex-center body md:paragraph-2 text-center"
              >
                <p>
                  {" "}
                  Already Have an Account Sign in
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
      </div>
    </div>
  );
};

export default RegisterPage;
