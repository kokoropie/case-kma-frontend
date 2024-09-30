import { redirect } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "sonner";

export const useForgotPassword = () => {
  const forgotPasswordRequest = async (data: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to forgot password request");
    }

    return response.json();
  };

  const {
    isLoading,
    error,
    isSuccess,
    mutateAsync: forgotPassword,
  } = useMutation(forgotPasswordRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    redirect("/check-mail");
  }

  return { isLoading, forgotPassword };
};
