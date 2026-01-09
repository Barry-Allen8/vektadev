"use client";

import { teamMembers } from "@/data/team";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Target, Award, Users, Lightbulb, CheckCircle, MessageSquare, FileSearch, Rocket, Headphones, Clock, Shield, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutPageClient() {
  const t = useTranslations("about");

  const values = [
    { key: "focus", icon: Target },
    { key: "quality", icon: Award },
    { key: "partnership", icon: Users },
    { key: "innovation", icon: Lightbulb },
  ];

  const approachIcons = [MessageSquare, FileSearch, Rocket, Headphones];
  const trustIcons = [Clock, Users2, Target, Shield];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Improved */}
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("title")}</h1>
            <p className="text-xl text-muted leading-relaxed">{t("description")}</p>
          </div>
        </div>
      </section>

      {/* Value Proposition Section - NEW */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{t("value_prop_title")}</h2>
            <p className="text-lg text-muted mb-8">{t("value_prop_intro")}</p>
            <ul className="space-y-4">
              {(t.raw("value_prop_points") as string[]).map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Story Section - Improved */}
      <section className="section bg-card">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{t("story_title")}</h2>
            <div className="space-y-6 text-lg text-muted leading-relaxed">
              <p>{t("story_p1")}</p>
              <p>{t("story_p2")}</p>
              <p>{t("story_p3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section - NEW */}
      <section className="section">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("approach_title")}</h2>
              <p className="text-lg text-muted max-w-3xl mx-auto">{t("approach_intro")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(t.raw("approach_steps") as Array<{ title: string; description: string }>).map((step, index) => {
                const Icon = approachIcons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-primary">{index + 1}.</span>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-muted">{step.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section - NEW */}
      <section className="section bg-card">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t("trust_title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t.raw("trust_signals") as Array<{ title: string; description: string }>).map((signal, index) => {
                const Icon = trustIcons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="text-center h-full">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{signal.title}</h3>
                      <p className="text-muted text-sm">{signal.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Kept */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t("values_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`values.${value.key}.title`)}
                  </h3>
                  <p className="text-muted text-sm">
                    {t(`values.${value.key}.description`)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - UNCHANGED */}
      <section className="section bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t("team_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => {
              const name = t(`team.${member.id}.name`);
              const position = t(`team.${member.id}.position`);
              const bio = t(`team.${member.id}.bio`);

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 relative">
                      <Image
                        src={member.image}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{name}</h3>
                    <p className="text-primary text-sm mb-3">{position}</p>
                    <p className="text-muted text-sm">{bio}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Improved */}
      <section className="section bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">{t("cta_title")}</h2>
            <p className="text-xl mb-8 text-white/90">{t("cta_description")}</p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
              <Link href="/contact">{t("cta_button")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
