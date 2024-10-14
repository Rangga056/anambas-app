import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const UnauthorizePage = () => {
  return (
    <div className=" bg-hero-beach-img bg-cover bg-center">
      <main className="w-full min-h-[100dvh] flex-center container px-4">
        <div className="flex-center flex-col text-center  bg-white p-4 py-10 md:p-10 md:py-20 rounded-3xl">
          <h1 className="font-bold text-[110px] leading-[115px] md:text-[150px] md:leading-[142px] text-blue">
            403
          </h1>
          <h3 className="font-semibold text-xl md:text-3xl font-poppins mt-2">
            This is a restricted page
          </h3>
          <p className="mt-2 md:mt-4 font-poppins">
            Unfortunately you don't have the permissions required to access this
            page.
            <br className="md:flex hidden" /> Go back to{" "}
            <Button
              variant="link"
              className="text-blue body font-poppins py-0 md:py-2 px-1 h-[25px] active:scale-95 underline transition-transform delay-250 ease-linear"
            >
              <Link href={"/"} className="text-blue">
                visitanambas.com
              </Link>
            </Button>
            , or
            <Button
              variant="link"
              className="text-blue body font-poppins py-0 md:py-2 px-1 h-[25px] active:scale-95 underline transition-transform delay-250 ease-linear"
            >
              <Link href={"/login"} className="text-blue">
                Log in
              </Link>
            </Button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default UnauthorizePage;
