"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Send, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { serviceItems } from "@/data/serviceCatalog";

interface ApiContactFormData extends ContactFormData {
  b_website?: string; // Honeypot field
}

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const tErrors = useTranslations("contact.form.errors");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });
  const [emailValidationState, setEmailValidationState] = useState<
    "idle" | "validating" | "valid" | "invalid"
  >("idle");
  const [emailValidationMessage, setEmailValidationMessage] = useState<string | null>(null);

  const translateError = useCallback((code?: string) => {
    if (!code) return undefined;
    try {
      return tErrors(code);
    } catch {
      return t("error");
    }
  }, [t, tErrors]);

  const validateEmailAsync = useCallback(
    async (email: string) => {
      const normalizedEmail = email.trim();
      if (!normalizedEmail) {
        setEmailValidationState("idle");
        setEmailValidationMessage(null);
        return true;
      }

      setEmailValidationState("validating");
      setEmailValidationMessage(t("email_validating"));

      try {
        const response = await fetch("/api/contact/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: normalizedEmail }),
        });

        const payload = (await response.json().catch(() => null)) as
          | { valid?: boolean; code?: string }
          | null;

        if (payload?.valid) {
          clearErrors("email");
          setEmailValidationState("valid");
          setEmailValidationMessage(t("email_valid"));
          return true;
        }

        const errorCode = payload?.code || "email.validation_failed";
        setError("email", { type: "manual", message: errorCode });
        setEmailValidationState("invalid");
        setEmailValidationMessage(translateError(errorCode) || t("error"));
        return false;
      } catch {
        const fallbackCode = "email.validation_failed";
        setError("email", { type: "manual", message: fallbackCode });
        setEmailValidationState("invalid");
        setEmailValidationMessage(translateError(fallbackCode) || t("error"));
        return false;
      }
    },
    [clearErrors, setError, t, translateError]
  );

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);

    try {
      const emailIsValid = await validateEmailAsync(data.email);
      if (!emailIsValid) {
        throw new Error(translateError("email.validation_failed") || t("error"));
      }

      // Get honeypot value from hidden field
      const honeypotInput = document.getElementById("b_website") as HTMLInputElement;
      const honeypotValue = honeypotInput?.value || "";

      const payload: ApiContactFormData = {
        ...data,
        b_website: honeypotValue,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const parsedBody = await response.json().catch(() => null);
        const serverError = response.status === 429 ? t("rate_limit") : null;
        throw new Error(serverError || parsedBody?.error || t("error"));
      }

      setSubmitStatus("success");
      setEmailValidationState("idle");
      setEmailValidationMessage(null);
      reset();
    } catch (error) {
      setSubmitStatus("error");
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailField = register("email");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot field - hidden from users and assistive technology, visible to bots */}
      <div
        className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <input
          type="text"
          id="b_website"
          name="b_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      <Input
        label={t("name")}
        placeholder={t("name_placeholder")}
        {...register("name")}
        error={translateError(errors.name?.message)}
      />

      <Input
        label={t("email")}
        type="email"
        placeholder={t("email_placeholder")}
        {...emailField}
        onBlur={async (event) => {
          emailField.onBlur(event);
          await validateEmailAsync(event.target.value);
        }}
        onChange={(event) => {
          emailField.onChange(event);
          setEmailValidationState("idle");
          setEmailValidationMessage(null);
        }}
        error={translateError(errors.email?.message)}
      />
      {emailValidationState !== "idle" && !errors.email && (
        <p
          className={`text-sm ${emailValidationState === "valid" ? "text-primary" : "text-slate-400"}`}
          aria-live="polite"
        >
          {emailValidationMessage}
        </p>
      )}

      <Input
        label={t("phone")}
        type="tel"
        placeholder={t("phone_placeholder")}
        {...register("phone")}
        error={translateError(errors.phone?.message)}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">{t("service")}</label>
        <div className="relative">
          <select
            {...register("service")}
            className="cyber-input appearance-none pr-10"
          >
            <option value="">{t("service_placeholder")}</option>
            {serviceItems.map((service) => (
              <option key={service.key} value={service.key}>
                {t(`services.${service.key}`)}
              </option>
            ))}
            <option value="not_sure">{t("not_sure")}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      <Textarea
        label={t("message")}
        placeholder={t("message_placeholder")}
        {...register("message")}
        error={translateError(errors.message?.message)}
      />

      <Button type="submit" size="lg" className="w-full py-3.5" disabled={isSubmitting}>
        {isSubmitting ? t("submitting") : t("submit")}
        <Send className="w-5 h-5" />
      </Button>

      {
        submitStatus && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl border p-4 text-sm ${
              submitStatus === "success"
                ? "border-primary/45 bg-primary/10 text-primary"
                : "border-red-500/55 bg-red-950/25 text-red-300"
              }`}
          >
            {submitStatus === "success"
              ? t("success")
              : errorMessage || t("error")}
          </div>
        )
      }
    </form >
  );
}
