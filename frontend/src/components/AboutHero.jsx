import { motion } from "framer-motion";

const AboutHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[86svh] overflow-hidden bg-background text-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,163,74,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(22,163,74,0.08),transparent_18%),linear-gradient(180deg,rgba(232,235,235,0.95)_0%,rgba(232,235,235,1)_100%)]" />
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle,rgba(120,113,108,0.08)_1px,transparent_1px)] bg-[length:56px_56px]" />

      <div className="relative z-10 container-custom px-4 md:px-8 pt-40 pb-24 md:pt-32 md:pb-20 min-h-[86svh] flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]"
        >
          <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#16a34a]/25 bg-[#16a34a]/10 px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[#14532d] backdrop-blur-md shadow-[0_0_24px_rgba(22,163,74,0.12)]">
                About Us
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-zinc-900"
            >
              <span className="block text-zinc-900">Innovating the</span>
              <span className="block">
                <span className="text-primary">
                  Digital
                </span>{" "}
                <span className="text-primary">
                  Landscape
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-7 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-zinc-700"
            >
              Izone Technology was established in 2016 at Trichy with diverse
              knowledge. We deliver web designing and development, software and
              mobile app development, bulk messaging solutions, and career
              development programs with clarity, quality, and long-term growth.
            </motion.p>

          </div>

          <motion.div
            variants={itemVariants}
            className="relative min-h-[300px] lg:min-h-[430px]"
          >
            <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-[#16a34a]/18 blur-3xl" />
            <div className="absolute -right-4 top-0 h-28 w-28 rounded-full bg-[#8b5cf6]/12 blur-3xl" />

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1.2, 0],
                borderRadius: [
                  "40% 60% 56% 44% / 36% 42% 58% 64%",
                  "46% 54% 48% 52% / 44% 36% 64% 56%",
                  "40% 60% 56% 44% / 36% 42% 58% 64%",
                ],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-full overflow-hidden border border-zinc-200 bg-white/88 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.10)] backdrop-blur-xl lg:p-3.5"
              style={{
                clipPath: "polygon(5% 0%, 95% 0%, 100% 8%, 100% 92%, 95% 100%, 5% 100%, 0% 92%, 0% 8%)",
              }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(22,163,74,0.03)),radial-gradient(circle_at_25%_18%,rgba(22,163,74,0.14),transparent_26%),radial-gradient(circle_at_82%_76%,rgba(139,92,246,0.08),transparent_24%)]" />
              <div className="absolute inset-[10px] border border-dashed border-zinc-200/70 pointer-events-none" />

              <motion.div
                animate={{ scale: [1, 1.03, 1], x: [0, 4, 0] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full overflow-hidden border border-zinc-200 bg-[#f6f8f5] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                style={{
                  borderRadius: "32% 68% 58% 42% / 30% 42% 58% 70%",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=1600&fit=crop"
                  alt="About Izone showcase"
                  className="h-full w-full object-cover object-center opacity-95"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,245,0.06),rgba(255,248,235,0.28))]" />
                <div className="absolute inset-x-0 top-0 h-12 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent)]" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
