import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Clock, CheckCircle2, GraduationCap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';



const InternshipOpenings = () => {
  const { internRoles, addInternApplication } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    role: '',
    address: '',
    qualification: '',
    skills: '',
    duration: '3 Months'
  });

  const handleApply = () => {
    setIsOpen(true);
    setIsSubmitted(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add to admin panel
    addInternApplication({
      name: formData.fullName,
      email: formData.email,
      phone: formData.mobile,
      role: formData.role,
      address: formData.address,
      qualification: formData.qualification,
      skills: formData.skills,
      duration: formData.duration
    });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Application submitted successfully!');
    
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        role: '',
        address: '',
        qualification: '',
        skills: '',
        duration: '3 Months'
      });
    }, 2000);
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden bg-background">
        <div className="container-custom relative z-10">
          <Link to="/career" className="inline-flex items-center text-primary hover:underline mb-8">
            ← Back to Careers
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Internship <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Kickstart your career with our internship program. Work on real projects, 
              learn from experienced developers, and gain practical industry experience.
            </p>
            
            <div className="flex justify-center mt-8">
              <Button 
                size="lg"
                className="glow-border hover-glow px-12 py-6 text-lg font-display"
                onClick={handleApply}
              >
                Apply for Internship
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }} 
            className="text-center mt-20 p-12 glass-card max-w-2xl mx-auto"
          >
            <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Launch Your Career</h2>
            <p className="text-muted-foreground">
              We offer comprehensive internship programs designed to give you hands-on experience 
              with the latest technologies and industry standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Internship Application Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-md border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">
              Apply for <span className="gradient-text">Internship</span>
            </DialogTitle>
            <DialogDescription>
              Please fill out the form below to apply for our internship program.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Application Received!</h3>
              <p className="text-muted-foreground max-w-xs">
                Thank you for your interest in our internship program. Our team will review your application and get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe" 
                    required 
                    className="bg-background/50 border-primary/10"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email ID</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    className="bg-background/50 border-primary/10"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input 
                    id="mobile" 
                    type="tel" 
                    placeholder="+91-1234567890" 
                    required 
                    className="bg-background/50 border-primary/10"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Interested Intern Role</Label>
                  <select
                    id="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border border-primary/10 bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  >
                    <option value="" disabled>Select a role...</option>
                    {internRoles.map((r) => (
                      <option key={r.id || r.roleName} value={r.roleName}>{r.roleName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  placeholder="Your residential address" 
                  className="bg-background/50 border-primary/10 min-h-[80px]"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification / Year of Study</Label>
                  <Input 
                    id="qualification" 
                    placeholder="e.g. 3rd Year, B.Tech CS" 
                    required 
                    className="bg-background/50 border-primary/10"
                    value={formData.qualification}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Internship Duration</Label>
                  <select 
                    id="duration" 
                    className="flex h-10 w-full rounded-md border border-primary/10 bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills / Areas of Interest</Label>
                <Input 
                  id="skills" 
                  placeholder="e.g. React, UI Design, Marketing" 
                  required 
                  className="bg-background/50 border-primary/10"
                  value={formData.skills}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the <span className="text-primary hover:underline cursor-pointer">Terms and Conditions</span> and internship policy.
                </Label>
              </div>

              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                  className="border-primary/20"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="glow-border hover-glow flex-1 md:flex-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Internship Application'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default InternshipOpenings;
