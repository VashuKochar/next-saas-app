"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";

// Validation schema with reCAPTCHA
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  recaptcha: z.string().min(1, "Please verify reCAPTCHA"),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "", recaptcha: "" },
  });

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, recaptcha: recaptchaToken }),
    });

    if (res.ok) {
      toast.success("Your message has been sent!");
      form.reset();
      recaptchaRef.current?.reset(); // Reset reCAPTCHA
      setRecaptchaToken(null);
    } else {
      toast.error("Failed to send message.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <Input placeholder="John Doe" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="example@mail.com" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <Textarea placeholder="Your message..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* reCAPTCHA */}
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          ref={recaptchaRef}
          onChange={(token) => setRecaptchaToken(token)}
        />

        <Button type="submit" className="w-full">Send</Button>
      </form>
    </Form>
  );
}