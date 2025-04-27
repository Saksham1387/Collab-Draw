import Link from "next/link";

export const DashboardFooter = () => {
  return (
    <footer className="border-t py-10 w-full pt-10">
      <div className="flex items-center justify-between px-10 w-full">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Collab Draw. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Help
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};