"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "./FAQAccordion.module.css";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function FAQAccordion() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers to common questions about working with us."
        />

        <div className={styles.list}>
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={styles.item}>
                <button
                  className={styles.question}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <FiChevronDown className={cn(styles.chevron, isOpen && styles.chevronOpen)} />
                </button>
                <div className={cn(styles.answerWrapper, isOpen && styles.answerOpen)}>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}