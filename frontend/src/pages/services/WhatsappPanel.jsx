import { motion } from 'framer-motion';
import { MessageCircle, Users, Bot, LayoutDashboard, Zap, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import FlipCard from '../../components/ui/FlipCard';

const services = [
  {
    title: 'WhatsApp Business API',
    summary: 'Official WhatsApp Business API integration for enterprise-grade messaging.',
    fullContent: 'Connect with the official WhatsApp Business API to send notifications, updates, and engage with customers through the world\'s most popular messaging platform.',
    icon: <MessageCircle className="w-7 h-7 text-primary" />,
    features: ['Official API', 'Green Tick Verified', 'Template Messages', 'Session Messages', 'Media Support'],
    shape3D: 'cube',
  },
  {
    title: 'Multi-Agent Dashboard',
    summary: 'Manage multiple agents and conversations from a centralized dashboard.',
    fullContent: 'Enable your team to handle customer conversations efficiently with our multi-agent dashboard featuring assignment rules, collaboration tools, and performance tracking.',
    icon: <Users className="w-7 h-7 text-primary" />,
    features: ['Agent Management', 'Chat Assignment', 'Team Collaboration', 'Performance Stats', 'Role Permissions'],
    shape3D: 'sphere',
  },
  {
    title: 'Chatbot Integration',
    summary: 'Automate responses and customer support with intelligent chatbots.',
    fullContent: 'Build and deploy AI-powered chatbots to handle common queries, qualify leads, and provide 24/7 customer support without human intervention.',
    icon: <Bot className="w-7 h-7 text-primary" />,
    features: ['Flow Builder', 'AI Responses', 'Quick Replies', 'Human Handoff', 'Intent Detection'],
    shape3D: 'torus',
  },
  {
    title: 'Campaign Manager',
    summary: 'Create and manage bulk WhatsApp campaigns with advanced targeting.',
    fullContent: 'Design, schedule, and send targeted WhatsApp campaigns to your audience segments with rich media support, tracking, and compliance management.',
    icon: <LayoutDashboard className="w-7 h-7 text-primary" />,
    features: ['Bulk Messaging', 'Rich Media', 'Audience Segments', 'Campaign Analytics', 'Template Manager'],
    shape3D: 'octahedron',
  },
  {
    title: 'API Integration',
    summary: 'Integrate WhatsApp with your existing systems through our robust APIs.',
    fullContent: 'Connect your CRM, e-commerce platform, or custom applications with our comprehensive API for seamless WhatsApp communication automation.',
    icon: <Zap className="w-7 h-7 text-primary" />,
    features: ['REST APIs', 'Webhooks', 'CRM Integration', 'E-commerce Sync', 'Custom Workflows'],
    shape3D: 'cube',
  },
  {
    title: 'Security & Compliance',
    summary: 'Enterprise-grade security with full WhatsApp policy compliance.',
    fullContent: 'Ensure your messaging is secure and compliant with WhatsApp policies, data protection regulations, and enterprise security standards.',
    icon: <Lock className="w-7 h-7 text-primary" />,
    features: ['End-to-End Encryption', 'GDPR Compliant', 'Policy Adherence', 'Data Protection', 'Audit Logs'],
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

const WhatsappPanel = () => {
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
              WhatsApp Panel
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Complete WhatsApp
              <span className="gradient-text block">Control Center</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage all your WhatsApp business communications from one 
              powerful, feature-rich dashboard.
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
                Ready to Transform Your WhatsApp?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Get started with our WhatsApp Business Panel today.
              </p>
              <Link to="/contact">
                <Button size="lg" className="glow-border hover-glow">
                  Get Started
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

export default WhatsappPanel;
