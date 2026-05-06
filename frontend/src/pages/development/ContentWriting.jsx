import { motion } from 'framer-motion';
import { PenTool, FileText, BookOpen, Search, Mail, Newspaper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import FlipCard from '../../components/ui/FlipCard';


const services = [
  {
    title: 'Blog Writing',
    summary: 'Engaging blog posts that educate, entertain, and convert your audience.',
    fullContent: 'Our expert writers create compelling blog content optimized for both readers and search engines. We research trending topics, incorporate keywords naturally, and maintain your brand voice.',
    icon: <PenTool className="w-7 h-7 text-primary" />,
    features: ['Topic Research', 'SEO Optimization', 'Engaging Headlines', 'Internal Linking', 'Call-to-Actions'],
    shape3D: 'cube',
  },
  {
    title: 'Website Copywriting',
    summary: 'Persuasive web copy that communicates your value and drives action.',
    fullContent: 'From homepage heroes to product descriptions, we craft website copy that clearly communicates your unique value proposition and guides visitors toward conversion.',
    icon: <FileText className="w-7 h-7 text-primary" />,
    features: ['Homepage Copy', 'Landing Pages', 'Product Descriptions', 'About Us Pages', 'Service Pages'],
    shape3D: 'sphere',
  },
  {
    title: 'SEO Content',
    summary: 'Search-optimized content that ranks and drives organic traffic.',
    fullContent: 'We create content specifically designed to rank on search engines. Our SEO writing process includes keyword research, competitor analysis, and on-page optimization.',
    icon: <Search className="w-7 h-7 text-primary" />,
    features: ['Keyword Research', 'Meta Descriptions', 'Header Optimization', 'Featured Snippets', 'Content Clusters'],
    shape3D: 'torus',
  },
  {
    title: 'Email Marketing',
    summary: 'Email campaigns that engage subscribers and drive conversions.',
    fullContent: 'From welcome sequences to promotional campaigns, we write emails that get opened, read, and clicked. Our approach combines compelling copy with proven email marketing strategies.',
    icon: <Mail className="w-7 h-7 text-primary" />,
    features: ['Welcome Sequences', 'Newsletters', 'Promotional Emails', 'Drip Campaigns', 'A/B Testing Copy'],
    shape3D: 'octahedron',
  },
  {
    title: 'Technical Writing',
    summary: 'Clear, concise documentation and technical content for complex topics.',
    fullContent: 'We simplify complex technical concepts into clear, user-friendly documentation. From API guides to user manuals, we make technical content accessible.',
    icon: <BookOpen className="w-7 h-7 text-primary" />,
    features: ['Documentation', 'User Guides', 'API Documentation', 'Whitepapers', 'Case Studies'],
    shape3D: 'cube',
  },
  {
    title: 'Press Releases',
    summary: 'Newsworthy press releases that get media attention.',
    fullContent: "We write compelling press releases that capture journalists' attention and get your news covered. Our releases follow AP style guidelines and include all essential elements.",
    icon: <Newspaper className="w-7 h-7 text-primary" />,
    features: ['News Announcements', 'Product Launches', 'Company Updates', 'Media Pitches', 'Distribution Support'],
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

const ContentWriting = () => {
  return (
    <Layout>
      {/* Hero Section */}
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
              Content Writing
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Words That
              <span className="gradient-text block">Convert</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Professional content writing that engages your audience, 
              builds trust, and drives business results.
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
                desktopComfort={true}
                use3D={true}
                shape3D={service.shape3D}
                delay={index * 0.1}
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
                Need Compelling Content?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's create content that tells your story and connects with your audience.
              </p>
              <Link to="/contact">
                <Button size="lg" className="glow-border hover-glow">
                  Get a Quote
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

export default ContentWriting;
