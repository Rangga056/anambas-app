'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from 'react';

// Ini masih sementara/ temporary
const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage(''); // Clear any existing error messages
    setSuccessMessage(''); // Clear any existing success messages

    const formData = new FormData(event.target); // Create FormData object

    const data = Object.fromEntries(formData); // Convert to object

    if (data.password !== data['verify-password']) {
      setErrorMessage("Passwords do not match");
      return; // Prevent further processing if passwords don't match
    }

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'post',
        body: formData, // Use FormData directly for efficient data handling
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set appropriate header
        },
      });

      if (!response.ok) { // Handle non-2xx status codes gracefully
        throw new Error(`API request failed with status ${response.status}`);
      }

      const responseData = await response.json();

      setSuccessMessage("Registration successful!");
      console.log(responseData);
    } catch (error) {
      console.error(error);

      let errorMessage;
      if (error.message.includes('422')) { // Handle potential validation errors
        errorMessage = "Registration failed due to invalid data.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = "An error occurred. Please try again.";
      }

      setErrorMessage(errorMessage);
    }
  };
  return (
    <main className="container w-full min-h-screen flex items-center justify-center">
      <div className="rounded-lg border-slate-700 border p-10 pt-6">
        <div>
          <h1 className="my-8 text-3xl text-center w-full font-semibold">
            Register Form
          </h1>
        </div>
        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <Input
            type="text"
            id="username"
            className="border border-black my-4 w-[350px]"
          />

          {/* email */}
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <Input
            type="email"
            id="email"
            className="border border-black my-4 w-[350px]"
          />

          {/* Passworwd */}
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <Input
            type="password"
            id="password"
            className="border border-black my-4 w-[350px]"
          />

          {/* verify Passworwd */}
          <label htmlFor="verify-password" className="font-semibold">
            Verify Password
          </label>
          <Input
            type="password"
            id="verify-password"
            className="border border-black my-4 w-[350px]"
          />
           {/* Register button */}
           <div className="w-full flex items-center justify-center mt-10">
            <Button
              type="submit"
              className="hover:border-2 border-black font-semibold hover:text-black hover:bg-transparent transition-colors"
              size="lg"
            >
              Register
            </Button>
          </div>
        </form>
        <div>
          <h3 className="my-8 text-center w-full font-medium">
            Have Account? Login{" "}
            <Link
              href={"/dashboard/login"}
              className="text-blue-500 hover:underline underline-offset-1 font-medium"
            >
              Here
            </Link>
          </h3>
        </div>
       
      </div>
    </main>
  );
};

export default RegisterPage;
