"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import axios from "axios";
import { httpUrl } from "@/lib/config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  isSignIn: boolean;
}

export function AuthForm({ className, isSignIn, ...props }: LoginFormProps) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },

    onSubmit: async ({ value }) => {
      try {
        let endpoint = isSignIn ? "signin" : "signup";
        let payload = isSignIn
          ? {
              email: value.email,
              password: value.password,
            }
          : {
              email: value.email,
              password: value.password,
              username: value.username,
            };

        const res = await axios.post(`${httpUrl}/auth/${endpoint}`, payload, {
          withCredentials: true,
        });

        if (res.status === 200) {
          toast(`Successfully ${isSignIn ? "Signed In" : "Signed Up"}`);

          if (isSignIn) {
            router.push("/dashboard");
          }
          return;
        } else if (res.status === 401 && isSignIn) {
          toast("Wrong Credentials");
          return;
        }

        toast("Some Error Occurred");
        console.log(res.data);
      } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401 && isSignIn) {
            toast("Wrong Credentials");
          } else {
            toast(
              `Error: ${error.response.data?.message || "Some Error Occurred"}`
            );
          }
        } else {
          toast("Network Error: Please try again later");
        }
      }
    },
  });
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Use your credential</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="grid gap-6">
              <div className="grid gap-6">
                <form.Field name="email">
                  {(field) => (
                    <div className="grid gap-2">
                      <Label htmlFor={field.name}>{field.name}</Label>
                      <Input
                        id={field.name}
                        type="email"
                        value={field.state.value}
                        placeholder="m@example.com"
                        required
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>

                {!isSignIn && (
                  <form.Field name="username">
                    {(field) => (
                      <div className="grid gap-2">
                        <Label htmlFor={field.name}>{field.name}</Label>
                        <Input
                          id={field.name}
                          type="text"
                          value={field.state.value}
                          placeholder="John"
                          required
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>
                )}

                <form.Field name="password">
                  {(field) => (
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor={field.name}>{field.name}</Label>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? "..." : isSignIn ? "SignIn" : "SignUp"}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
              {isSignIn ? (
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-4">
                    SignUp
                  </Link>
                </div>
              ) : (
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/signin" className="underline underline-offset-4">
                    SignIn
                  </Link>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
