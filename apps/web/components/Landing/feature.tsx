import { Pen, Users, Zap } from "lucide-react";

export const FeatureSection = () => {
  return (
    <section id="features" className=" py-12 md:py-16">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:mb-12 md:text-3xl lg:text-4xl">
          Why choose Collab Draw?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          <div className="rounded-lg bg-background p-6 shadow-sm">
            <div className="mb-4 w-fit rounded-full bg-primary/10 p-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Real-time Collaboration</h3>
            <p className="text-muted-foreground">
              Draw together with your team in real-time, no matter where they
              are located.
            </p>
          </div>
          <div className="rounded-lg bg-background p-6 shadow-sm">
            <div className="mb-4 w-fit rounded-full bg-primary/10 p-3">
              <Pen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Intuitive Tools</h3>
            <p className="text-muted-foreground">
              Powerful yet simple drawing tools that anyone can master in
              minutes.
            </p>
          </div>
          <div className="rounded-lg bg-background p-6 shadow-sm sm:col-span-2 md:col-span-1">
            <div className="mb-4 w-fit rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Team Management</h3>
            <p className="text-muted-foreground">
              Create teams, manage permissions, and organize your projects
              efficiently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
