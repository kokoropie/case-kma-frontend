import { redirect } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "sonner";

export const useResetPassword = () => {
  const resetPasswordRequest = async (data: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to reset password");
    }

    return response.json();
  };

  const {
    mutateAsync: resetPassword,
    isLoading,
    isSuccess,
    error,
  } = useMutation(resetPasswordRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("Reset password successfully");
    redirect("/");
  }

  return { resetPassword, isLoading };
};
