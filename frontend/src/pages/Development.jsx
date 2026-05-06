import { motion } from "framer-motion";
import {
  Code,
  Globe,
  Smartphone,
  Database,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import FlipCard from "../components/ui/FlipCard";

const services = [
  {
    title: "Custom Web Applications",
    summary:
      "Bespoke web applications built from scratch using modern, scalable frameworks.",
    fullContent:
      "We create bespoke web applications that perfectly align with your business requirements. Our team uses cutting-edge technologies including React, Next.js, Vue.js, and Angular to deliver scalable, maintainable solutions.",
    icon: <Code className="w-7 h-7 text-primary" />,
    features: [
      "React & Next.js",
      "Vue.js & Nuxt",
      "TypeScript",
      "State Management",
      "API Integration",
      "QA & Launch",
    ],
    shape3D: "cube",
  },
  {
    title: "Responsive Design",
    summary:
      "Mobile-first designs that look stunning and perform perfectly across all devices.",
    fullContent:
      "Every website we build is fully responsive, ensuring a seamless experience from smartphones to large desktop monitors. We implement mobile-first strategies and test across multiple devices.",
    icon: <Smartphone className="w-7 h-7 text-primary" />,
    features: [
      "Mobile-First Approach",
      "Cross-Browser Testing",
      "Fluid Layouts",
      "Touch Optimization",
      "PWA Support",
    ],
    shape3D: "sphere",
  },
  {
    title: "E-Commerce Solutions",
    summary:
      "Secure online stores with high-performance payments and inventory management.",
    fullContent:
      "Build your online store with powerful e-commerce features including product management, secure checkout, payment gateway integration, and real-time analytics to grow your business.",
    icon: <Globe className="w-7 h-7 text-primary" />,
    features: [
      "Shopify & WooCommerce",
      "Custom Storefronts",
      "Payment Integration",
      "Inventory System",
      "Order Management",
    ],
    shape3D: "torus",
  },
  {
    title: "Backend Development",
    summary:
      "Robust server-side solutions built with modern Node.js and cloud infrastructure.",
    fullContent:
      "Our backend expertise includes building RESTful APIs, GraphQL services, microservices architecture, and database design to power your applications with reliable, scalable infrastructure.",
    icon: <Database className="w-7 h-7 text-primary" />,
    features: [
      "Node.js & Express",
      "Python & Django",
      "GraphQL APIs",
      "PostgreSQL & MongoDB",
      "Redis Caching",
    ],
    shape3D: "octahedron",
  },
  {
    title: "Security & Compliance",
    summary:
      "Enterprise-grade security implementation to protect your data and ensure compliance.",
    fullContent:
      "We implement industry-standard security measures including SSL/TLS encryption, input validation, authentication systems, and regular security audits to keep your applications safe.",
    icon: <Shield className="w-7 h-7 text-primary" />,
    features: [
      "SSL/TLS Encryption",
      "OAuth & JWT",
      "GDPR Compliance",
      "Security Audits",
      "Penetration Testing",
    ],
    shape3D: "cube",
  },
  {
    title: "Performance Optimization",
    summary:
      "High-performance applications optimized for speed, SEO, and user experience.",
    fullContent:
      "Speed matters. We optimize every aspect of your application from code splitting and lazy loading to CDN integration and database query optimization for the best performance.",
    icon: <Zap className="w-7 h-7 text-primary" />,
    features: [
      "Code Splitting",
      "Image Optimization",
      "CDN Integration",
      "Core Web Vitals",
      "SEO Best Practices",
    ],
    shape3D: "sphere",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const Development = () => {
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
              Development
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Development
              <span className="gradient-text block">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Modern, scalable soutions built with the latest technologies to launch faster, support growth,and keep your product experience polished.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <FlipCard
                key={index}
                title={service.title}
                summary={service.summary}
                fullContent={service.fullContent}
                icon={service.icon}
                features={service.features}
                delay={index * 0.1}
                desktopComfort={true}
                serviceLayout={true}
              />
            ))}
          </motion.div>
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
                Ready to Build Your Website?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's discuss your project and create something extraordinary
                together.
              </p>
              <Link to="/contact">
                <Button size="lg" className="glow-border hover-glow">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Development;
