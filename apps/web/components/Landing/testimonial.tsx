export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-12 md:py-16">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:mb-12 md:text-3xl lg:text-4xl">
          What Our Users Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="mb-4 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-5 w-5 fill-primary"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mb-4 italic text-muted-foreground">
              "Collab Draw has transformed how our design team works together.
              The real-time collaboration is seamless, and it's so intuitive
              that everyone picked it up immediately."
            </p>
            <div>
              <p className="font-semibold">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">
                Design Director, CreativeHub
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="mb-4 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-5 w-5 fill-primary"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mb-4 italic text-muted-foreground">
              "As a remote team, we needed a tool that would help us brainstorm
              visually. Collab Draw is exactly what we needed - it feels like
              we're all in the same room sketching on a whiteboard."
            </p>
            <div>
              <p className="font-semibold">Michael Chen</p>
              <p className="text-sm text-muted-foreground">
                Product Manager, TechInnovate
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-background p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-5 w-5 fill-primary"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mb-4 italic text-muted-foreground">
              "I use Collab Draw with my students for interactive lessons. It's
              been a game-changer for keeping them engaged and collaborating on
              projects, even in a virtual classroom setting."
            </p>
            <div>
              <p className="font-semibold">Emily Rodriguez</p>
              <p className="text-sm text-muted-foreground">
                Art Teacher, Westlake Academy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
