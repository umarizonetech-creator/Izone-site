import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from '@/components/Footer';
import ScrollToTopButton from './ScrollToTopButton';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const isServiceArea =
    location.pathname.startsWith("/development") ||
    location.pathname.startsWith("/services");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className={`flex-1 ${isServiceArea ? "service-area-scroll" : ""}`}>
        {children}
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Layout;
