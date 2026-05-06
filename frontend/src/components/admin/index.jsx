import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, Navigate } from "react-router-dom";
import {
  LayoutDashboard, MessageSquare, Star, Briefcase,
  Mail, Users, Building2, Menu, LogOut, X, Pencil, Trash2, ChevronRight,
  UserCircle, GraduationCap, Image, Bell, Briefcase as BriefcaseIcon, UserCheck, Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";

const navItems = [
  { label: "Dashboard",       icon: LayoutDashboard, path: "/admin" },
  { label: "Popups",          icon: MessageSquare,   path: "/admin/popups" },
  { label: "Clients",         icon: Building2,       path: "/admin/clients" },
  { label: "Testimonials",    icon: Star,            path: "/admin/testimonials" },
  // { label: "Team", icon: UserCircle, path: "/admin/team" }, // hidden
  { label: "Job Roles",       icon: Briefcase,       path: "/admin/job-roles" },
  { label: "Contacts",        icon: Mail,            path: "/admin/contacts" },
  { label: "Interns",         icon: Users,           path: "/admin/interns" },
  { label: "Photo",           icon: Image,           path: "/admin/photo" },
  { label: "Service Requests", icon: LayoutDashboard, path: "/admin/service-requests" },
];

// ─── NotificationBell ─────────────────────────────────────────────────────────
function NotificationBell() {
  const { jobApplications, internApplications, contacts, serviceRequests, readIds, markRead } = useAdmin();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifications = [
    ...jobApplications.map((a) => ({ id: a.id, type: "job", label: `${a.name} applied for ${a.jobRole}`, time: a.date, createdAt: a.createdAt ?? 0 })),
    ...internApplications.map((a) => ({ id: a.id, type: "intern", label: `${a.name} applied for internship (${a.role})`, time: a.date, createdAt: a.createdAt ?? 0 })),
    ...contacts.map((c) => ({ id: c.id, type: "contact", label: `${c.name} sent a contact message`, time: c.date, createdAt: c.createdAt ?? 0 })),
    ...serviceRequests.map((s) => ({ id: s.id, type: "service", label: `${s.name} requested ${s.services}`, time: s.date, createdAt: s.createdAt ?? 0 })),
  ].sort((a, b) => b.createdAt - a.createdAt);

  const unread = notifications.filter((n) => !readIds.includes(n.id));

  const typeIcon = (type) => {
    if (type === "job") return <Briefcase size={13} className="text-purple-400" />;
    if (type === "intern") return <UserCheck size={13} className="text-emerald-400" />;
    if (type === "service") return <LayoutDashboard size={13} className="text-blue-400" />;
    return <Phone size={13} className="text-green-400" />;
  };

  const typePath = (type) => {
    if (type === "job") return "/admin/job-roles";
    if (type === "intern") return "/admin/interns";
    if (type === "service") return "/admin/service-requests";
    return "/admin/contacts";
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <Bell size={18} />
        {unread.length > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {unread.length > 9 ? "9+" : unread.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-2xl z-[60] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="font-display font-semibold text-sm">Notifications</span>
            {unread.length > 0 && (
              <button
                onClick={() => unread.forEach((n) => markRead(n.id))}
                className="text-xs text-primary hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-border">
            {notifications.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">No notifications</p>
            ) : (
              notifications.map((n) => (
                <Link
                  key={n.id}
                  to={typePath(n.type)}
                  onClick={() => { markRead(n.id); setOpen(false); }}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors",
                    !readIds.includes(n.id) && "bg-primary/5"
                  )}
                >
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    {typeIcon(n.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-xs break-words leading-snug", !readIds.includes(n.id) ? "font-medium text-foreground" : "text-muted-foreground")}>
                      {n.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                  {!readIds.includes(n.id) && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AdminLayout ──────────────────────────────────────────────────────────────
export function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { adminLogout } = useAdmin();

  const handleLogout = () => { adminLogout(); window.location.href = "/"; };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-30 flex flex-col transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <span className="font-display font-bold text-xl gradient-text">iZone Admin</span>
          <button className="lg:hidden text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon size={17} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={14} className="text-primary" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive w-full transition-colors"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Desktop topbar — bell on right */}
        <header className="hidden lg:flex sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-6 py-3 items-center justify-end">
          <NotificationBell />
        </header>

        {/* Mobile topbar */}
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="font-display font-bold gradient-text">iZone Admin</span>
          <NotificationBell />
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

// ─── DataTable — desktop table + mobile cards ─────────────────────────────────
export function DataTable({ columns, data, onEdit, onDelete, onRowClick, selectedId }) {
  if (!data.length)
    return (
      <div className="text-center py-16 text-muted-foreground text-sm">No records found.</div>
    );

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={cn("text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap", col.className)}>
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "transition-colors",
                  row.id === selectedId
                    ? "bg-primary/10 border-l-2 border-primary"
                    : i % 2 === 0 ? "bg-card hover:bg-muted/30" : "bg-muted/20 hover:bg-muted/40",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3 align-middle", col.className)}>
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "—")}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      {onEdit && (
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit(row)}>
                          <Pencil size={14} />
                        </Button>
                      )}
                      {onDelete && (
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(row.id)}>
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {data.map((row) => (
          <div
            key={row.id}
            onClick={() => onRowClick?.(row)}
            className={cn(
              "glass-card p-4 rounded-xl border transition-all",
              row.id === selectedId ? "border-primary bg-primary/5" : "border-border",
              onRowClick && "cursor-pointer active:scale-[0.99]"
            )}
          >
            {/* Primary field (first column) */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                {columns[0].render
                  ? columns[0].render(row[columns[0].key], row)
                  : <p className="font-medium text-sm truncate">{row[columns[0].key] ?? "—"}</p>
                }
              </div>
              {(onEdit || onDelete) && (
                <div className="flex gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {onEdit && (
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onEdit(row)}>
                      <Pencil size={13} />
                    </Button>
                  )}
                  {onDelete && (
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => onDelete(row.id)}>
                      <Trash2 size={13} />
                    </Button>
                  )}
                </div>
              )}
            </div>
            {/* Remaining fields as key-value pairs */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {columns.slice(1).map((col) => (
                <div key={col.key} className="min-w-0">
                  <p className="text-xs text-muted-foreground">{col.label}</p>
                  <div className="text-xs font-medium truncate mt-0.5">
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "—")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── FormModal ────────────────────────────────────────────────────────────────
export function FormModal({ title, onClose, onSubmit, children, submitting }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center p-4 pt-8 sm:items-center sm:p-6">
        <div
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border border-border/80 bg-background shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
            <h3 className="pr-4 font-display text-base font-semibold sm:text-lg">{title}</h3>
            <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={onSubmit} className="flex max-h-[calc(90vh-73px)] flex-col">
            <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
              <div className="space-y-4">{children}</div>
            </div>
            <div className="flex justify-end gap-3 border-t border-border bg-background px-5 py-4 sm:px-6">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>Cancel</Button>
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Field components ─────────────────────────────────────────────────────────
export function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium">{label}</label>}
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function TextField({ label, error, textarea, ...props }) {
  return (
    <Field label={label} error={error}>
      {textarea
        ? <Textarea {...props} className="bg-background border-border resize-none text-sm" rows={3} />
        : <Input {...props} className="bg-background border-border text-sm" />}
    </Field>
  );
}

export function SelectField({ label, error, options, ...props }) {
  return (
    <Field label={label} error={error}>
      <select
        {...props}
        className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Field>
  );
}

// ─── DetailRow ────────────────────────────────────────────────────────────────
export function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={13} className="text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

// ─── ProtectedRoute ───────────────────────────────────────────────────────────
export function ProtectedRoute({ children }) {
  const { isAdminLoggedIn } = useAdmin();
  const location = useLocation();

  return isAdminLoggedIn ? children : <Navigate to="/admin/login" replace state={{ from: location }} />;
}
