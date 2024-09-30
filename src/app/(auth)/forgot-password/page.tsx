"use client";
import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";

const page = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex gap-2 items-center justify-center">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter Your Email
        </h2>
        <Link href="/">
          <img src="/snake-1.png" alt="logo" className="w-24 h-24" />
        </Link>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default page;
