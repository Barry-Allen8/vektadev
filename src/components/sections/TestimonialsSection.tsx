"use client";

import Card from "@/components/ui/Card";
import { MessageSquare, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="section bg-card">
      <div className="container">
        <div className="section-title">
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto text-center py-12 bg-white">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">{t("coming_soon_title")}</h3>
            <p className="text-muted mb-6 max-w-md mx-auto">
              {t("coming_soon_text")}
            </p>
            
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-gray-200"
                />
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
