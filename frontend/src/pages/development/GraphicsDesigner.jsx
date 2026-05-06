import { motion } from 'framer-motion';
import { Palette, Image, Layers, Box, Monitor, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FlipCard from '../../components/ui/FlipCard';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';

const services = [
  {
    title: 'Brand Identity Design',
    summary: 'Complete visual identity systems that make your brand memorable.',
    fullContent: 'We create comprehensive brand identities including logos, color palettes, typography, and brand guidelines that establish a strong, cohesive visual presence across all touchpoints.',
    icon: <Sparkles className="w-7 h-7 text-primary" />,
    features: ['Logo Design', 'Color Palette', 'Typography Selection', 'Brand Guidelines', 'Stationery Design'],
    shape3D: 'octahedron',
  },
  {
    title: 'UI/UX Design',
    summary: 'User-centered interface designs that delight and convert.',
    fullContent: 'Our UI/UX designers create intuitive, beautiful interfaces for websites and applications. We focus on user research, wireframing, prototyping, and pixel-perfect visual design.',
    icon: <Monitor className="w-7 h-7 text-primary" />,
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
    shape3D: 'cube',
  },
  {
    title: 'Social Media Graphics',
    summary: 'Scroll-stopping visuals optimized for every social platform.',
    fullContent: 'We design engaging social media graphics including posts, stories, covers, and ads that maintain brand consistency while maximizing engagement on each platform.',
    icon: <Image className="w-7 h-7 text-primary" />,
    features: ['Post Templates', 'Story Designs', 'Cover Images', 'Ad Creatives', 'Carousel Graphics'],
    shape3D: 'sphere',
  },
  {
    title: 'Print Design',
    summary: 'High-quality print materials from business cards to banners.',
    fullContent: 'From business cards to large format banners, we create print-ready designs that look stunning in the physical world. All files are prepared to professional printing standards.',
    icon: <Layers className="w-7 h-7 text-primary" />,
    features: ['Business Cards', 'Brochures', 'Flyers & Posters', 'Banners', 'Packaging Design'],
    shape3D: 'torus',
  },
  {
    title: 'Illustration',
    summary: 'Custom illustrations that bring your ideas to life.',
    fullContent: 'Our illustrators create unique, custom artwork including character design, infographics, icons, and editorial illustrations that add personality and clarity to your content.',
    icon: <Palette className="w-7 h-7 text-primary" />,
    features: ['Custom Illustrations', 'Icon Design', 'Infographics', 'Character Design', 'Editorial Art'],
    shape3D: 'octahedron',
  },
  {
    title: 'Motion Graphics',
    summary: 'Animated visuals that capture attention and tell stories.',
    fullContent: 'We create dynamic motion graphics including logo animations, explainer videos, social media animations, and presentation graphics that bring your brand to life.',
    icon: <Box className="w-7 h-7 text-primary" />,
    features: ['Logo Animation', 'Explainer Videos', 'Social Animations', 'Presentation Graphics', 'GIF Creation'],
    shape3D: 'cube',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const GraphicsDesigner = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-4 md:px-8 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              Graphics Design
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Visual Design
              <span className="gradient-text block">Excellence</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Creative graphic design that transforms your ideas into stunning visuals that captivate and communicate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card glow-border p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Elevate Your Visual Brand?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's create designs that make your brand stand out from the competition.
              </p>
              <Link to="/contact">
                <Button size="lg" className="glow-border hover-glow">
                  Start a Project
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

export default GraphicsDesigner;
