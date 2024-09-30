"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useForgotPassword } from "./actions";
import { Loader2 } from "lucide-react";

const page = () => {
  const { isLoading, forgotPassword } = useForgotPassword();
  const [email, setEmail] = useState("");

  const handleForgot = async (e: any) => {
    e.preventDefault();
    await forgotPassword({ email });
  };
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
        <form onSubmit={(e) => handleForgot(e)} className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit">
            {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default page;
