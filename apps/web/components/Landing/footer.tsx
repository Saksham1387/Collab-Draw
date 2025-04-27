import { Pen } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer className="bg-background w-full py-8 border-t-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Essential links in a simplified layout */}
          <div className="flex flex-wrap gap-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-xs text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-xs text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-3 text-sm font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-3 text-sm font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Logo and copyright */}
          <div className="flex items-center gap-2">
            <Pen className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Collab Draw</span>
            <span className="text-xs text-muted-foreground ml-2">
              © 2025
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};