import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AdminProvider } from "@/context/AdminContext";
import { useEffect } from "react";
import Kursor from "@/lib/kursor";
import "kursor/dist/kursor.css";
import Development from "./pages/Development";
import Index from "./pages/Index";
import About from "./pages/About";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Clients from "./pages/Clients";
import Portfolio from "./pages/Portfolio";
import GetStarted from "./pages/GetStarted";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import {
  ClientManagement,
  ContactManagement,
  InternManagement,
  JobRoleManagement,
  PhotoManagement,
  PopupManagement,
  ServiceRequestManagement,
  TestimonialManagement,
} from "./pages/AdminManagement";
import CursorRings from "./components/ui/Rings";
import { ProtectedRoute } from "@/components/admin";

// Development pages
import WebDevelopment from "./pages/development/WebDevelopment";
import SocialMediaMarketing from "./pages/development/SocialMediaMarketing";
import ContentWriting from "./pages/development/ContentWriting";
import GraphicsDesigner from "./pages/development/GraphicsDesigner";
import SoftwareDevelopment from "./pages/development/SoftwareDevelopment";
import AppDevelopment from "./pages/development/AppDevelopment";
import AiMl from "./pages/development/AiMl";
import GovernmentTenders from "./pages/development/GovernmentTenders";

// Services pages
import Services from "./pages/Services";
import BulkSms from "./pages/services/BulkSms";
import VoiceSms from "./pages/services/VoiceSms";
import WhatsappPanel from "./pages/services/WhatsappPanel";
import WhatsappMarketing from "./pages/services/WhatsappMarketing";
import DigitalElectionCampaign from "./pages/services/DigitalElectionCampaign";




const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !isFinePointer) return undefined;

    let cursor;

    const startCursor = () => {
      cursor = new Kursor({
        type: 5,
        color: "#16A34A",
        removeDefaultCursor: true,
      });
    };

    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(startCursor, { timeout: 1200 })
      : window.setTimeout(startCursor, 300);

    return () => {
      cursor?.destroy?.();

      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {/* <CursorRings/> */}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/development" element={<Development />} />
                <Route path="/services" element={<Services />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/career" element={<Career />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/popups"
                  element={
                    <ProtectedRoute>
                      <PopupManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/clients"
                  element={
                    <ProtectedRoute>
                      <ClientManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/testimonials"
                  element={
                    <ProtectedRoute>
                      <TestimonialManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/job-roles"
                  element={
                    <ProtectedRoute>
                      <JobRoleManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/contacts"
                  element={
                    <ProtectedRoute>
                      <ContactManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/interns"
                  element={
                    <ProtectedRoute>
                      <InternManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/photo"
                  element={
                    <ProtectedRoute>
                      <PhotoManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/service-requests"
                  element={
                    <ProtectedRoute>
                      <ServiceRequestManagement />
                    </ProtectedRoute>
                  }
                />
                
                {/* Development routes */}
                <Route path="/development/web-development" element={<WebDevelopment/>} />
                <Route path="/development/social-media-marketing" element={<SocialMediaMarketing />} />
                <Route path="/development/content-writing" element={<ContentWriting />} />
                <Route path="/development/graphics-designer" element={<GraphicsDesigner />} />
                <Route path="/development/software-development" element={<SoftwareDevelopment />} />
                <Route path="/development/app-development" element={<AppDevelopment />} />
                <Route path="/development/ai-ml" element={<AiMl />} />
                <Route path="/development/government-tenders" element={<GovernmentTenders />} />
                
                {/* Services routes */}
                <Route path="/services/bulk-sms" element={<BulkSms />} />
                <Route path="/services/voice-sms" element={<VoiceSms />} />
                <Route path="/services/whatsapp-panel" element={<WhatsappPanel />} />
                <Route path="/services/whatsapp-marketing" element={<WhatsappMarketing />} />
                <Route path="/services/digital-election-campaign" element={<DigitalElectionCampaign />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
};

export default App;
