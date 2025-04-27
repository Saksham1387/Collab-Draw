import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  return (
    <section id="faq" className=" py-12 md:py-16">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:mb-12 md:text-3xl lg:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How many people can collaborate in a single room?
              </AccordionTrigger>
              <AccordionContent>
                The Free plan supports up to 5 collaborators per room, the Pro
                plan supports up to 20 collaborators, and the Enterprise plan
                offers unlimited collaborators per room.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I export my drawings?</AccordionTrigger>
              <AccordionContent>
                Yes! All plans allow you to export your drawings. The Free plan
                supports PNG export, while Pro and Enterprise plans support
                multiple formats including SVG, PDF, and more.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Do you offer a free trial of the Pro plan?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we offer a 14-day free trial of our Pro plan with no credit
                card required. You can upgrade at any time during or after your
                trial.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We use industry-standard encryption to protect your
                data. Enterprise plans also include additional security features
                like SSO integration and advanced access controls.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Can I use Collab Draw offline?
              </AccordionTrigger>
              <AccordionContent>
                Currently, Collab Draw requires an internet connection for
                real-time collaboration. However, Pro and Enterprise users can
                enable offline mode for individual work, which will sync when
                you reconnect.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
