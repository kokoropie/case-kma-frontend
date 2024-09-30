"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const NotFound = () => {
  const router = useRouter();
  const accessToken = getCookie("access_token");
  const url = window.location.href;

  if (url.includes("verify-email")) {
    const newUrl = url.replace(
      `${process.env.NEXT_PUBLIC_API_FRONTEND}`,
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
    );
    const verify = async () => {
      const res = await fetch(newUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.ok) {
        toast.success("Email Verified");
      }
    };

    useEffect(() => {
      verify();
    }, []);
  }

  if (url.includes("password-reset")) {
    const token = url.split("/")?.pop()?.split("?")[0];
    const email = new URL(url).searchParams.get("email");

    router.push(`/reset-password?token=${token}&email=${email}`);
    return;
  }

  router.push("/");
};

export default NotFound;
