import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmin } from "@/context/AdminContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminLoggedIn, adminLogin } = useAdmin();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (await adminLogin(formData.username.trim(), formData.password)) {
      const destination = location.state?.from?.pathname || "/admin";
      navigate(destination, { replace: true });
      return;
    }

    setIsSubmitting(false);
    setError("Invalid admin username or password.");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-primary mb-3">Secure Access</p>
          <h1 className="font-display text-3xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to open the iZone admin dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                value={formData.username}
                onChange={handleChange("username")}
                placeholder="Enter admin username"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
                placeholder="Enter password"
                className="pl-10"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Opening..." : "Open Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}
