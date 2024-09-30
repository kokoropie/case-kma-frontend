import { redirect } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "sonner";

type LoginUserRequest = {
  email: string;
  password: string;
};

export const useLoginUser = () => {
  const loginUser = async (user: LoginUserRequest) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
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
      throw new Error("Failed to login user");
    }

    return response.json();
  };

  const {
    mutateAsync: login,
    error,
    isSuccess,
    isLoading,
  } = useMutation(loginUser);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("Login Successfully");
    redirect("/");
  }

  return {
    login,
    isLoading,
  };
};
