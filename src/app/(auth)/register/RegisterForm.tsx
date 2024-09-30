"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { setCookie } from "cookies-next";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRegisterUser } from "./actions";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "name is required").max(50),
  email: z.string().email().min(1, "email is required"),
  password: z.string().min(8, "password at least 8 characters").max(255),
  password_confirmation: z.string().min(8).max(255),
});

export default function RegisterForm() {
  const { register, isLoading } = useRegisterUser();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.password !== values.password_confirmation) {
      toast.error("Password not match");
    } else {
      const res = await register(values);
      setCookie("access_token", res.token);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Confirm</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {isLoading ? (
            <Button className="w-full" type="button">
              Loading...
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              Register
            </Button>
          )} */}
          <Button className="w-full" type="submit">
            {isLoading ? <Loader2 className="animate-spin" /> : "Register"}
          </Button>
        </form>
      </Form>
    </>
  );
}
