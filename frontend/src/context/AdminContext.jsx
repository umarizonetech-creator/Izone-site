import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext(null);

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const LOCAL_TESTIMONIALS_KEY = "admin_local_testimonials";

const DEFAULT_CONTACTS = [
  {
    id: "sample-contact-1",
    name: "Arun Kumar",
    email: "arun.kumar@example.com",
    phone: "+91 98765 43210",
    subject: "Website Development Enquiry",
    message: "We need a responsive corporate website with service pages and lead capture forms.",
    date: "04/24/2026",
    createdAt: 1776998400000,
  },
  {
    id: "sample-contact-2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 91234 56789",
    subject: "Bulk SMS Pricing Request",
    message: "Please share pricing details for promotional SMS campaigns and delivery reports.",
    date: "04/24/2026",
    createdAt: 1776998460000,
  },
  {
    id: "sample-contact-3",
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    phone: "+91 99887 76655",
    subject: "Career Application Follow-up",
    message: "I submitted my profile for a frontend role and would like to know the next steps.",
    date: "04/24/2026",
    createdAt: 1776998520000,
  },
];

const DEFAULT_CLIENTS = [
  {
    id: "sample-client-1",
    name: "TechNova Solutions",
    logo: "TS",
    industry: "Technology",
    description: "Custom software and automation solutions for modern business operations.",
  },
  {
    id: "sample-client-2",
    name: "BrightPath Healthcare",
    logo: "BH",
    industry: "Healthcare",
    description: "Digital patient workflows, appointment systems, and healthcare platform support.",
  },
  {
    id: "sample-client-3",
    name: "UrbanRetail Mart",
    logo: "UR",
    industry: "Retail",
    description: "Omnichannel retail tools for inventory, customer engagement, and analytics.",
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "sample-testimonial-1",
    quote:
      "Izone Technologies rebuilt our website with a cleaner flow and faster lead capture. The final result felt polished from day one.",
    author: "Ananya Mehta",
    position: "Founder, UrbanKart Retail",
    role: "Founder, UrbanKart Retail",
    rating: "5",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: "sample-testimonial-2",
    quote:
      "Their team understood our campaign goals quickly and delivered a WhatsApp marketing setup that improved response rates within the first week.",
    author: "Rohit Malhotra",
    position: "Marketing Manager, BrightPath Healthcare",
    role: "Marketing Manager, BrightPath Healthcare",
    rating: "5",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: "sample-testimonial-3",
    quote:
      "We needed a dependable software partner for a tight launch timeline. Izone kept communication clear and shipped exactly what our operations team needed.",
    author: "Nisha Kapoor",
    position: "Operations Head, TechNova Solutions",
    role: "Operations Head, TechNova Solutions",
    rating: "5",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    id: "sample-testimonial-4",
    quote:
      "The support after launch has been excellent. Small fixes, reporting requests, and content updates are handled with real ownership.",
    author: "Arjun Rao",
    position: "Director, GreenGrid Energy",
    role: "Director, GreenGrid Energy",
    rating: "4",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
  {
    id: "sample-testimonial-5",
    quote:
      "From design to deployment, the process was smooth. Their mix of technical clarity and business understanding made the project easy to manage.",
    author: "Meera Iyer",
    position: "CEO, EduBridge Academy",
    role: "CEO, EduBridge Academy",
    rating: "5",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
];

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

const persist = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const loadSeededList = (key, fallback) => {
  const value = load(key, fallback);
  return Array.isArray(value) && value.length === 0 ? fallback : value;
};

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
};

const splitList = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
};

const withMeta = (item) => ({
  ...item,
  date: item.date || formatDate(item.createdAt),
  createdAt: item.createdAt ? new Date(item.createdAt).getTime() : Date.now(),
});

const mapPopupFromApi = (item) => ({
  ...withMeta(item),
  message: item.description || item.message || "",
  status: item.isActive ? "Active" : "Hidden",
});

const mapPopupToApi = (item) => ({
  title: item.title,
  description: item.message || item.description || "",
  isActive: item.status === "Active" || item.isActive === true,
  image: item.image || "",
});

const mapTestimonialFromApi = (item) => ({
  ...withMeta(item),
  quote: item.description || item.quote || "",
  author: item.name || item.author || "",
  position: item.designation || item.position || "",
  role: item.designation || item.role || "",
  avatar: item.image || item.avatar || "",
  rating: String(item.rating || "5"),
});

const mapTestimonialToApi = (item) => ({
  name: item.author || item.name || "",
  designation: item.position || item.role || item.designation || "",
  description: item.quote || item.description || "",
  rating: Number(item.rating || 5),
  image: item.avatar || item.image || "",
});

const mapClientFromApi = (item) => ({
  ...withMeta(item),
  name: item.companyName || item.name || "",
  logo: item.icon || item.logo || "",
});

const mapClientToApi = (item) => ({
  companyName: item.name || item.companyName || "",
  industry: item.industry || "",
  description: item.description || "",
  icon: item.logo || item.icon || "",
});

const mapProjectFromApi = (item) => ({
  ...withMeta(item),
  services: item.services || splitList(item.selectedServices).join(", "),
});

const mapProjectToApi = (item) => ({
  name: item.name || "",
  email: item.email || "",
  phone: item.phone || "",
  company: item.company || "",
  selectedServices: item.selectedServices || splitList(item.services),
  budget: item.budget || "",
  timeline: item.timeline || item.subServices || "",
  projectDetails: item.projectDetails || "",
  status: item.status,
  isRead: item.isRead,
});

const mapIdentity = (item) => withMeta(item);

const endpointConfig = {
  popups: { path: "/api/popups", fromApi: mapPopupFromApi, toApi: mapPopupToApi, method: "PUT" },
  testimonials: { path: "/api/testimonials", fromApi: mapTestimonialFromApi, toApi: mapTestimonialToApi, method: "PUT" },
  jobRoles: { path: "/api/job-roles", fromApi: mapIdentity, toApi: (item) => ({ ...item, isActive: item.isActive ?? true }), method: "PUT" },
  contacts: { path: "/api/contacts", fromApi: mapIdentity, toApi: (item) => item },
  clients: { path: "/api/clients", fromApi: mapClientFromApi, toApi: mapClientToApi, method: "PUT" },
  internApplications: { path: "/api/intern-applications", fromApi: mapIdentity, toApi: (item) => item },
  jobApplications: { path: "/api/job-applications", fromApi: mapIdentity, toApi: (item) => item },
  internRoles: { path: "/api/intern-roles", fromApi: mapIdentity, toApi: (item) => ({ roleName: item.roleName }), method: "PUT" },
  sitePhotos: { path: "/api/site-photos", fromApi: mapIdentity, toApi: (item) => ({ ...item, alt: item.alt || item.name || "" }) },
  serviceRequests: { path: "/api/project-inquiries", fromApi: mapProjectFromApi, toApi: mapProjectToApi },
};

const normalizeId = (id) => String(id);

const replaceById = (items, next) =>
  items.map((item) => (normalizeId(item.id) === normalizeId(next.id) ? next : item));

const mergeById = (...lists) => {
  const seen = new Set();
  return lists.flat().filter((item) => {
    const id = normalizeId(item.id);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
};

const makeCrud = (setter) => ({
  add: (item) => setter((previous) => [...previous, { ...item, id: Date.now().toString() }]),
  update: (id, item) =>
    setter((previous) =>
      previous.map((existing) => (normalizeId(existing.id) === normalizeId(id) ? { ...existing, ...item } : existing))
    ),
  remove: (id) => setter((previous) => previous.filter((item) => normalizeId(item.id) !== normalizeId(id))),
});

export const AdminProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => load("admin_token", ""));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => Boolean(load("admin_token", "")));
  const [popups, setPopups] = useState([]);
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [localTestimonials, setLocalTestimonials] = useState(() => load(LOCAL_TESTIMONIALS_KEY, []));
  const [jobRoles, setJobRoles] = useState([]);
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);
  const [interns, setInterns] = useState(() => load("admin_interns", []));
  const [clients, setClients] = useState(DEFAULT_CLIENTS);
  const [internApplications, setInternApplications] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [teamMembers, setTeamMembers] = useState(() => load("admin_team", []));
  const [internRoles, setInternRoles] = useState([]);
  const [sitePhotos, setSitePhotos] = useState([]);
  const [readIds, setReadIds] = useState(() => load("admin_read_ids", []));
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => { persist("admin_interns", interns); }, [interns]);
  useEffect(() => { persist("admin_team", teamMembers); }, [teamMembers]);
  useEffect(() => { persist("admin_read_ids", readIds); }, [readIds]);
  useEffect(() => { persist(LOCAL_TESTIMONIALS_KEY, localTestimonials); }, [localTestimonials]);

  const apiRequest = async (path, options = {}) => {
    const token = options.tokenOverride ?? authToken;
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Request failed: ${response.status}`);
    }
    if (response.status === 204) return null;
    return response.json();
  };

  const loadList = async (key, setter, tokenOverride = authToken) => {
    const config = endpointConfig[key];
    const data = await apiRequest(config.path, { tokenOverride });
    const mapped = Array.isArray(data) ? data.map(config.fromApi) : [];
    setter(mapped);
  };

  const loadTestimonials = async (tokenOverride = "") => {
    const config = endpointConfig.testimonials;
    const data = await apiRequest(config.path, { tokenOverride });
    const mapped = Array.isArray(data) ? data.map(config.fromApi) : [];
    setTestimonials(mergeById(localTestimonials, mapped));
  };

  const refreshAdminData = async (tokenOverride = authToken) => {
    await Promise.all([
      loadList("contacts", setContacts, tokenOverride),
      loadList("jobApplications", setJobApplications, tokenOverride),
      loadList("internApplications", setInternApplications, tokenOverride),
      loadList("serviceRequests", setServiceRequests, tokenOverride),
    ]);
  };

  useEffect(() => {
    Promise.all([
      loadList("popups", setPopups, ""),
      loadTestimonials(""),
      loadList("jobRoles", setJobRoles, ""),
      loadList("clients", setClients, ""),
      loadList("internRoles", setInternRoles, ""),
      loadList("sitePhotos", setSitePhotos, ""),
    ]).catch((error) => console.error("Failed to load public site data", error));
  }, []);

  useEffect(() => {
    if (!authToken) return;
    refreshAdminData(authToken).catch((error) => console.error("Failed to load admin data", error));
  }, [authToken]);

  const adminLogin = async (username, password) => {
    try {
      const result = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        tokenOverride: "",
      });
      persist("admin_token", result.access_token);
      setAuthToken(result.access_token);
      setIsAdminLoggedIn(true);
      await refreshAdminData(result.access_token);
      return true;
    } catch (error) {
      console.error("Admin login failed", error);
      return false;
    }
  };

  const adminLogout = () => {
    persist("admin_token", "");
    setAuthToken("");
    setIsAdminLoggedIn(false);
  };

  const makeApiCrud = (key, setter) => {
    const config = endpointConfig[key];
    return {
      add: async (item) => {
        const saved = await apiRequest(config.path, {
          method: "POST",
          body: JSON.stringify(config.toApi(item)),
        });
        const mapped = config.fromApi(saved);
        setter((previous) => [mapped, ...previous]);
        return mapped;
      },
      update: async (id, item) => {
        const saved = await apiRequest(`${config.path}/${id}`, {
          method: config.method || "PATCH",
          body: JSON.stringify(config.toApi(item)),
        });
        const mapped = config.fromApi(saved);
        setter((previous) => replaceById(previous, mapped));
        return mapped;
      },
      remove: async (id) => {
        await apiRequest(`${config.path}/${id}`, { method: "DELETE" });
        setter((previous) => previous.filter((item) => normalizeId(item.id) !== normalizeId(id)));
      },
    };
  };

  const testimonialOps = {
    add: async (item) => {
      try {
        const saved = await apiRequest(endpointConfig.testimonials.path, {
          method: "POST",
          body: JSON.stringify(endpointConfig.testimonials.toApi(item)),
        });
        const mapped = endpointConfig.testimonials.fromApi(saved);
        setTestimonials((previous) => [mapped, ...previous]);
        return mapped;
      } catch (error) {
        console.error("Failed to save testimonial to API; saved locally instead", error);
        const localItem = withMeta({
          ...item,
          id: `local-testimonial-${Date.now()}`,
          role: item.role || item.position || "",
        });
        setLocalTestimonials((previous) => [localItem, ...previous]);
        setTestimonials((previous) => [localItem, ...previous]);
        return localItem;
      }
    },
    update: async (id, item) => {
      const isLocal = normalizeId(id).startsWith("local-testimonial-");
      if (!isLocal) {
        try {
          const saved = await apiRequest(`${endpointConfig.testimonials.path}/${id}`, {
            method: endpointConfig.testimonials.method || "PATCH",
            body: JSON.stringify(endpointConfig.testimonials.toApi(item)),
          });
          const mapped = endpointConfig.testimonials.fromApi(saved);
          setTestimonials((previous) => replaceById(previous, mapped));
          return mapped;
        } catch (error) {
          console.error("Failed to update testimonial in API; updated locally instead", error);
        }
      }

      const localItem = withMeta({ ...item, id, role: item.role || item.position || "" });
      setLocalTestimonials((previous) =>
        previous.some((existing) => normalizeId(existing.id) === normalizeId(id))
          ? replaceById(previous, localItem)
          : [localItem, ...previous]
      );
      setTestimonials((previous) => replaceById(previous, localItem));
      return localItem;
    },
    remove: async (id) => {
      const isLocal = normalizeId(id).startsWith("local-testimonial-");
      if (!isLocal) {
        await apiRequest(`${endpointConfig.testimonials.path}/${id}`, { method: "DELETE" });
      }
      setLocalTestimonials((previous) => previous.filter((item) => normalizeId(item.id) !== normalizeId(id)));
      setTestimonials((previous) => previous.filter((item) => normalizeId(item.id) !== normalizeId(id)));
    },
  };

  const addPublicItem = (key, setter) => async (item) => {
    const config = endpointConfig[key];
    const saved = await apiRequest(config.path, {
      method: "POST",
      body: JSON.stringify(config.toApi(item)),
      tokenOverride: "",
    });
    const mapped = config.fromApi(saved);
    setter((previous) => [mapped, ...previous]);
    return mapped;
  };

  const markRead = (id) => setReadIds((p) => p.includes(id) ? p : [...p, id]);

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn, adminLogin, adminLogout,
        popups, popupOps: makeApiCrud("popups", setPopups),
        testimonials, testimonialOps,
        jobRoles, jobRoleOps: makeApiCrud("jobRoles", setJobRoles),
        contacts, contactOps: makeApiCrud("contacts", setContacts), addContact: addPublicItem("contacts", setContacts),
        interns, internOps: makeCrud(setInterns),
        clients, clientOps: makeApiCrud("clients", setClients),
        internApplications, internAppOps: makeApiCrud("internApplications", setInternApplications), addInternApplication: addPublicItem("internApplications", setInternApplications),
        jobApplications, jobAppOps: makeApiCrud("jobApplications", setJobApplications), addJobApplication: addPublicItem("jobApplications", setJobApplications),
        teamMembers, teamOps: makeCrud(setTeamMembers),
        internRoles, internRoleOps: makeApiCrud("internRoles", setInternRoles),
        sitePhotos, sitePhotoOps: makeApiCrud("sitePhotos", setSitePhotos),
        serviceRequests, serviceRequestOps: makeApiCrud("serviceRequests", setServiceRequests), addServiceRequest: addPublicItem("serviceRequests", setServiceRequests),
        readIds, markRead,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
