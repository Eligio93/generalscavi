"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { asLink, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Wrapper from "@/components/Wrapper";
import SectionHeader from "@/components/SectionHeader";
import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { socialIcons } from "@/lib/icons";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ContactFormSchema } from "@/validation/ContactForm.schema";

type ContactFormData = z.infer<typeof ContactFormSchema>;
/**
 * Props for `ContactsBanner`.
 */
export type ContactsBannerProps =
  SliceComponentProps<Content.ContactsBannerSlice>;

/**
 * Component for "ContactsBanner" Slices.
 */
const ContactsBanner: FC<ContactsBannerProps> = ({ slice }) => {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio");
      }

      setSubmitStatus({ type: "success", message: "Messaggio inviato con successo!" });
      reset();
    } catch {
      setSubmitStatus({ type: "error", message: "Errore durante l'invio. Riprova." });
    }
  };

  const bgImage = slice.primary.backgroundimage;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      style={
        bgImage?.url ? { backgroundImage: `url(${bgImage.url})` } : undefined
      }
    >
      <Wrapper>
        <SectionHeader
          title={slice.primary.title}
          subtitle={slice.primary.subtitle}
        />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className=" col-start-1 col-span-1 rounded-lg p-3 bg-foreground/70 backdrop-blur-3xl text-white md:col-start-3 md:col-span-3 md:row-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <span className="font-michroma text-primary font-bold">
                {slice.primary.formtitle}
              </span>
              <label htmlFor="name" className="flex flex-col gap-1 text-sm">
                <p className="font-michroma">Nome*</p>
                <Input type="text" id="name" {...register("name")} />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </label>
              <label htmlFor="lastName" className="flex flex-col gap-1 text-sm">
                <p className="font-michroma">Cognome*</p>
                <Input type="text" id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <span className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </span>
                )}
              </label>
              <label htmlFor="email" className="flex flex-col gap-1 text-sm">
                <p className="font-michroma">Email*</p>
                <Input type="email" id="email" {...register("email")} />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </label>
              <label htmlFor="message" className="flex flex-col gap-1 text-sm">
                <p className="font-michroma">Messaggio*</p>
                <Textarea
                  id="message"
                  placeholder="Scrivi qui il tuo messaggio..."
                  {...register("message")}
                />
                {errors.message && (
                  <span className="text-red-500 text-xs">
                    {errors.message.message}
                  </span>
                )}
              </label>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Invio..." : "Invia"}
              </Button>
              {submitStatus && (
                <p
                  className={`text-sm ${
                    submitStatus.type === "success" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {submitStatus.message}
                </p>
              )}
            </form>
          </div>
          <div className=" col-start-1 col-span-1 rounded-lg p-3 bg-foreground/70 backdrop-blur-3xl text-white flex flex-col gap-5 md:col-start-1 md:col-span-2 md:row-start-1">
            <span className="font-michroma text-primary font-bold">
              {slice.primary.contacttitle}
            </span>
            <div className="flex gap-2 items-center">
              <Phone className="w-5 h-5" />
              <p className="font-michroma text-xs">{slice.primary.phone}</p>
            </div>
            <div className="flex gap-2 items-center hover:text-primary">
              <Mail className="w-5 h-5" />
              <Link
                href={`mailto:${slice.primary.email}`}
                className="font-michroma text-xs"
              >
                {slice.primary.email}
              </Link>
            </div>
          </div>
          <div className=" col-start-1 col-span-1 rounded-lg p-3 bg-foreground/70 backdrop-blur-3xl text-white flex flex-col gap-5 md:col-start-1 md:col-span-2">
            <span className="font-michroma text-primary font-bold">
              {slice.primary.socialtitle}
            </span>
            <div className="flex justify-evenly">
              {slice.primary.social.map((social) => {
                const Icon =
                  socialIcons[social.text as keyof typeof socialIcons];
                return (
                  <a
                    key={social.key}
                    href={asLink(social) ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-center items-center gap-2 hover:text-primary"
                  >
                    {Icon && <Icon className="w-6 h-6" />}
                    <p className="hidden lg:block">{social.text}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ContactsBanner;
