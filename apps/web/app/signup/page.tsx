import { AuthForm } from "@/components/auth-form";
import { useAuthServer } from "@/hooks/useAuthServer";
import { Brush } from "lucide-react";
import { redirect } from "next/navigation";

export default function SignUp() {
  const { isloggedIn } = useAuthServer();
  if (isloggedIn) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 dark:bg-black">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Brush className="size-4" />
          </div>
          Collab Draw
        </a>
        <AuthForm isSignIn={false} />
      </div>
    </div>
  );
}
