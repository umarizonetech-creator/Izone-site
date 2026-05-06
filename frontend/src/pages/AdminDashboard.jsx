import { Link } from "react-router-dom";
import { MessageSquare, Star, Briefcase, Mail, Users, Building2, Image } from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { useAdmin } from "@/context/AdminContext";

const modules = [
  { label: "Popups",       icon: MessageSquare, path: "/admin/popups",       key: "popups",             color: "text-blue-500",   bg: "bg-blue-500/10" },
  { label: "Clients",      icon: Building2,     path: "/admin/clients",      key: "clients",            color: "text-pink-500",   bg: "bg-pink-500/10" },
  { label: "Testimonials", icon: Star,          path: "/admin/testimonials", key: "testimonials",       color: "text-lime-600",   bg: "bg-lime-600/10" },
  // { label: "Team", icon: UserCircle, path: "/admin/team", key: "teamMembers", color: "text-cyan-500", bg: "bg-cyan-500/10" }, // hidden
  { label: "Job Roles",    icon: Briefcase,     path: "/admin/job-roles",    key: "jobRoles",           color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Contacts",     icon: Mail,          path: "/admin/contacts",     key: "contacts",           color: "text-green-500",  bg: "bg-green-500/10" },
  { label: "Interns",      icon: Users,         path: "/admin/interns",      key: "internApplications", color: "text-emerald-600", bg: "bg-emerald-600/10" },
  { label: "Photos",       icon: Image,         path: "/admin/photo",        key: "sitePhotos",         color: "text-teal-500",   bg: "bg-teal-500/10" },
];

export default function AdminDashboard() {
  const admin = useAdmin();

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome to iZone Admin Panel</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {modules.map(({ label, icon: Icon, path, key, color, bg }) => (
          <Link
            key={key}
            to={path}
            className="glass-card p-4 md:p-6 hover-glow flex items-center gap-3 md:gap-5 group transition-all rounded-xl"
          >
            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl ${bg} flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl md:text-3xl font-bold font-display leading-none">
                {admin[key]?.length ?? 0}
              </p>
              <p className="text-muted-foreground text-xs md:text-sm mt-0.5 truncate">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Photos section */}
      {admin.sitePhotos?.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-base">Uploaded Photos</h2>
            <Link to="/admin/photo" className="text-xs text-primary hover:underline">Manage →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {admin.sitePhotos.map((photo) => (
              <div key={photo.id} className="rounded-xl overflow-hidden border border-border aspect-video bg-muted">
                <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
