import { FiCode, FiShield, FiClock, FiHeadphones, FiTrendingUp, FiLayers } from "react-icons/fi";
import { FiGrid, FiInbox, FiFolder, FiMessageSquare, FiSettings, FiUsers } from "react-icons/fi";
// import { FiGrid, FiInbox, FiFolder, FiMessageSquare, FiSettings, FiUsers } from "react-icons/fi";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  // { label: "Team", href: "/x9k2-control-panel/team", icon: FiUsers },
];

export const WHY_CHOOSE_US = [
  {
    id: 1,
    icon: FiClock,
    title: "On-Time Delivery",
    description: "We respect deadlines and deliver every project on schedule, without compromising quality.",
  },
  {
    id: 2,
    icon: FiCode,
    title: "Modern Tech Stack",
    description: "Built with the latest frameworks and tools for speed, scalability, and long-term reliability.",
  },
  {
    id: 3,
    icon: FiShield,
    title: "Transparent Process",
    description: "Clear communication and regular updates from kickoff to final deployment.",
  },
  {
    id: 4,
    icon: FiHeadphones,
    title: "Post-Launch Support",
    description: "We don't disappear after launch — ongoing support and maintenance included.",
  },
  {
    id: 5,
    icon: FiTrendingUp,
    title: "Growth-Focused",
    description: "Every solution is built to scale as your business grows.",
  },
  {
    id: 6,
    icon: FiLayers,
    title: "Full-Stack Expertise",
    description: "From database to design — end-to-end development under one roof.",
  },
];

export const TECH_STACK = [
  "Next.js",
  "React",
  "MongoDB",
  "Node.js",
  "Cloudinary",
  "Framer Motion",
  "Bootstrap",
];

export const PROJECT_CATEGORIES = [
  "All",
  "Web App",
  "E-commerce",
  "Mobile App",
  "Landing Page",
];

export const PROCESS_STEPS = [
  {
    id: 1,
    step: "01",
    title: "Discovery",
    description: "We understand your business goals, target audience, and project requirements in detail.",
  },
  {
    id: 2,
    step: "02",
    title: "Design",
    description: "Wireframes and UI/UX designs are crafted to match your brand identity and user needs.",
  },
  {
    id: 3,
    step: "03",
    title: "Development",
    description: "Our team builds your solution using modern, scalable, and secure technology.",
  },
  {
    id: 4,
    step: "04",
    title: "Testing & Launch",
    description: "Rigorous testing across devices, then a smooth, confident deployment to production.",
  },
  {
    id: 5,
    step: "05",
    title: "Support",
    description: "Ongoing maintenance and support to keep your product running at its best.",
  },
];

export const CORE_VALUES = [
  {
    id: 1,
    icon: FiShield,
    title: "Quality First",
    description: "We never compromise on code quality, performance, or design standards.",
  },
  {
    id: 2,
    icon: FiHeadphones,
    title: "Transparency",
    description: "Open communication at every stage — no surprises, no hidden costs.",
  },
  {
    id: 3,
    icon: FiTrendingUp,
    title: "Innovation",
    description: "We stay current with modern tech to give your business a competitive edge.",
  },
  {
    id: 4,
    icon: FiClock,
    title: "Client-First",
    description: "Your business goals drive every technical and design decision we make.",
  },
];

export const FAQ_ITEMS = [
  {
    id: 1,
    question: "How long does a typical project take?",
    answer: "Timelines vary by scope, but most business websites take 2-4 weeks, while more complex web applications can take 6-10 weeks. We provide a clear timeline after the discovery phase.",
  },
  {
    id: 2,
    question: "Do you offer post-launch support?",
    answer: "Yes. Every project includes a support window after launch, and we offer ongoing maintenance packages for ongoing updates, monitoring, and improvements.",
  },
  {
    id: 3,
    question: "What technologies do you work with?",
    answer: "We specialize in Next.js, React, Node.js, and MongoDB, along with modern tools like Cloudinary for media and Framer Motion for animations — ensuring fast, scalable, production-ready solutions.",
  },
  {
    id: 4,
    question: "Can you redesign my existing website?",
    answer: "Absolutely. We can audit your current site and either improve it incrementally or rebuild it from scratch with modern technology and design.",
  },
  {
    id: 5,
    question: "How do we get started?",
    answer: "Simply fill out the contact form or reach out via email/phone. We'll schedule a free consultation to understand your needs and propose the best approach.",
  },
];

// Admin panel sidebar navigation
export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: "/x9k2-control-panel/dashboard", icon: FiGrid },
  { label: "Leads", href: "/x9k2-control-panel/leads", icon: FiInbox },
  { label: "Services", href: "/x9k2-control-panel/services", icon: FiLayers },
  { label: "Projects", href: "/x9k2-control-panel/projects", icon: FiFolder },
  { label: "Testimonials", href: "/x9k2-control-panel/testimonials", icon: FiMessageSquare },
  { label: "Team", href: "/x9k2-control-panel/team", icon: FiUsers },
  { label: "Settings", href: "/x9k2-control-panel/settings", icon: FiSettings },
];