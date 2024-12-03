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
import { Login } from "@/lib/actions/user.actions"; // Updated import path if necessary
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/authStore"; // Adjust the import path based on your folder structure
import { Loader2 } from "lucide-react";

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
  password: z.string().min(8),
});

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const [passwordType, setPasswordType] = useState("password");
  const { toast } = useToast();

  const setAuth = useAuthStore((state) => state.setAuth);

  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      const result = await Login(data);

      if (result.success) {
        // Update Zustand store with authentication data
        setAuth({
          isAuthenticated: true,
          role: result.role,
          token: result.token,
        });

        // Show success toast
        toast({
          title: "Login Successful",
          description: "Redirecting to the dashboard...",
        });

        // Redirect based on user role
        switch (result.role) {
          case "superadmin":
            router.push("/dashboard/super-admin");
            break;
          case "siteadmin":
            router.push("/dashboard/site-admin");
            break;
          case "districtadmin":
            router.push("/dashboard/district-admin");
            break;
          default:
            console.error("Unknown role:", result.role);
            break;
        }
      } else {
        // Show error toast
        toast({
          title: "Login Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Unable to process your login request.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div className="flex-center min-h-[100dvh] w-full lg:bg-none bg-hero-beach-img bg-cover bg-center">
      <div className="flex-center gap-x-4 container p-0 md:px-8">
        <div className="lg:w-1/2 w-full mx-6 p-6 sm:px-0 sm:w-4/5 flex-center flex-col bg-white py-10 rounded-3xl z-10 shadow-md lg:shadow-none">
          <Form {...form} className="w-full h-full min-w-[455px]">
            {/* LOGO */}
            <div className="w-full flex justify-start items-center gap-x-3 max-w-[455px]">
              <div className="w-10 md:w-12 aspect-square rounded-full bg-black" />
              <span className="uppercase header-4 md:header-4">logo</span>
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
                    <FormLabel className="body md:paragraph-3">
                      Username
                    </FormLabel>
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
                    <FormLabel className="flex-between body md:paragraph-3">
                      Password{" "}
                      <Link
                        href={"/login/forgot-password"}
                        className="text-neutral-700 opacity-85 hover:text-black hover:opacity-100 transition-colors delay-150 text-sm"
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
                      className="absolute bg-transparent hover:bg-transparent text-blue text-xl p-3 rounded-lg uppercase w-10 right-1 top-6 cursor-pointer"
                      onClick={togglePassword}
                    >
                      {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loading ? (
                <>
                  <Button
                    disabled
                    size="lg"
                    className="rounded-2xl w-full h-[45px] body md:paragraph-2 bg-blue text-white hover:bg-white hover:text-blue hover:border border-blue active:scale-95 transition-all delay-250 ease-linear"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    className="rounded-2xl w-full h-[45px] body md:paragraph-2 bg-blue text-white hover:bg-white hover:text-blue hover:border border-blue active:scale-95 transition-all delay-250 ease-linear"
                  >
                    Login
                  </Button>
                </>
              )}
              <Link
                href={"/register"}
                className="w-full flex-center body md:paragraph-3 text-center"
              >
                <p>
                  Don’t Have an Account Register
                  <Button
                    variant="link"
                    className="text-blue body md:paragraph-3 px-2 active:scale-95 transition-transform delay-250 ease-linear underline"
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
