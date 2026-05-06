import { motion } from 'framer-motion';
import {
  Smartphone,
  TabletSmartphone,
  Layers,
  Palette,
  Zap,
  Store,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import FlipCard from '../../components/ui/FlipCard';

const services = [
  {
    title: 'iOS App Development',
    summary: 'Premium native iOS applications built with Swift for the Apple ecosystem.',
    fullContent:
      'Create stunning iOS apps that leverage the full power of Apple devices. From iPhone to iPad, we build native experiences that users love.',
    icon: <Smartphone className="w-7 h-7 text-primary" />,
    features: [
      'Swift & SwiftUI',
      'iPhone & iPad',
      'Apple Watch',
      'App Store Launch',
      'iOS Updates',
    ],
    shape3D: 'cube',
  },
  {
    title: 'Android Development',
    summary: 'Robust Android applications built with Kotlin for the Google Play Store.',
    fullContent:
      'Develop feature-rich Android applications that run smoothly across thousands of devices. We use Kotlin and modern Android architecture.',
    icon: <TabletSmartphone className="w-7 h-7 text-primary" />,
    features: [
      'Kotlin & Java',
      'Material Design',
      'Google Play Launch',
      'Device Testing',
      'Android Updates',
    ],
    shape3D: 'sphere',
  },
  {
    title: 'Cross-Platform Apps',
    summary: 'Build once, deploy everywhere with React Native and Flutter frameworks.',
    fullContent:
      'Maximize efficiency with cross-platform development. Single codebase for iOS and Android with near-native performance and consistent experience.',
    icon: <Layers className="w-7 h-7 text-primary" />,
    features: [
      'React Native',
      'Flutter',
      'Code Reusability',
      'Faster Development',
      'Consistent UX',
    ],
    shape3D: 'torus',
  },
  {
    title: 'UI/UX Design',
    summary: 'Beautiful and intuitive app interfaces designed for maximum user engagement.',
    fullContent:
      'Create delightful user experiences with thoughtful UI/UX design. From wireframes to polished interfaces, we design apps users love to use.',
    icon: <Palette className="w-7 h-7 text-primary" />,
    features: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'Usability Testing',
    ],
    shape3D: 'octahedron',
  },
  {
    title: 'App Performance',
    summary: 'High-performance apps optimized for speed and battery efficiency.',
    fullContent:
      'Deliver exceptional performance with optimized code, efficient data handling, and smooth animations. Your app will feel snappy and responsive.',
    icon: <Zap className="w-7 h-7 text-primary" />,
    features: [
      'Performance Profiling',
      'Memory Optimization',
      'Battery Efficiency',
      'Offline Support',
      'Fast Loading',
    ],
    shape3D: 'cube',
  },
  {
    title: 'App Store Launch',
    summary: 'Complete app store submission and advanced optimization services.',
    fullContent:
      'Navigate the app store submission process with confidence. We handle everything from screenshots to descriptions and ASO for maximum visibility.',
    icon: <Store className="w-7 h-7 text-primary" />,
    features: [
      'Store Submission',
      'ASO Optimization',
      'Screenshots & Video',
      'Review Response',
      'Update Management',
    ],
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

const AppDevelopment = () => {
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
              App Development
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Apps That Users
              <span className="gradient-text block">Love</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Native and cross-platform mobile applications that deliver
              exceptional user experiences.
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
                Ready to Build Your App?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's create a mobile app that your users will love.
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

export default AppDevelopment;
