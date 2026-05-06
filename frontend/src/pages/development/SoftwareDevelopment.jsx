import { motion } from 'framer-motion';
import { Cpu, Database, Cloud, Settings, Shield, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import FlipCard from '../../components/ui/FlipCard';

const services = [
  {
    title: 'Custom Software Solutions',
    summary: 'Bespoke software solutions built specifically for your unique business needs.',
    fullContent: 'We develop custom software solutions that perfectly align with your workflows, processes, and business goals. From enterprise applications to specialized tools.',
    icon: <Cpu className="w-7 h-7 text-primary" />,
    features: ['Requirements Analysis', 'Custom Architecture', 'Agile Development', 'Quality Assurance', 'Ongoing Support'],
    shape3D: 'cube',
  },
  {
    title: 'Enterprise Applications',
    summary: 'Scalable enterprise software to streamline operations and boost productivity.',
    fullContent: 'Build robust enterprise applications including ERP systems, CRM platforms, inventory management, and workflow automation tools for large-scale operations.',
    icon: <Database className="w-7 h-7 text-primary" />,
    features: ['ERP Systems', 'CRM Development', 'Inventory Management', 'Workflow Automation', 'Business Intelligence'],
    shape3D: 'sphere',
  },
  {
    title: 'Cloud Solutions',
    summary: 'Modern cloud-native applications with seamless scalability and reliability.',
    fullContent: 'Leverage cloud technologies for scalable, secure, and cost-effective solutions. We build applications on AWS, Azure, and Google Cloud platforms.',
    icon: <Cloud className="w-7 h-7 text-primary" />,
    features: ['AWS/Azure/GCP', 'Microservices', 'Serverless Architecture', 'Auto-Scaling', 'Cloud Migration'],
    shape3D: 'torus',
  },
  {
    title: 'System Integration',
    summary: 'Connect and unify your existing systems for seamless data synchronization.',
    fullContent: 'Integrate disparate systems, APIs, and databases to create a unified ecosystem. Enable real-time data synchronization and automated workflows across platforms.',
    icon: <Settings className="w-7 h-7 text-primary" />,
    features: ['API Integration', 'Data Migration', 'Legacy Modernization', 'Third-party Connect', 'Real-time Sync'],
    shape3D: 'octahedron',
  },
  {
    title: 'Security & Compliance',
    summary: 'Robust security implementation and comprehensive regulatory compliance.',
    fullContent: 'Ensure your software meets the highest security standards with encryption, access controls, audit logging, and compliance with industry regulations.',
    icon: <Shield className="w-7 h-7 text-primary" />,
    features: ['Security Audits', 'Encryption', 'Access Control', 'HIPAA/GDPR', 'Penetration Testing'],
    shape3D: 'cube',
  },
  {
    title: 'DevOps & Deployment',
    summary: 'Efficient development and deployment with modern, automated DevOps.',
    fullContent: 'Implement CI/CD pipelines, infrastructure as code, and automated testing to ensure fast, reliable, and consistent software delivery.',
    icon: <Rocket className="w-7 h-7 text-primary" />,
    features: ['CI/CD Pipelines', 'Docker/Kubernetes', 'Automated Testing', 'Monitoring', 'Infrastructure as Code'],
    shape3D: 'sphere',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const SoftwareDevelopment = () => {
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
              Software Development
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Build Powerful
              <span className="gradient-text block">Software Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Custom software development that transforms your ideas 
              into powerful, scalable applications.
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
                Ready to Build Your Software?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's discuss your project and create a powerful solution together.
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

export default SoftwareDevelopment;
