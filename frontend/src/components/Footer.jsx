import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Instagram,
} from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/about#team" },
    { name: "Careers", path: "/career" },
    { name: "Contact", path: "/contact" },
  ],
  services: [
    { name: "Web Development", path: "/development/web-development" },
    { name: "AI & ML", path: "/development/ai-ml" },
    { name: "Government Tenders", path: "/development/government-tenders" },
    {
      name: "Social Media Marketing",
      path: "/development/social-media-marketing",
    },
    { name: "Content Writing", path: "/development/content-writing" },
    { name: "Graphics Designer", path: "/development/graphics-designer" },
  ],
  resources: [
    { name: "Blog", path: "#" },
    { name: "Case Studies", path: "/development#portfolio" },
    { name: "Documentation", path: "#" },
    { name: "FAQ", path: "#" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative bg-card border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 gap-8 text-left sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-6 flex items-center justify-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-xl">
                  IZ
                </span>
              </div>
              <span className="font-display text-2xl font-bold text-primary text-left">
                Izone<span className="text-foreground"> Technologies</span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-left text-muted-foreground">
              Transforming ideas into exceptional digital experiences. We build
              modern, scalable web solutions that drive business growth.
            </p>
            <div className="flex justify-start gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="text-left">
            <h4 className="font-display font-semibold text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-left">
            <h4 className="font-display font-semibold text-foreground mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-left">
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start justify-start gap-3 text-left">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm max-w-[260px] leading-relaxed">
                  3rd Floor, Aruvi Arcade Complex, 5th Cross Thillainagar, North
                  Extension Road, Tiruchirapalli, Tamil Nadu-620018.
                </span>
              </li>
              <li className="flex items-center justify-start gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a
                  href="mailto:hello@izone.tech"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  innovativezone.tech@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-start gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  +91-9943077284
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-left md:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Izone Technologies. All rights
            reserved.
          </p>
          <div className="flex flex-wrap justify-start gap-4 sm:gap-6">
            <Link
              to="#"
              className="text-muted-foreground text-sm hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-muted-foreground text-sm hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
