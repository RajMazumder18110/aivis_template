"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What are AI credits and how do they work?",
    answer:
      "AI credits are the currency used to perform operations in AiVis. Each action — like generating an image, applying a style transfer, or upscaling — costs a certain number of credits. For example, a standard text-to-image generation costs 1 credit, while a 4K upscale costs 2 credits. Credits reset monthly with your subscription, and you can always buy additional credit packs.",
  },
  {
    question: "Which AI models does AiVis support?",
    answer:
      "AiVis supports Stable Diffusion XL, DALL-E 3, Flux, and several proprietary models fine-tuned for specific tasks like upscaling, background removal, and style transfer. We continuously update our model library to include the latest advancements in AI image generation.",
  },
  {
    question: "Can I use AiVis-generated images commercially?",
    answer:
      "Yes! All images you generate with AiVis are yours to use commercially. Pro and Enterprise plans include full commercial usage rights. You own all outputs generated through the platform. We never claim ownership of your creations.",
  },
  {
    question: "What happens if I run out of credits?",
    answer:
      "If you exhaust your monthly credits, you can instantly purchase additional credit packs starting at $5 for 100 credits. Your existing projects and generated images remain fully accessible. You just won't be able to perform new AI operations until you have credits available.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Our Starter plan is completely free and includes 50 AI credits per month. No credit card required. You can upgrade to Pro or Enterprise at any time to unlock more credits and premium features.",
  },
  {
    question: "How fast is the image generation?",
    answer:
      "Most text-to-image generations complete in 3-8 seconds. Style transfers and effects typically take 2-5 seconds. Pro and Enterprise users get priority processing with even faster speeds. Batch processing is optimized for throughput with parallel processing.",
  },
  {
    question: "Can I fine-tune models with my own data?",
    answer:
      "Custom model fine-tuning is available on our Enterprise plan. You can train custom LoRA models on your brand assets, product photos, or specific art styles to ensure consistent output that matches your unique requirements.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-white/5 bg-white/2 px-6 data-[state=open]:border-amber-500/20"
              >
                <AccordionTrigger className="text-left text-sm font-medium hover:text-amber-400 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
