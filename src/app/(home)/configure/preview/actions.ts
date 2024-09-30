import { getCookie } from "cookies-next";
import { useMutation } from "react-query";
import { toast } from "sonner";

export const useCreateMyConfiguration = () => {
  const createMyConfigurationRequest = async (data: any): Promise<any> => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create configuration");
    }

    return response.json();
  };

  const {
    mutateAsync: createMyConfiguration,
    isLoading,
    error,
  } = useMutation(createMyConfigurationRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { createMyConfiguration, isLoading };
};
