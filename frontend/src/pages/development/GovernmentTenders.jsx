import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  FileCheck2,
  Landmark,
  SearchCheck,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Layout from "../../components/Layout";
import FlipCard from "../../components/ui/FlipCard";

const services = [
  {
    title: "Minnagam Support",
    summary:
      "Service support content tailored for Minnagam workflows, grievance updates, and citizen-response handling.",
    fullContent:
      "We provide dedicated support for Minnagam-related operations, helping teams manage electricity service requests, consumer grievances, complaint tracking, and response coordination with clear process visibility.",
    icon: <SearchCheck className="w-7 h-7 text-primary" />,
    features: [
      "Complaint Monitoring",
      "Service Request Updates",
      "Consumer Response Tracking",
      "Issue Escalation Support",
      "Process Coordination",
    ],
    shape3D: "cube",
  },
  {
    title: "Documentation Support",
    summary:
      "Structured preparation of tender documents, eligibility proof, and submission packs.",
    fullContent:
      "We organize eligibility records, technical documents, and submission checklists so your bids are complete, compliant, and easier to manage.",
    icon: <FileCheck2 className="w-7 h-7 text-primary" />,
    features: [
      "Document Checklists",
      "Compliance Review",
      "Eligibility Support",
      "Submission Packs",
      "Format Validation",
    ],
    shape3D: "sphere",
  },
  {
    title: "Proposal Preparation",
    summary:
      "Clear, persuasive bid responses tailored to scope, evaluation criteria, and timelines.",
    fullContent:
      "We support technical and commercial proposal preparation with content structure, response drafting, and alignment to tender requirements.",
    icon: <Briefcase className="w-7 h-7 text-primary" />,
    features: [
      "Technical Responses",
      "Commercial Structuring",
      "Scope Alignment",
      "Executive Summaries",
      "Response Editing",
    ],
    shape3D: "torus",
  },
  {
    title: "Portal Assistance",
    summary:
      "Guidance for registrations, uploads, and digital submission workflows on tender portals.",
    fullContent:
      "We assist with portal readiness, account setup, digital signatures, file uploads, and submission sequencing to reduce last-minute issues.",
    icon: <Landmark className="w-7 h-7 text-primary" />,
    features: [
      "Portal Registration",
      "DSC Guidance",
      "Upload Support",
      "Submission Review",
      "Deadline Coordination",
    ],
    shape3D: "octahedron",
  },
  {
    title: "Compliance & Risk Review",
    summary:
      "Reduce bid rejection risk with focused checks on mandatory clauses and supporting records.",
    fullContent:
      "We review mandatory clauses, declarations, supporting attachments, and consistency across the submission to help prevent avoidable disqualifications.",
    icon: <Shield className="w-7 h-7 text-primary" />,
    features: [
      "Clause Review",
      "Attachment Checks",
      "Risk Flags",
      "Consistency Review",
      "Submission Readiness",
    ],
    shape3D: "cube",
  },
  {
    title: "Bid Management",
    summary:
      "Ongoing coordination across teams so tender deadlines and approvals stay on track.",
    fullContent:
      "We support internal coordination between business, finance, compliance, and delivery teams to keep the bid process organized from intake to submission.",
    icon: <Users className="w-7 h-7 text-primary" />,
    features: [
      "Task Coordination",
      "Stakeholder Follow-Up",
      "Timeline Control",
      "Approval Tracking",
      "Bid Handover",
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

const GovernmentTenders = () => {
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
              Government Tenders
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Government Tender
              <span className="gradient-text block">Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Digital platforms that simplify Government procurement, connecting vendors, contractors, and deparments seamlessly.
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
                Need Help With Tender Preparation?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let&apos;s organize your bid process and improve submission
                readiness from day one.
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

export default GovernmentTenders;
