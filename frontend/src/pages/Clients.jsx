import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, Globe, Award, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useAdmin } from "@/context/AdminContext";
import { useIsMobile } from "@/hooks/use-mobile";

const defaultClients = [
  {
    name: "TechCorp Industries",
    logo: "TC",
    industry: "Technology",
    description: "Enterprise software solutions and digital transformation.",
  },
  {
    name: "Global Finance Ltd",
    logo: "GF",
    industry: "Finance",
    description: "Secure banking and financial services platform.",
  },
  {
    name: "HealthCare Plus",
    logo: "HC",
    industry: "Healthcare",
    description: "Patient management and telemedicine solutions.",
  },
  {
    name: "EduLearn Academy",
    logo: "EL",
    industry: "Education",
    description: "Online learning platform and student management.",
  },
  {
    name: "RetailMax Stores",
    logo: "RM",
    industry: "Retail",
    description: "E-commerce and inventory management systems.",
  },
  {
    name: "GreenEnergy Co",
    logo: "GE",
    industry: "Energy",
    description: "Smart grid and renewable energy solutions.",
  },
  {
    name: "MediaHub Network",
    logo: "MH",
    industry: "Media",
    description: "Content management and streaming platform.",
  },
  {
    name: "LogiTrans Solutions",
    logo: "LT",
    industry: "Logistics",
    description: "Fleet management and supply chain optimization.",
  },
];

const MAX_VISIBLE_CLIENTS = 8;

const getVisibleClients = (clients) => clients.slice(-MAX_VISIBLE_CLIENTS);

const defaultTestimonials = [
  {
    quote:
      "Izone Technologies transformed our digital presence completely. Their team delivered beyond our expectations with innovative solutions.",
    author: "Rajesh Kumar",
    position: "CEO, TechCorp Industries",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    quote:
      "The WhatsApp marketing campaign they designed for us increased our customer engagement by 300%. Truly remarkable results.",
    author: "Priya Sharma",
    position: "Marketing Head, RetailMax",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    quote:
      "Their software development team built a robust platform that handles millions of transactions daily. Highly recommended!",
    author: "Amit Patel",
    position: "CTO, Global Finance Ltd",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
];

const getAvatarFallback = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "Client"
  )}&background=16A34A&color=ffffff`;

const normalizeTestimonial = (testimonial) => {
  const author = testimonial?.author?.trim() || "Client";
  const quote = testimonial?.quote?.trim();
  const role = testimonial?.role?.trim() || testimonial?.position?.trim() || "";
  const avatar = testimonial?.avatar?.trim() || getAvatarFallback(author);

  return quote
    ? {
        ...testimonial,
        author,
        quote,
        role,
        position: testimonial?.position?.trim() || role,
        avatar,
      }
    : null;
};

const stats = [
  {
    icon: <Building2 className="w-8 h-8" />,
    value: "500+",
    label: "Clients Served",
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: "50M+",
    label: "Users Reached",
  },
  { icon: <Globe className="w-8 h-8" />, value: "25+", label: "Countries" },
  {
    icon: <Award className="w-8 h-8" />,
    value: "99%",
    label: "Satisfaction Rate",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Clients = () => {
  const { clients: adminClients, testimonials: adminTestimonials } = useAdmin();
  const isMobile = useIsMobile();
  const clients = getVisibleClients(adminClients.length > 0 ? adminClients : defaultClients);
  const testimonialSource =
    adminTestimonials.length > 0 ? [...adminTestimonials].reverse() : defaultTestimonials;
  const testimonials = testimonialSource.map(normalizeTestimonial).filter(Boolean);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const visibleTestimonials = Array.from(
    { length: Math.min(3, testimonials.length) },
    (_, index) => {
      const testimonialPosition = (testimonialIndex + index) % testimonials.length;
      return testimonials[testimonialPosition];
    }
  );
  const displayedTestimonials = isMobile
    ? visibleTestimonials.slice(0, 1)
    : visibleTestimonials;

  useEffect(() => {
    if (testimonialIndex >= testimonials.length) {
      setTestimonialIndex(0);
    }
  }, [testimonialIndex, testimonials.length]);

  const getTestimonialRating = (rating) => {
    const value = Number(rating);
    return Number.isFinite(value) && value > 0 ? value : 5;
  };

  const getTestimonialAvatar = (testimonial) => {
    return testimonial.avatar || getAvatarFallback(testimonial.author);
  };

  const getTestimonialRole = (testimonial) => {
    return testimonial.role || testimonial.position;
  };

  const showPreviousTestimonials = () => {
    setTestimonialIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const showNextTestimonials = () => {
    setTestimonialIndex((current) => (current + 1) % testimonials.length);
  };

  const handleTestimonialSwipe = (_, info) => {
    const swipeDistance = info.offset.x;
    const swipeVelocity = info.velocity.x;

    if (swipeDistance < -50 || swipeVelocity < -500) {
      showNextTestimonials();
    }

    if (swipeDistance > 50 || swipeVelocity > 500) {
      showPreviousTestimonials();
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-20 md:pb-24 px-4 md:px-8 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              Our Clients
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Trusted by
              <span className="block mt-2 overflow-visible">
                <span className="inline-block leading-[1.25] pb-[0.15em] gradient-text -mt-7">
                  Industry Leaders
                </span>
              </span>
            </h1>
            <p className="text-lg text-muted-foreground -mt-5">
              We partner with ambitious brands across industries and help them launch clearer, stronger digital experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href="#our-valued-partners"
                className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium hover:bg-primary/20 transition-all text-sm"
              >
                Explore partners
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 text-sm"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="clients-stats" className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-6 text-center hover-glow"
              >
                <div className="text-primary mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clients Grid */}
      <section id="our-valued-partners" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our Valued <span className="gradient-text">Partners</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From startups to enterprises, we've helped businesses across
              industries achieve their digital goals.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {clients.map((client, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-6 group hover-glow cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="font-display text-xl font-bold text-primary">
                    {client.logo}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {client.name}
                </h3>
                <p className="text-primary text-sm mb-2">{client.industry}</p>
                <p className="text-muted-foreground text-sm">
                  {client.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-zinc-100/30 dark:bg-zinc-950/20">
        <div className="container-custom">
          <div className="relative mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <span className="font-['Dancing_Script'] text-[#16A34A] text-3xl md:text-4xl -rotate-2">
                Client
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tighter text-zinc-900 dark:text-white mt-1">
                Testimonial
              </h2>
            </motion.div>
            <div className="mt-6 hidden items-center justify-center gap-3 md:absolute md:right-0 md:top-[62%] md:mt-0 md:flex md:-translate-y-1/2">
              <button
                type="button"
                onClick={showPreviousTestimonials}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#16A34A]/40 bg-white text-[#33353D] shadow-sm transition hover:bg-[#16A34A] hover:text-white dark:bg-zinc-900 dark:text-white"
                aria-label="Show previous testimonials"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNextTestimonials}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#16A34A]/40 bg-white text-[#33353D] shadow-sm transition hover:bg-[#16A34A] hover:text-white dark:bg-zinc-900 dark:text-white"
                aria-label="Show next testimonials"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10 xl:gap-12"
          >
            {displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${isMobile ? "mobile" : "desktop"}-${testimonialIndex}-${index}`}
                variants={itemVariants}
                drag={isMobile && index === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                dragMomentum={false}
                onDragEnd={index === 0 ? handleTestimonialSwipe : undefined}
                className={`relative w-full max-w-[380px] mx-auto group ${isMobile ? "touch-pan-y" : ""}`}
              >
                <div className="relative overflow-hidden min-h-[330px] md:min-h-[360px] md:aspect-square flex flex-col shadow-2xl rounded-sm border border-black/5">
                  <div className="h-[40%] md:h-[44%] w-full bg-white transition-colors duration-500" />
                  <div className="flex-1 w-full bg-[#33353D] transition-colors duration-500" />

                  <div className="absolute inset-0 flex flex-col items-center p-6 md:p-8 pointer-events-none">
                    <div className="absolute inset-4 border border-[#33353D]/10 dark:border-white/5 rounded-lg z-0 transition-opacity group-hover:opacity-40" />

                    <div className="relative z-10 w-full h-full flex flex-col items-center pointer-events-auto">
                      <div className="absolute top-0 left-0 text-[#33353D]/10">
                        <Quote className="w-14 h-14 -scale-x-100 opacity-20" strokeWidth={0.5} />
                      </div>

                      <div className="relative mt-2 mb-4 md:mb-6">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-[#16A34A] p-1 shadow-xl bg-white">
                          <img
                            src={getTestimonialAvatar(testimonial)}
                            alt={testimonial.author}
                            className="w-full h-full rounded-full object-cover shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="text-center group-hover:translate-y-[-2px] transition-transform duration-300">
                        <h3 className="font-bold text-lg text-white leading-tight mb-1">
                          {testimonial.author}
                        </h3>
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-4">
                          {getTestimonialRole(testimonial)}
                        </p>

                        <div className="flex justify-center gap-0.5 mb-4 md:mb-6">
                          {[...Array(getTestimonialRating(testimonial.rating))].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#16A34A] text-[#16A34A]" />
                          ))}
                        </div>

                        <div className="relative px-2">
                          <p className="text-zinc-300 text-[13px] leading-relaxed italic md:line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                            "{testimonial.quote}"
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-4 right-0 text-white/5">
                        <Quote className="w-14 h-14 opacity-20" strokeWidth={0.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Join Our Growing List of Clients
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's discuss how we can help your business achieve its digital
                goals.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Started Today
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Clients;
