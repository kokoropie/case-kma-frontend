"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { toast } from "sonner";
import { useResetPassword } from "./actions";
import { Loader2 } from "lucide-react";

const ResetPasswordForm = ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const { resetPassword, isLoading } = useResetPassword();
  const [data, setData] = useState<{
    password: string;
    password_confirmation: string;
  }>({
    password: "",
    password_confirmation: "",
  });

  const handleReset = async (e: any) => {
    e.preventDefault();
    if (data.password !== data.password_confirmation) {
      toast.error("Password not match");
    } else {
      await resetPassword({ ...data, token, email });
    }
  };

  return (
    <div className="flex justify-center flex-col space-y-4">
      <div className="relative flex flex-col gap-3 w-full">
        <form onSubmit={(e) => handleReset(e)} className="flex flex-col gap-2">
          <Label className="font-semibold">New Password</Label>
          <Input
            type="password"
            onChange={(e) =>
              setData((prev: any) => ({ ...prev, password: e.target.value }))
            }
          />
          <Label className="font-semibold">Confirm Password</Label>
          <Input
            type="password"
            onChange={(e) =>
              setData((prev: any) => ({
                ...prev,
                password_confirmation: e.target.value,
              }))
            }
          />
          <Button type="submit">
            {isLoading ? <Loader2 className="animate-spin" /> : "Reset"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
