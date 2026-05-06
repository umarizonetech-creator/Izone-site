import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Target,
  Eye,
  Heart,
  Users,
  Lightbulb,
  Award,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/Layout";
import ExpertCard from "../components/ui/ExpertCard";
import ValueCard from "../components/ui/ValueCard";
import CEOCard from "../components/ui/CEOCard";
import AboutHero from "../components/AboutHero";
import { useAdmin } from "@/context/AdminContext";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description:
      "We pour our hearts into every project, treating your success as our own.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Constantly pushing boundaries to deliver cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Working closely with clients to ensure perfect alignment with their vision.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Committed to delivering nothing less than exceptional quality.",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CTO",
    avatar: "SC",
    bio: "Full-stack expert passionate about scalable architecture.",
  },
  {
    name: "Michael Rodriguez",
    role: "Lead Designer",
    avatar: "MR",
    bio: "Award-winning designer focused on user experience.",
  },
  {
    name: "Emily Johnson",
    role: "Project Manager",
    avatar: "EJ",
    bio: "Agile enthusiast ensuring seamless project delivery.",
  },
  {
    name: "David Kim",
    role: "Senior Developer",
    avatar: "DK",
    bio: "React specialist with a love for clean code.",
  },
  {
    name: "Lisa Wang",
    role: "UX Researcher",
    avatar: "LW",
    bio: "Data-driven designer advocating for user needs.",
  },
  {
    name: "James Miller",
    role: "DevOps Engineer",
    avatar: "JM",
    bio: "Cloud infrastructure specialist ensuring 99.9% uptime.",
  },
];

const ceoData = {
  name: "MR.B.KESAVAN M.E",
  role: "Founder & CEO",
  description:
    "Founder and CEO of Izone Technologies. Over 15 years building software for Indian and international businesses. Kesavan started Izone with a focus on engineering quality and long-term client partnerships — values that still shape every project the team takes on",
};

const milestones = [
  {
    year: "2014",
    title: "Founded",
    description:
      "Izone Technologies was born with a vision to transform digital experiences.",
  },
  {
    year: "2016",
    title: "First Major Client",
    description: "Partnered with Fortune 500 company for enterprise solution.",
  },
  {
    year: "2018",
    title: "Team Expansion",
    description: "Grew to 25+ team members across multiple countries.",
  },
  {
    year: "2020",
    title: "Global Reach",
    description: "Expanded services to clients in 15+ countries worldwide.",
  },
  {
    year: "2022",
    title: "Industry Award",
    description: "Recognized as Top Web Development Agency of the Year.",
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description: "Launched R&D division for emerging technologies.",
  },
];

const technologies = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Next.js",
  "Vue.js",
];

const lifeGallery = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop",
];

const MAX_VISIBLE_LIFE_IMAGES = 8;

const normalizeLifeImage = (image, index) => {
  if (typeof image === "string") {
    return {
      id: `default-life-${index}`,
      url: image,
      name: `Life at Izone ${index + 1}`,
    };
  }

  return {
    id: image.id || `life-${index}`,
    url: image.url,
    name: image.name || `Life at Izone ${index + 1}`,
  };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const timelineCardVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const timelineDotVariants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const timelineLineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const timelinePath =
  "M 0,50 Q 100,5 200,50 T 400,50 T 600,50 T 800,50 T 1000,50";

const stackItemVariants = {
  hidden: { opacity: 0, x: 72, y: 16, scale: 0.94, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.12, ease: [0.16, 1, 0.3, 1] },
  },
};

const stackGlowVariants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
  },
};

const frontendTechStack = [
  { label: "REACT", className: "" },
  { label: "TYPESCRIPT", className: "md:ml-24" },
  { label: "TAILWIND", className: "md:-ml-32" },
  { label: "NEXT.JS", className: "md:ml-32" },
  { label: "VUE.JS", className: "md:-ml-20" },
];

const About = () => {
  const { sitePhotos = [] } = useAdmin() || {};
  const timelineRef = useRef(null);
  const timelineCurveRef = useRef(null);
  const timelineInView = useInView(timelineRef, {
    once: true,
    amount: 0.25,
    margin: "-96px 0px -18% 0px",
  });
  const [timelinePlaying, setTimelinePlaying] = useState(false);
  const [timelineVisibleCount, setTimelineVisibleCount] = useState(0);
  const [timelineDotPoint, setTimelineDotPoint] = useState(null);
  const [selectedLifeImageIndex, setSelectedLifeImageIndex] = useState(null);
  const lifeImages = (sitePhotos.length > 0 ? sitePhotos : lifeGallery)
    .map(normalizeLifeImage)
    .filter((image) => image.url);
  const visibleLifeImages = lifeImages.slice(-MAX_VISIBLE_LIFE_IMAGES);
  const selectedLifeImage =
    selectedLifeImageIndex === null ? null : lifeImages[selectedLifeImageIndex];

  const openLifeImage = (image) => {
    const imageIndex = lifeImages.findIndex((item) => item.id === image.id);
    setSelectedLifeImageIndex(imageIndex >= 0 ? imageIndex : 0);
  };

  const showPreviousLifeImage = () => {
    setSelectedLifeImageIndex((current) =>
      current === null || current === 0 ? lifeImages.length - 1 : current - 1
    );
  };

  const showNextLifeImage = () => {
    setSelectedLifeImageIndex((current) =>
      current === null ? 0 : (current + 1) % lifeImages.length
    );
  };

  useEffect(() => {
    if (!timelineInView) return;

    const stepDuration = 1050;
    const revealDelay = 720;
    const timers = [];

    setTimelinePlaying(true);
    setTimelineVisibleCount(0);
    setTimelineDotPoint(null);

    milestones.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setTimelineVisibleCount((current) => Math.max(current, index + 1));
        }, index * stepDuration + revealDelay)
      );
    });

    let rafId = 0;
    const path = timelineCurveRef.current;
    if (path) {
      const length = path.getTotalLength();
      const animationDuration = milestones.length * 1.05 * 1000;
      const startedAt = window.performance.now();

      const updateDot = (now) => {
        const elapsed = now - startedAt;
        const progress = Math.min(1, elapsed / animationDuration);
        const point = path.getPointAtLength(length * progress);
        setTimelineDotPoint({ x: point.x, y: point.y });

        if (progress < 1) {
          rafId = window.requestAnimationFrame(updateDot);
        }
      };

      rafId = window.requestAnimationFrame(updateDot);
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [timelineInView]);

  return (
    <Layout>
      <AboutHero />

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-intent-card glass-card glow-border group"
            >
              <div className="about-intent-orb about-intent-orb-top" aria-hidden="true" />
              <div className="about-intent-panel" aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-white/20">
                  <Target className="w-7 h-7 text-primary transition-colors duration-500 group-hover:text-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-4 transition-colors duration-500 group-hover:text-foreground">
                  Our Mission
                </h2>
                <p className="text-muted-foreground transition-colors duration-500 group-hover:text-foreground/90">
                  To build dependable software, mobile, and AI solutions that improve our clients' efficiency, profitability, and customer experience — and to share that craft through hands-on training programs that grow the next generation of engineers
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-intent-card glass-card glow-border group"
            >
              <div className="about-intent-orb about-intent-orb-top" aria-hidden="true" />
              <div className="about-intent-panel" aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-white/20">
                  <Eye className="w-7 h-7 text-primary transition-colors duration-500 group-hover:text-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-4 transition-colors duration-500 group-hover:text-foreground">
                  Our Vision
                </h2>
                <p className="text-muted-foreground transition-colors duration-500 group-hover:text-foreground/90">
                  Our Vision is to provide a smart training with smart skills and
                  developing smart application and website with enthusiastically
                  and with innovative methods in full-fledged customer
                  satisfaction and beyond customer expectation
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              What Drives Us
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ValueCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-padding !pb-10 md:!pb-12">
        <div className="container-custom">
          {/* CEO Highlight Card */}
          <CEOCard
            name={ceoData.name}
            role={ceoData.role}
            description={ceoData.description}
            image="/ceo-portrait.png"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium">Our Team</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Meet the Experts
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative z-10 flex items-stretch hover:z-50 md:min-h-[270px]"
              >
                <ExpertCard
                  name={member.name}
                  role={member.role}
                  avatar={member.avatar}
                  bio={member.bio}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section
        ref={timelineRef}
        className="section-padding scroll-mt-28 bg-background overflow-hidden !pt-12 !pb-10 md:!pt-16 md:!pb-12"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left md:text-center mb-16 md:mb-8"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-zinc-900 tracking-wide">
              <span className="text-primary">Company</span> Timelines
            </h2>
          </motion.div>

          {/* Desktop Horizontal Timeline */}
          <div className="relative w-full max-w-6xl mx-auto hidden md:block mt-16 mb-8 px-8">
            {/* The animated connecting wave */}
            <div className="absolute left-[5.5rem] right-[5.5rem] top-1/2 -translate-y-1/2 h-32 z-0 pointer-events-none">
              <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 100"
                preserveAspectRatio="none"
                className="overflow-visible"
              >
                <motion.path
                  ref={timelineCurveRef}
                  id="timelineCurve"
                  d={timelinePath}
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  variants={timelineLineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.7 }}
                  style={{ filter: "drop-shadow(0 0 10px rgba(22, 163, 74, 0.28))" }}
                />
                <motion.path
                  d={timelinePath}
                  fill="none"
                  stroke="rgba(22,163,74,0.22)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ opacity: 0.15 }}
                  animate={{ opacity: [0.12, 0.24, 0.12] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                {timelinePlaying && timelineDotPoint && (
                  <g transform={`translate(${timelineDotPoint.x} ${timelineDotPoint.y})`}>
                    <circle
                      r="12"
                      fill="rgba(255,255,255,0.9)"
                      filter="url(#timelineGlow)"
                    />
                    <circle r="8" fill="#16a34a" />
                    <circle r="4.2" fill="#fffdf7" />
                  </g>
                )}
                <defs>
                  <filter id="timelineGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.25" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </motion.svg>
            </div>

            <div className="relative z-10 flex justify-between items-center w-full">
              {milestones.map((milestone, index) => {
                const isTop = index % 2 === 0;
                const isVisible = timelineVisibleCount > index;
                return (
                  <motion.div
                    variants={timelineCardVariants}
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    animate={
                      isVisible
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 24, filter: "blur(8px)" }
                    }
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    key={index}
                    className="flex flex-col items-center w-40 md:w-48 shrink-0 relative"
                  >
                    {/* Top Content */}
                    <div className="w-full flex flex-col justify-end min-h-[160px] pb-6">
                      {isTop && (
                        <div className="flex flex-col items-start w-full">
                          <div className="bg-primary text-white font-semibold px-3 py-1 rounded text-xs md:text-sm mb-3">
                            {milestone.year}
                          </div>
                          <h3 className="text-primary font-bold text-base md:text-lg mb-1 leading-tight tracking-wide">
                            {milestone.title}
                          </h3>
                          <p className="text-zinc-600 text-xs md:text-sm leading-snug">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center Node */}
                    <div className="relative flex flex-col items-center justify-center h-12 w-full z-10">
                      {isTop && (
                        <motion.div
                          aria-hidden="true"
                          className="absolute top-0 h-6 -mt-6 border-l-[2px] border-dotted border-[#16a34a]/80 origin-top"
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={isVisible ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        />
                      )}

                      <motion.div
                        variants={timelineDotVariants}
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#16a34a] border-[4px] md:border-[5px] border-white shadow-[0_0_12px_rgba(22,163,74,0.6)] z-10 relative"
                        whileHover={{ scale: 1.08 }}
                        animate={{
                          boxShadow: [
                            "0 0 12px rgba(22,163,74,0.55)",
                            "0 0 22px rgba(22,163,74,0.8)",
                            "0 0 12px rgba(22,163,74,0.55)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {!isTop && (
                        <motion.div
                          aria-hidden="true"
                          className="absolute bottom-0 h-6 -mb-6 border-l-[2px] border-dotted border-[#16a34a]/80 origin-bottom"
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={isVisible ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        />
                      )}
                    </div>

                    {/* Bottom Content */}
                    <div className="w-full flex flex-col justify-start min-h-[160px] pt-6">
                      {!isTop && (
                        <div className="flex flex-col items-start w-full">
                          <div className="bg-primary text-white font-semibold px-3 py-1 rounded text-xs md:text-sm mb-3">
                            {milestone.year}
                          </div>
                          <h3 className="text-primary font-bold text-base md:text-lg mb-1 leading-tight tracking-wide">
                            {milestone.title}
                          </h3>
                          <p className="text-zinc-600 text-xs md:text-sm leading-snug">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="relative max-w-sm mx-auto md:hidden pt-8 pb-12 px-6">
            <motion.div
              aria-hidden="true"
              className="absolute left-[33px] top-10 bottom-10 border-l-[2px] border-dotted border-[#16a34a]/50 origin-top"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={
                  timelineVisibleCount > index
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 24, filter: "blur(8px)" }
                }
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-12 mb-10 last:mb-0"
              >
                {/* Node */}
                <motion.div
                  variants={timelineDotVariants}
                  className="absolute left-[-5px] top-1.5 w-6 h-6 rounded-full bg-[#16a34a] border-[5px] border-white shadow-[0_0_10px_rgba(22,163,74,0.5)]"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(22,163,74,0.45)",
                      "0 0 18px rgba(22,163,74,0.8)",
                      "0 0 10px rgba(22,163,74,0.45)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Content */}
                <div className="flex flex-col items-start">
                  <div className="bg-primary text-white font-semibold px-3 py-1 rounded text-xs mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-primary font-bold text-base mb-1 leading-tight tracking-wide">
                    {milestone.title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-snug">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at Izone */}
      <section className="section-padding !pt-10 md:!pt-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium">Life at Izone</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Behind the Scenes
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {visibleLifeImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className="relative overflow-hidden rounded-xl aspect-video group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => openLifeImage(image)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openLifeImage(image);
                  }
                }}
              >
                <img
                  src={image.url}
                  alt={image.name || `Life at Izone ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {selectedLifeImage && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedLifeImageIndex(null)}
        >
          <div
            className="relative flex h-full w-full max-w-6xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close image preview"
              className="absolute right-0 top-0 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              onClick={() => setSelectedLifeImageIndex(null)}
            >
              <X className="h-5 w-5" />
            </button>

            {lifeImages.length > 1 && (
              <button
                type="button"
                aria-label="Show previous image"
                className="absolute left-0 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                onClick={showPreviousLifeImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <figure className="flex max-h-full max-w-full flex-col items-center gap-4 px-0 md:px-16">
              <img
                src={selectedLifeImage.url}
                alt={selectedLifeImage.name}
                className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl"
              />
              <figcaption className="max-w-2xl text-center text-sm font-medium text-white/85">
                {selectedLifeImage.name}
              </figcaption>
            </figure>

            {lifeImages.length > 1 && (
              <button
                type="button"
                aria-label="Show next image"
                className="absolute right-0 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                onClick={showNextLifeImage}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Technology Stack */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium">Our Stack</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Technologies We Master
            </h2>
          </motion.div>

          <div className="mx-auto grid w-full max-w-[880px] grid-cols-1 overflow-hidden rounded-3xl border border-white/10 glass-card relative md:min-h-[330px] md:grid-cols-2 lg:min-h-[350px]">
            <div className="absolute inset-0 hidden grid-cols-2 pointer-events-none md:grid">
              <div className="bg-gradient-to-r from-primary/20 to-primary/5" />
              <div className="bg-background/80" />
            </div>

            {/* Center glow effect */}
            <motion.div
              variants={stackGlowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-[84%] bg-primary/30 blur-[115px] pointer-events-none"
            />
            <motion.div
              variants={stackGlowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-28 rounded-full bg-primary/35 blur-2xl pointer-events-none"
            />

            {/* Left Side: Frontend */}
            <div className="relative z-10 flex flex-col items-center bg-gradient-to-b from-primary/10 to-primary/5 p-7 md:bg-transparent md:p-8">
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-8 text-center shadow-primary/45 drop-shadow-lg">
                Frontend Development
              </h3>

              <div className="w-full flex flex-col items-center gap-5 py-4 relative">
                {frontendTechStack.map((tech, index) => (
                  <motion.div
                    key={tech.label}
                    variants={stackItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ delay: index * 0.14 }}
                    animate={{
                      boxShadow: [
                        "0 0 14px rgba(255,255,255,0.02)",
                        "0 0 30px rgba(255,255,255,0.09)",
                        "0 0 14px rgba(255,255,255,0.02)",
                      ],
                    }}
                    className={`${tech.className} px-6 py-2 rounded-full bg-primary/20 border border-primary/45 text-foreground text-sm font-medium tracking-wider shadow-[0_0_30px_hsl(var(--primary)/0.42)] backdrop-blur-sm`}
                  >
                    {tech.label}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side: Backend */}
            <div className="relative z-10 flex flex-col items-center border-t border-white/10 p-7 md:border-t-0 md:p-8">
              <h3 className="font-display text-2xl md:text-3xl text-foreground/80 mb-8 text-center">
                Backend & Infrastructure
              </h3>

              <div className="w-full flex flex-col items-center gap-3 py-1">
                {["Node.js", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL", "MongoDB"].map((tech, index) => (
                  <motion.div
                    key={tech}
                    variants={stackItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ delay: index * 0.07 }}
                    animate={{
                      boxShadow: [
                        "0 0 24px hsl(var(--primary)/0.22)",
                        "0 0 40px hsl(var(--primary)/0.5)",
                        "0 0 24px hsl(var(--primary)/0.22)",
                      ],
                    }}
                    className="px-8 py-3 rounded-full border border-dashed border-foreground/40 text-foreground/86 font-medium tracking-wide bg-white/6 backdrop-blur-sm shadow-[0_0_18px_rgba(255,255,255,0.04)]"
                  >
                    {tech.toUpperCase()}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
