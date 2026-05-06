import { motion } from 'framer-motion';
import { Megaphone, Target, TrendingUp, Users, Sparkles, PieChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import FlipCard from '../../components/ui/FlipCard';

const services = [
  {
    title: 'Marketing Campaigns',
    summary: 'Create engaging WhatsApp marketing campaigns that convert and drive sales.',
    fullContent: 'Design and execute high-converting WhatsApp marketing campaigns with rich media, interactive buttons, and compelling CTAs to maximize your marketing ROI.',
    icon: <Megaphone className="w-7 h-7 text-primary" />,
    features: ['Rich Media Campaigns', 'Interactive Buttons', 'Carousel Messages', 'Quick Replies', 'Campaign Templates'],
    shape3D: 'cube',
  },
  {
    title: 'Targeted Messaging',
    summary: 'Reach the right audience with precision targeting and segmentation.',
    fullContent: 'Leverage advanced targeting options to segment your audience based on behavior, demographics, and preferences for personalized messaging that resonates.',
    icon: <Target className="w-7 h-7 text-primary" />,
    features: ['Audience Segmentation', 'Behavior Targeting', 'Custom Attributes', 'Lookalike Audiences', 'Retargeting'],
    shape3D: 'sphere',
  },
  {
    title: 'Growth Strategies',
    summary: 'Grow your WhatsApp subscriber base with proven opt-in strategies.',
    fullContent: 'Build your WhatsApp audience with click-to-WhatsApp ads, QR codes, website widgets, and landing pages designed to capture and convert leads.',
    icon: <TrendingUp className="w-7 h-7 text-primary" />,
    features: ['Click-to-WhatsApp Ads', 'QR Code Generation', 'Website Widgets', 'Landing Pages', 'Referral Programs'],
    shape3D: 'torus',
  },
  {
    title: 'Customer Engagement',
    summary: 'Build lasting relationships with personalized customer engagement.',
    fullContent: 'Keep your customers engaged with timely updates, personalized offers, loyalty programs, and interactive content that builds brand loyalty.',
    icon: <Users className="w-7 h-7 text-primary" />,
    features: ['Drip Campaigns', 'Loyalty Programs', 'Birthday Messages', 'Re-engagement', 'Feedback Collection'],
    shape3D: 'octahedron',
  },
  {
    title: 'Creative Content',
    summary: 'Stand out with creative and engaging WhatsApp content that captures attention.',
    fullContent: 'Create scroll-stopping content with our creative team including videos, animations, interactive catalogs, and compelling copy that drives action.',
    icon: <Sparkles className="w-7 h-7 text-primary" />,
    features: ['Video Content', 'Animated Stickers', 'Product Catalogs', 'Copywriting', 'Brand Templates'],
    shape3D: 'cube',
  },
  {
    title: 'Performance Analytics',
    summary: 'Measure and optimize your campaigns with comprehensive analytics.',
    fullContent: 'Track every aspect of your WhatsApp marketing with detailed analytics on delivery, engagement, conversions, and ROI to continuously improve performance.',
    icon: <PieChart className="w-7 h-7 text-primary" />,
    features: ['Delivery Tracking', 'Engagement Metrics', 'Conversion Tracking', 'ROI Analysis', 'A/B Testing'],
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

const WhatsappMarketing = () => {
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
              WhatsApp Marketing
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Marketing That
              <span className="gradient-text block">Converts</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Unlock the power of WhatsApp marketing to engage customers 
              and drive business growth.
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
                Ready to Boost Your Marketing?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Transform your marketing with WhatsApp campaigns that deliver results.
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

export default WhatsappMarketing;
