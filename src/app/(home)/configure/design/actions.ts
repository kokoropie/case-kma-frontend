import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import { toast } from "sonner";

export type Color = { slug: string; name: string; hex_code: string };
export type Model = { slug: string; name: string; image_url: string };
export type Material = {
  slug: string;
  name: string;
  price: number;
  description?: string;
};
export type Finish = {
  slug: string;
  name: string;
  price: number;
  description?: string;
};

type configuration = {
  base: number;
  colors: Color[];
  finishes: Finish[];
  materials: Material[];
  models: Model[];
};

export const useGetConfiguration = () => {
  const getConfigurationRequest = async (): Promise<configuration> => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration/create`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Fetch configuration failed");
    }

    return response.json();
  };

  const {
    data: configurationData,
    error,
    isLoading: isLoadingConfig,
  } = useQuery("fetchConfiguration", getConfigurationRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { configurationData, isLoadingConfig };
};
