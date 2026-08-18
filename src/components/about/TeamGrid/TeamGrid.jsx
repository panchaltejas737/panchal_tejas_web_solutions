"use client";

import { useState, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiLinkedin, FiUsers } from "react-icons/fi";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import styles from "./TeamGrid.module.css";
import { cn } from "@/lib/utils";

const DEPARTMENTS = ["All", "Developers", "Designers", "Management"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TeamGrid({ members }) {
  const [activeDept, setActiveDept] = useState("All");

  const filteredMembers = useMemo(() => {
    if (activeDept === "All") return members;
    return members.filter((m) => m.department === activeDept);
  }, [members, activeDept]);

  if (!members || members.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading eyebrow="Our Team" title="Meet The People Behind The Work" />
          <EmptyState
            icon={FiUsers}
            title="Team Page Coming Soon"
            message="We're putting together team profiles. Check back shortly."
          />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Our Team"
          title="Meet The People Behind The Work"
          subtitle="A team of developers, designers, and strategists dedicated to your project."
        />

        <div className={styles.filterBar}>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              className={cn(styles.filterChip, activeDept === dept && styles.activeChip)}
              onClick={() => setActiveDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeDept} variants={containerVariants} initial="hidden" animate="visible">
            <Row className="g-4">
              {filteredMembers.map((member) => (
                <Col key={member._id} xs={12} sm={6} lg={4}>
                  <motion.div variants={cardVariants} className={styles.card}>
                    <div className={styles.photoWrapper}>
                      <Image
                        src={member.corporatePhoto}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className={styles.corporatePhoto}
                      />
                      <Image
                        src={member.funPhoto}
                        alt={`${member.name} - fun photo`}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className={styles.funPhoto}
                      />

                      <div className={styles.socialOverlay}>
                        {member.githubUrl && (
                          <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} GitHub`}>
                            <FiGithub />
                          </a>
                        )}
                        {member.linkedinUrl && (
                          <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}>
                            <FiLinkedin />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className={styles.info}>
                      <h3 className={styles.name}>{member.name}</h3>
                      <p className={styles.role}>{member.role}</p>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}