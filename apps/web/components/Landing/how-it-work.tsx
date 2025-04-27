export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-16">
      <div className="container max-w-4xl mx-auto">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          How It Works
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              step: 1,
              title: "Create a Room",
              description: "Start a new drawing room in seconds with just a few clicks."
            },
            {
              step: 2,
              title: "Invite Collaborators",
              description: "Share a simple link with your team members to join your drawing session."
            },
            {
              step: 3,
              title: "Draw Together",
              description: "Collaborate in real-time with multiple users drawing simultaneously."
            },
            {
              step: 4,
              title: "Export & Share",
              description: "Download your creations or share them directly from the platform."
            }
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};