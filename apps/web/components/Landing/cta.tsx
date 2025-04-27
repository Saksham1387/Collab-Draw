import { Button } from "@/components/ui/button";
import { MessageSquare, Zap } from "lucide-react";

export const CTASection = () => {
  return (
    <section className=" py-12 dark:text-white text-primary-foreground md:py-16">
      <div className="container text-center">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          Ready to start collaborating?
        </h2>
        <p className="mx-auto mb-8 max-w-[700px] dark:text-white text-primary-foreground/90">
          Join thousands of teams already using Collab Draw to bring their ideas
          to life
        </p>
        <div className="flex flex-col gap-4 justify-center sm:flex-row">
          <Button size="lg" variant="secondary" className="gap-2">
            <Zap className="h-4 w-4" />
            Start for Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 bg-transparent border-primary-foreground/20 dark:text-white text-primary-foreground hover:bg-primary-foreground/10"
          >
            <MessageSquare className="h-4 w-4" />
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};
