import { useMutation } from "react-query";
import { redirect } from "next/navigation";
import { toast } from "sonner";

type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const useRegisterUser = () => {
  const registerUser = async (user: RegisterUserRequest) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`,
      {
        method: "POST",
        headers: {
          // "mode": "no-cors",
          "Content-Type": "application/json",
          // credentials: "include",
          // "X-Powered-By": "PHP/8.2.12",
          // "Cache-Control": "no-cache, private",
          // "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_FRONTEND}`,
          // "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      if (response.status === 422) throw new Error("Email existed");
      if (response.status === 500) throw new Error("Register Failed");
    }

    return response.json();
  };

  const {
    mutateAsync: register,
    isLoading,
    error,
    isSuccess,
  } = useMutation(registerUser);

  if (isSuccess) {
    toast.success("Register Successfully");
    redirect("/check-mail");
  }

  if (error) {
    toast.error(error.toString());
  }

  return {
    register,
    isLoading,
  };
};
