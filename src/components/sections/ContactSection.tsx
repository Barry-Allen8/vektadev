"use client";

import { useTranslations } from "next-intl";
import ContactForm from "@/components/forms/ContactForm";
import { Mail, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");

  return (
    <section id="contact" className="section relative overflow-hidden bg-slate-950/50">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-64 -bottom-64 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Info */}
          <div className="space-y-8 lg:col-span-5">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
                {t("badge") || "Get in touch"}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                {t("title") || "Contact Us"}
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                {tFooter("description")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-200">{tFooter("contact_title") || t("email")}</h4>
                  <p className="mt-1 text-slate-400">{t("email_address")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-200">{t("office")}</h4>
                  <p className="mt-1 text-slate-400 leading-relaxed">{tFooter("address")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-200">{t("business_hours")}</h4>
                  <p className="mt-1 text-slate-400">{tFooter("working_hours")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="sharp-card border-slate-800 bg-[#070e20]/45 p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
