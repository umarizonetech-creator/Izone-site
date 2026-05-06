import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Modern shopping experience with real-time inventory, seamless checkout, and advanced analytics dashboard for store owners.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    client: 'ShopMax Inc.',
  },
  {
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Comprehensive analytics dashboard for enterprise data management with real-time insights and customizable reports.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    tags: ['TypeScript', 'GraphQL', 'AWS', 'D3.js'],
    client: 'DataFlow Systems',
  },
  {
    title: 'Mobile Banking App',
    category: 'Full Stack',
    description: 'Cross-platform mobile banking solution with biometric authentication, instant transfers, and investment tracking.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    tags: ['React Native', 'Firebase', 'Plaid', 'Node.js'],
    client: 'FinSecure Bank',
  },
  {
    title: 'Healthcare Portal',
    category: 'Web Application',
    description: 'Patient management system with appointment scheduling, telemedicine integration, and secure medical records.',
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&h=500&fit=crop',
    tags: ['Vue.js', 'Python', 'PostgreSQL', 'HIPAA'],
    client: 'MediCare Plus',
  },
  {
    title: 'Real Estate Platform',
    category: 'Web Development',
    description: 'Property listing and management platform with virtual tours, mortgage calculator, and agent portal.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
    tags: ['Next.js', 'Prisma', 'Mapbox', 'Cloudinary'],
    client: 'HomeFind Realty',
  },
  {
    title: 'Education LMS',
    category: 'Full Stack',
    description: 'Learning management system with video courses, progress tracking, certifications, and community features.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
    tags: ['React', 'Django', 'Redis', 'WebRTC'],
    client: 'EduLearn Academy',
  },
  {
    title: 'Food Delivery App',
    category: 'Mobile App',
    description: 'On-demand food delivery platform with real-time tracking, restaurant management, and driver coordination.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop',
    tags: ['Flutter', 'Node.js', 'Socket.io', 'Google Maps'],
    client: 'QuickBite Foods',
  },
  {
    title: 'Fitness Tracker',
    category: 'Mobile App',
    description: 'Comprehensive fitness application with workout plans, nutrition tracking, progress analytics, and social features.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop',
    tags: ['React Native', 'GraphQL', 'HealthKit', 'TensorFlow'],
    client: 'FitLife Pro',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Portfolio = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="portfolio-hero pt-32 sm:pt-36 md:pt-40 pb-20 md:pb-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              Our Portfolio
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Projects That
              <span className="gradient-text block mt-2">Define Excellence</span>
            </h1>
            <p className="portfolio-hero-copy text-lg text-muted-foreground">
              Explore our collection of successful projects that showcase our expertise 
              in creating innovative digital solutions for businesses across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card overflow-hidden group hover-glow"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.client}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
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
                Want to See Your Project Here?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's create something amazing together. Share your vision with us 
                and join our growing list of successful projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-started">
                  <Button size="lg" className="glow-border hover-glow">
                    Start Your Project
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
