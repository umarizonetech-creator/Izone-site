import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, CheckCircle2 } from 'lucide-react';
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



const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const JobOpenings = () => {
  const { jobRoles, addJobApplication } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    qualification: '',
    experience: '',
    resume: null,
    resumeName: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5MB");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, resume: reader.result, resumeName: file.name }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsOpen(true);
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add to admin panel
    addJobApplication({
      name: formData.fullName,
      email: formData.email,
      phone: formData.mobile,
      location: formData.address,
      qualification: formData.qualification,
      experience: formData.experience,
      resume: formData.resume,
      resumeName: formData.resumeName,
      jobRole: selectedJob?.roleName || selectedJob?.title || 'General Application',
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
        address: '',
        qualification: '',
        experience: '',
        resume: null,
        resumeName: ''
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
              Current <span className="gradient-text">Job Openings</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Join our team of talented individuals and build innovative web solutions for global clients.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 max-w-4xl mx-auto">
            {jobRoles.length === 0 ? (
              <div className="text-center text-muted-foreground p-8">No job openings available at the moment.</div>
            ) : (
              jobRoles.map((job) => (
                <motion.div key={job.id || job.roleName} variants={itemVariants} className="glass-card p-6 hover-glow flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2">{job.roleName}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> {job.qualification}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {job.location} / {job.workCulture}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {job.workTiming}</span>
                    </div>
                  </div>
                  <Button 
                  className="glow-border hover-glow shrink-0"
                  onClick={() => handleApply(job)}
                >
                  Apply Now
                </Button>
                </motion.div>
              ))
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Don't see a position that fits? We're always looking for talented people.</p>
            <Button 
              variant="outline" 
              className="border-primary/50 hover:bg-primary/10"
              onClick={() => handleApply({ roleName: 'General Application' })}
            >
              Send General Application
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Application Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-md border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">
              Apply for <span className="gradient-text">{selectedJob?.roleName || selectedJob?.title}</span>
            </DialogTitle>
            <DialogDescription>
              Please fill out the form below to submit your application.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Application Received!</h3>
              <p className="text-muted-foreground max-w-xs">
                Thank you for your interest. Our team will review your application and get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" required className="bg-background/50 border-primary/10" value={formData.fullName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email ID</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required className="bg-background/50 border-primary/10" value={formData.email} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input id="mobile" type="tel" placeholder="+1 (555) 000-0000" required className="bg-background/50 border-primary/10" value={formData.mobile} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={selectedJob?.roleName || selectedJob?.title || ''} readOnly className="bg-muted/50 border-primary/10 cursor-not-allowed" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Your residential address" className="bg-background/50 border-primary/10 min-h-[80px]" value={formData.address} onChange={handleInputChange} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input id="qualification" placeholder="e.g. B.Tech Computer Science" required className="bg-background/50 border-primary/10" value={formData.qualification} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input 
                    id="experience" 
                    list="experience-options" 
                    placeholder="e.g. 2 Years, Fresher" 
                    required 
                    className="bg-background/50 border-primary/10" 
                    value={formData.experience} 
                    onChange={handleInputChange} 
                  />
                  <datalist id="experience-options">
                    <option value="Fresher" />
                    <option value="1 Year" />
                    <option value="2 Years" />
                    <option value="3 Years" />
                    <option value="4 Years" />
                    <option value="5 Years" />
                    <option value="More than 5 Years" />
                  </datalist>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume">Upload Resume</Label>
                <div className="relative group">
                  <Input 
                    id="resume" 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    required 
                    onChange={handleFileChange}
                    className="cursor-pointer bg-background/50 border-primary/10 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                </div>
                <p className="text-xs text-muted-foreground italic">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the <span className="text-primary hover:underline cursor-pointer">Terms and Conditions</span> and privacy policy.
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
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default JobOpenings;
