import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useForgotPassword } from "./actions";
import { useState } from "react";

const ForgotPasswordForm = () => {
  const { isLoading, forgotPassword } = useForgotPassword();
  const [email, setEmail] = useState("");

  const handleForgot = async (e: any) => {
    e.preventDefault();
    await forgotPassword({ email });
  };

  return (
    <form onSubmit={(e) => handleForgot(e)} className="flex flex-col gap-2">
      <Label>Email</Label>
      <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      <Button type="submit">
        {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
