import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Bot,
  Database,
  LineChart,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Layout from "../../components/Layout";
import FlipCard from "../../components/ui/FlipCard";

const services = [
  {
    title: "AI Strategy",
    summary:
      "Practical AI roadmaps aligned with business goals, data maturity, and delivery timelines.",
    fullContent:
      "We help teams identify the right AI use cases, define measurable outcomes, and plan implementation in a way that balances speed, cost, and long-term maintainability.",
    icon: <Brain className="w-7 h-7 text-primary" />,
    features: [
      "Use-Case Discovery",
      "Feasibility Analysis",
      "Roadmap Planning",
      "Model Selection",
      "ROI Mapping",
    ],
    shape3D: "cube",
  },
  {
    title: "Machine Learning Models",
    summary:
      "Custom ML systems for prediction, classification, recommendation, and automation.",
    fullContent:
      "From structured business data to domain-specific prediction pipelines, we build machine learning solutions that are tuned for accuracy, interpretability, and production use.",
    icon: <Bot className="w-7 h-7 text-primary" />,
    features: [
      "Prediction Models",
      "Classification",
      "Recommendation Engines",
      "Anomaly Detection",
      "Model Evaluation",
    ],
    shape3D: "sphere",
  },
  {
    title: "Data Engineering",
    summary:
      "Reliable data pipelines that prepare, clean, and organize information for AI workloads.",
    fullContent:
      "Good AI starts with good data. We design data flows, transformation logic, and storage layers that keep your AI systems consistent, traceable, and ready for scale.",
    icon: <Database className="w-7 h-7 text-primary" />,
    features: [
      "Data Pipelines",
      "ETL Workflows",
      "Data Labeling",
      "Feature Engineering",
      "Warehouse Integration",
    ],
    shape3D: "torus",
  },
  {
    title: "MLOps Deployment",
    summary:
      "Versioned model delivery, monitoring, and retraining pipelines for production systems.",
    fullContent:
      "We operationalize machine learning with deployment workflows, model versioning, monitoring, and feedback loops so AI features remain stable after launch.",
    icon: <Workflow className="w-7 h-7 text-primary" />,
    features: [
      "Model Versioning",
      "CI/CD for ML",
      "Monitoring",
      "Retraining Pipelines",
      "Performance Tracking",
    ],
    shape3D: "octahedron",
  },
  {
    title: "Analytics & Insights",
    summary:
      "Dashboards and reporting layers that turn model output into usable business decisions.",
    fullContent:
      "We connect model results to dashboards, reporting tools, and decision workflows so your team can act on insights instead of chasing raw outputs.",
    icon: <LineChart className="w-7 h-7 text-primary" />,
    features: [
      "Insight Dashboards",
      "Forecast Reporting",
      "Business KPIs",
      "Alert Systems",
      "Decision Support",
    ],
    shape3D: "cube",
  },
  {
    title: "Responsible AI",
    summary:
      "Security, governance, and transparent controls for dependable AI adoption.",
    fullContent:
      "We design AI systems with governance in mind, including access control, auditing, quality checks, and safeguards that reduce operational and compliance risk.",
    icon: <ShieldCheck className="w-7 h-7 text-primary" />,
    features: [
      "Governance Controls",
      "Audit Trails",
      "Bias Review",
      "Access Management",
      "Risk Mitigation",
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

const AiMl = () => {
  return (
    <Layout>
      <section className="pt-40 pb-24 px-4 md:px-8 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              AI & Machine Learning
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Intelligent Solutions
              <span className="gradient-text block">Powered by AI</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform your business with cutting-edge artificial intelligence and machine learning solutions built for real-world impact.
            </p>
          </motion.div>
        </div>
      </section>

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
                desktopComfort={true}
                use3D={true}
                shape3D={service.shape3D}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </section>

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
                Ready to Add AI to Your Workflow?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let&apos;s build an AI solution that fits your process and scales
                with your business.
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

export default AiMl;
