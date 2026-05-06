import { useState } from "react";
import {
  Briefcase,
  Building2,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  Star,
  Users,
  Phone,
  MapPin,
  CalendarDays,
  FileText,
  Clock3,
  Eye,
  Plus,
  X,
  Download,
  Trash2,
  Layers,
  Tag,
  List,
} from "lucide-react";
import {
  AdminLayout,
  DataTable,
  DetailRow,
  FormModal,
  SelectField,
  TextField,
} from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmin } from "@/context/AdminContext";

function SectionHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="font-display text-xl md:text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      {action}
    </div>
  );
}

function SidePanel({ title, description, children }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mt-1 mb-4">{description}</p>}
      {children}
    </div>
  );
}

function CrudPage({
  title,
  description,
  data,
  operations,
  emptyItem,
  columns,
  fields,
  detailRows,
  addLabel = "Add New",
}) {
  const [selected, setSelected] = useState(data[0] ?? null);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyItem);

  const openCreate = () => {
    setEditing(null);
    setFormData(emptyItem);
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setFormData({ ...emptyItem, ...item });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setFormData(emptyItem);
  };

  const handleChange = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleImageChange = (key) => (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, [key]: reader.result?.toString() || "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editing) {
      const saved = await operations.update(editing.id, formData);
      setSelected(saved ?? { ...editing, ...formData });
    } else {
      const saved = await operations.add(formData);
      setSelected(saved ?? { ...formData, id: Date.now().toString() });
    }

    closeModal();
  };

  const handleDelete = (id) => {
    operations.remove(id);
    if (selected?.id === id) {
      const nextItem = data.find((item) => item.id !== id) ?? null;
      setSelected(nextItem);
    }
  };

  return (
    <AdminLayout>
      <SectionHeader
        title={title}
        description={description}
        action={<Button onClick={openCreate}>{addLabel}</Button>}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_360px]">
        <div className="glass-card rounded-2xl p-4 md:p-5">
          <DataTable
            columns={columns}
            data={data}
            onEdit={openEdit}
            onDelete={handleDelete}
            onRowClick={setSelected}
            selectedId={selected?.id}
          />
        </div>

        <SidePanel
          title={selected ? "Details" : "No Selection"}
          description={
            selected
              ? "Select any row to review the full record."
              : "Create a record or pick one from the table."
          }
        >
          {selected ? (
            <div>
              {detailRows(selected).map((row) => (
                <DetailRow key={row.label} icon={row.icon} label={row.label} value={row.value} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nothing selected yet.</p>
          )}
        </SidePanel>
      </div>

      {isModalOpen && (
        <FormModal
          title={editing ? `Edit ${title}` : `Create ${title}`}
          onClose={closeModal}
          onSubmit={handleSubmit}
        >
          {fields.map((field) =>
            field.type === "select" ? (
              <SelectField
                key={field.key}
                label={field.label}
                value={formData[field.key] ?? ""}
                onChange={handleChange(field.key)}
                options={field.options}
                required={field.required}
              />
            ) : field.type === "image" ? (
              <div key={field.key} className="space-y-2">
                <label className="text-sm font-medium">{field.label}</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange(field.key)}
                  required={field.required && !formData[field.key]}
                />
              </div>
            ) : (
              <TextField
                key={field.key}
                label={field.label}
                value={formData[field.key] ?? ""}
                onChange={handleChange(field.key)}
                placeholder={field.placeholder}
                required={field.required}
                textarea={field.type === "textarea"}
              />
            )
          )}
        </FormModal>
      )}
    </AdminLayout>
  );
}

function InboxPage({
  title,
  description,
  data,
  columns,
  detailRows,
  onDelete,
  statusKey,
  statusOptions,
  onStatusChange,
}) {
  const [selected, setSelected] = useState(data[0] ?? null);

  return (
    <AdminLayout>
      <SectionHeader title={title} description={description} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_360px]">
        <div className="glass-card rounded-2xl p-4 md:p-5">
          <DataTable
            columns={columns}
            data={data}
            onDelete={onDelete}
            onRowClick={setSelected}
            selectedId={selected?.id}
          />
        </div>

        <SidePanel
          title={selected ? "Record Details" : "No Selection"}
          description={
            selected ? "Use the details panel to review the full submission." : "Select a row to review it here."
          }
        >
          {selected ? (
            <div>
              {statusKey && (
                <div className="mb-4">
                  <SelectField
                    label="Status"
                    value={selected[statusKey] ?? ""}
                    onChange={(event) => {
                      onStatusChange(selected.id, event.target.value);
                      setSelected((prev) => ({ ...prev, [statusKey]: event.target.value }));
                    }}
                    options={statusOptions}
                  />
                </div>
              )}
              {detailRows(selected).map((row) => (
                <DetailRow key={row.label} icon={row.icon} label={row.label} value={row.value} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nothing selected yet.</p>
          )}
        </SidePanel>
      </div>
    </AdminLayout>
  );
}

export function PopupManagement() {
  const { popups, popupOps } = useAdmin();

  return (
    <CrudPage
      title="Popup Management"
      description="Create and update homepage popup content."
      data={popups}
      operations={popupOps}
      emptyItem={{ title: "", message: "", ctaLabel: "", ctaLink: "", status: "Active" }}
      columns={[
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
        { key: "ctaLabel", label: "CTA" },
      ]}
      fields={[
        { key: "title", label: "Popup Title", placeholder: "Summer offer", required: true },
        { key: "message", label: "Message", placeholder: "Enter popup message", required: true, type: "textarea" },
        { key: "ctaLabel", label: "Button Label", placeholder: "Learn More" },
        { key: "ctaLink", label: "Button Link", placeholder: "/get-started" },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "Active", label: "Active" },
            { value: "Draft", label: "Draft" },
            { value: "Hidden", label: "Hidden" },
          ],
        },
      ]}
      detailRows={(item) => [
        { icon: MessageSquare, label: "Title", value: item.title },
        { icon: FileText, label: "Message", value: item.message },
        { icon: CalendarDays, label: "CTA", value: `${item.ctaLabel || "No label"} ${item.ctaLink ? `(${item.ctaLink})` : ""}`.trim() },
        { icon: Clock3, label: "Status", value: item.status },
      ]}
      addLabel="Add Popup"
    />
  );
}

export function ClientManagement() {
  const { clients, clientOps } = useAdmin();

  return (
    <CrudPage
      title="Client Management"
      description="Manage client logos, names, and company descriptions."
      data={clients}
      operations={clientOps}
      emptyItem={{ name: "", logo: "", industry: "", description: "" }}
      columns={[
        {
          key: "name",
          label: "Client",
          render: (_, row) => (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                {row.logo || row.name?.slice(0, 2)?.toUpperCase() || "CL"}
              </div>
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.industry || "Unspecified"}</p>
              </div>
            </div>
          ),
        },
        { key: "industry", label: "Industry" },
        { key: "description", label: "Description" },
      ]}
      fields={[
        { key: "name", label: "Client Name", placeholder: "TechCorp Industries", required: true },
        { key: "logo", label: "Logo Text", placeholder: "TC" },
        { key: "industry", label: "Industry", placeholder: "Technology" },
        { key: "description", label: "Description", placeholder: "What this client does", type: "textarea" },
      ]}
      detailRows={(item) => [
        { icon: Building2, label: "Client Name", value: item.name },
        { icon: Star, label: "Logo Text", value: item.logo || "Not set" },
        { icon: Briefcase, label: "Industry", value: item.industry || "Not set" },
        { icon: FileText, label: "Description", value: item.description || "Not set" },
      ]}
      addLabel="Add Client"
    />
  );
}

export function TestimonialManagement() {
  const { testimonials, testimonialOps } = useAdmin();

  return (
    <CrudPage
      title="Testimonial Management"
      description="Manage quotes, author details, ratings, and avatar images."
      data={testimonials}
      operations={testimonialOps}
      emptyItem={{ quote: "", author: "", position: "", rating: "5", avatar: "" }}
      columns={[
        {
          key: "author",
          label: "Author",
          render: (_, row) => (
            <div className="flex items-center gap-3">
              {row.avatar ? (
                <img src={row.avatar} alt={row.author} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {row.author?.slice(0, 1) || "A"}
                </div>
              )}
              <div>
                <p className="font-medium">{row.author}</p>
                <p className="text-xs text-muted-foreground">{row.position}</p>
              </div>
            </div>
          ),
        },
        { key: "rating", label: "Rating" },
        { key: "quote", label: "Quote" },
      ]}
      fields={[
        { key: "author", label: "Author Name", placeholder: "Rajesh Kumar", required: true },
        { key: "position", label: "Position", placeholder: "CEO, TechCorp Industries", required: true },
        { key: "rating", label: "Rating", type: "select", options: [
          { value: "5", label: "5 Stars" },
          { value: "4", label: "4 Stars" },
          { value: "3", label: "3 Stars" },
          { value: "2", label: "2 Stars" },
          { value: "1", label: "1 Star" },
        ]},
        { key: "avatar", label: "Avatar", type: "image" },
        { key: "quote", label: "Quote", placeholder: "Client feedback", required: true, type: "textarea" },
      ]}
      detailRows={(item) => [
        { icon: Users, label: "Author", value: item.author },
        { icon: Briefcase, label: "Position", value: item.position },
        { icon: Star, label: "Rating", value: item.rating },
        { icon: ImageIcon, label: "Avatar", value: item.avatar ? "Image added" : "Not set" },
        { icon: MessageSquare, label: "Quote", value: item.quote },
      ]}
      addLabel="Add Testimonial"
    />
  );
}

export function JobRoleManagement() {
  const { jobRoles, jobRoleOps, jobApplications, jobAppOps } = useAdmin();
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Job Role Management
        </h1>
        {activeTab === "roles" ? (
          <Button
            className="rounded-2xl px-6 py-6 text-base font-semibold"
            onClick={() => document.getElementById("job-role-create")?.click()}
          >
            <Plus className="h-5 w-5" />
            Add Job Role
          </Button>
        ) : (
          <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary md:text-base">
            {jobApplications.length} Applications
          </span>
        )}
      </div>

      <div className="space-y-10">
        <div className="flex w-fit items-center rounded-2xl bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("roles")}
            className={`rounded-xl px-6 py-3 text-sm font-semibold transition md:text-base ${
              activeTab === "roles"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Job Roles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold transition md:text-base ${
              activeTab === "applications"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Applications
            <span className="rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
              {jobApplications.length}
            </span>
          </button>
        </div>

        {activeTab === "roles" ? (
          <CrudPageInner
            title=""
            framed={false}
            addLabel="Add Job Role"
            createButtonId="job-role-create"
            hideCreateButton
            data={jobRoles}
            operations={jobRoleOps}
            emptyItem={{ roleName: "", qualification: "", location: "", workCulture: "", workTiming: "" }}
            columns={[
              { key: "roleName", label: "Role Name" },
              { key: "qualification", label: "Qualification" },
              {
                key: "workTiming",
                label: "Work Timing",
                render: (value) => (
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-500">
                    {value || "Full Time"}
                  </span>
                ),
              },
              { key: "location", label: "Location" },
              {
                key: "workCulture",
                label: "Work Culture",
                render: (value) => (
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-semibold text-blue-500">
                    {value || "Remote"}
                  </span>
                ),
              },
            ]}
            fields={[
              { key: "roleName", label: "Role Name", placeholder: "Frontend Developer", required: true },
              { key: "qualification", label: "Qualification", placeholder: "B.Tech / BCA / Relevant Experience", required: true },
              { key: "location", label: "Location", placeholder: "Tiruchirappalli", required: true },
              {
                key: "workCulture",
                label: "Work Culture",
                type: "select",
                required: true,
                options: [
                  { value: "Hybrid", label: "Hybrid" },
                  { value: "Onsite", label: "Onsite" },
                  { value: "Remote", label: "Remote" },
                ],
              },
              {
                key: "workTiming",
                label: "Work Timing",
                type: "select",
                required: true,
                options: [
                  { value: "Full Time", label: "Full Time" },
                  { value: "Part Time", label: "Part Time" },
                ],
              },
            ]}
          />
        ) : (
          <DataTable
            columns={[
              {
                key: "name",
                label: "Applicant",
                render: (value) => (
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {value?.slice(0, 1)?.toUpperCase() || "A"}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ),
              },
              {
                key: "email",
                label: "Email",
                render: (value) =>
                  value ? (
                    <a
                      href={`mailto:${value}`}
                      className="text-primary hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {value}
                    </a>
                  ) : (
                    "No email"
                  ),
              },
              {
                key: "phone",
                label: "Phone",
                render: (value) =>
                  value ? (
                    <a
                      href={`tel:${String(value).replace(/[^\d+]/g, "")}`}
                      className="text-primary hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {value}
                    </a>
                  ) : (
                    "No phone"
                  ),
              },
              { key: "jobRole", label: "Applied For" },
              { key: "date", label: "Applied On" },
              {
                key: "resume",
                label: "Document",
                render: (value, row) =>
                  value ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedApplication(row);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  ) : (
                    row.resumeName || "No file"
                  ),
              },
            ]}
            data={jobApplications}
            onDelete={jobAppOps.remove}
          />
        )}
      </div>

      {selectedApplication && (
        <JobApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onDelete={() => {
            jobAppOps.remove(selectedApplication.id);
            setSelectedApplication(null);
          }}
        />
      )}
    </AdminLayout>
  );
}

function JobApplicationDetailModal({ application, onClose, onDelete }) {
  const resumePreviewSrc = application.resume
    ? `${application.resume}${application.resume.includes("#") ? "&" : "#"}toolbar=0&navpanes=0&scrollbar=1`
    : "";
  const details = [
    { icon: Users, label: "Full Name", value: application.name },
    { icon: Phone, label: "Phone", value: application.phone },
    { icon: Mail, label: "Email", value: application.email },
    { icon: Briefcase, label: "Applied For", value: application.jobRole },
    { icon: FileText, label: "Qualification", value: application.qualification },
    { icon: Clock3, label: "Experience", value: application.experience },
    { icon: MapPin, label: "Location", value: application.location || application.address },
    { icon: CalendarDays, label: "Applied On", value: application.date },
  ];

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="flex max-h-[84vh] w-full max-w-[860px] flex-col overflow-hidden rounded-[22px] border border-border bg-background shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-9">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary">
                {application.name?.slice(0, 1)?.toUpperCase() || "A"}
              </span>
              <div>
                <h2 className="text-xl font-bold leading-tight text-foreground">{application.name}</h2>
                <p className="text-sm text-muted-foreground sm:text-base">{application.jobRole}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close application details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-9">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Applicant Details
            </h3>
            <div className="grid gap-x-9 gap-y-3 md:grid-cols-2">
              {details.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex items-center gap-4 border-b border-border pb-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      <p className="truncate text-base font-semibold text-foreground">
                        {item.value || "Not provided"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Document</h3>
                {application.resume && (
                  <a
                    href={application.resume}
                    download={application.resumeName || "resume"}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline sm:text-base"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                )}
              </div>
              {application.resume ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-background">
                  <iframe
                    title={`${application.name || "Applicant"} resume`}
                    src={resumePreviewSrc}
                    className="h-[350px] w-full"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-border p-6 text-sm text-muted-foreground">
                  No document uploaded.
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-background px-5 py-4 sm:px-9">
            <Button type="button" variant="outline" onClick={onDelete}>
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrudPageInner({
  title,
  data,
  operations,
  emptyItem,
  columns,
  fields,
  addLabel = "Add",
  framed = true,
  createButtonId,
  hideCreateButton = false,
}) {
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyItem);

  const handleChange = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const closeModal = () => {
    setEditing(null);
    setFormData(emptyItem);
    setIsModalOpen(false);
  };

  const openCreate = () => {
    setEditing(null);
    setFormData(emptyItem);
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setFormData({ ...emptyItem, ...item });
    setIsModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      operations.update(editing.id, formData);
    } else {
      operations.add(formData);
    }
    closeModal();
  };

  return (
    <div className={framed ? "glass-card rounded-2xl p-4 md:p-5" : "space-y-6"}>
      <button id={createButtonId} type="button" className="hidden" onClick={openCreate} />
      {!hideCreateButton && (
        <div className={framed ? "mb-4 flex items-center justify-between" : "flex justify-end"}>
          {framed && <h2 className="font-display text-lg font-semibold">{title}</h2>}
        <Button
          size={framed ? "sm" : undefined}
          className={framed ? undefined : "rounded-2xl px-6 py-6 text-base font-semibold"}
          onClick={openCreate}
        >
          {!framed && <Plus className="h-5 w-5" />}
          {addLabel}
        </Button>
        </div>
      )}

      <DataTable columns={columns} data={data} onEdit={openEdit} onDelete={operations.remove} />

      {isModalOpen && (
        <FormModal title={editing ? `Edit ${title}` : `Add ${title}`} onClose={closeModal} onSubmit={handleSubmit}>
          {fields.map((field) =>
            field.type === "select" ? (
              <SelectField
                key={field.key}
                label={field.label}
                value={formData[field.key] ?? ""}
                onChange={handleChange(field.key)}
                options={field.options}
                required={field.required}
              />
            ) : (
              <TextField
                key={field.key}
                label={field.label}
                value={formData[field.key] ?? ""}
                onChange={handleChange(field.key)}
                placeholder={field.placeholder}
                required={field.required}
                textarea={field.type === "textarea"}
              />
            )
          )}
        </FormModal>
      )}
    </div>
  );
}

export function ContactManagement() {
  const { contacts, contactOps } = useAdmin();
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Contact Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Submissions from the website contact form.
          </p>
        </div>
        <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary md:text-base">
          {contacts.length} total
        </span>
      </div>

      <DataTable
        columns={[
          { key: "name", label: "Name" },
          {
            key: "email",
            label: "Email",
            render: (value) =>
              value ? (
                <a
                  href={`mailto:${value}`}
                  className="hover:text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {value}
                </a>
              ) : (
                "No email"
              ),
          },
          {
            key: "phone",
            label: "Phone",
            render: (value) =>
              value ? (
                <a
                  href={`tel:${String(value).replace(/[^\d+]/g, "")}`}
                  className="hover:text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {value}
                </a>
              ) : (
                "No phone"
              ),
          },
          { key: "subject", label: "Subject" },
          { key: "date", label: "Date" },
          {
            key: "actions",
            label: "Actions",
            render: (_, row) => (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="rounded-lg p-1 text-foreground hover:bg-muted"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedContact(row);
                  }}
                  aria-label="View contact details"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="rounded-lg p-1 text-foreground hover:bg-muted"
                  onClick={(event) => {
                    event.stopPropagation();
                    contactOps.remove(row.id);
                  }}
                  aria-label="Delete contact"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ),
          },
        ]}
        data={contacts}
      />

      {selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </AdminLayout>
  );
}

function ContactDetailModal({ contact, onClose }) {
  const details = [
    { label: "Name", value: contact.name },
    { label: "Email", value: contact.email },
    { label: "Phone", value: contact.phone },
    { label: "Subject", value: contact.subject },
    { label: "Date", value: contact.date },
    { label: "Message", value: contact.message },
  ];

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-background shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <h2 className="text-xl font-bold text-foreground">Contact Details</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close contact details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-5 px-6 py-6">
            {details.map((item) => (
              <div key={item.label} className="grid grid-cols-[110px_minmax(0,1fr)] gap-5">
                <p className="font-semibold text-muted-foreground">{item.label}</p>
                <p className="min-w-0 break-words font-medium text-foreground">
                  {item.value || "Not provided"}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end border-t border-border bg-background px-6 py-5">
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InternManagement() {
  const { internRoles, internRoleOps, internApplications, internAppOps } = useAdmin();
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Intern Management
          </h1>
          <p className="mt-1 text-xs text-muted-foreground md:text-base">
            Manage intern roles and applications.
          </p>
        </div>
        {activeTab === "roles" ? (
          <Button
            className="rounded-2xl px-6 py-6 text-base font-semibold"
            onClick={() => document.getElementById("intern-role-create")?.click()}
          >
            <Plus className="h-5 w-5" />
            Add Role
          </Button>
        ) : (
          <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary md:text-base">
            {internApplications.length} Applications
          </span>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex w-fit items-center rounded-2xl bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("roles")}
            className={`rounded-xl px-6 py-3 text-sm font-semibold transition md:text-base ${
              activeTab === "roles"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Intern Roles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold transition md:text-base ${
              activeTab === "applications"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Applications
            <span className="rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
              {internApplications.length}
            </span>
          </button>
        </div>

        {activeTab === "roles" ? (
          <CrudPageInner
            title=""
            framed={false}
            addLabel="Add Role"
            createButtonId="intern-role-create"
            hideCreateButton
            data={internRoles}
            operations={internRoleOps}
            emptyItem={{ roleName: "", description: "", duration: "3 Months" }}
            columns={[
              { key: "roleName", label: "Role Name" },
              { key: "spacer", label: "", render: () => "" },
            ]}
            fields={[
              { key: "roleName", label: "Role Name", placeholder: "UI/UX Intern", required: true },
              { key: "description", label: "Description", placeholder: "Describe the role", type: "textarea" },
              { key: "duration", label: "Duration", placeholder: "3 Months", required: true },
            ]}
          />
        ) : (
          <DataTable
            columns={[
              {
                key: "name",
                label: "Applicant",
                render: (value) => (
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {value?.slice(0, 1)?.toUpperCase() || "A"}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ),
              },
              {
                key: "email",
                label: "Email",
                render: (value) =>
                  value ? (
                    <a
                      href={`mailto:${value}`}
                      className="text-primary hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {value}
                    </a>
                  ) : (
                    "No email"
                  ),
              },
              {
                key: "phone",
                label: "Phone",
                render: (value) =>
                  value ? (
                    <a
                      href={`tel:${String(value).replace(/[^\d+]/g, "")}`}
                      className="text-primary hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {value}
                    </a>
                  ) : (
                    "No phone"
                  ),
              },
              { key: "role", label: "Applied Role" },
              { key: "qualification", label: "Qualification" },
              { key: "date", label: "Applied On" },
              {
                key: "actions",
                label: "Actions",
                render: (_, row) => (
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="rounded-lg p-1 text-foreground hover:bg-muted"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedApplication(row);
                      }}
                      aria-label="View intern application"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-1 text-foreground hover:bg-muted"
                      onClick={(event) => {
                        event.stopPropagation();
                        internAppOps.remove(row.id);
                      }}
                      aria-label="Delete intern application"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ),
              },
            ]}
            data={internApplications}
          />
        )}
      </div>

      {selectedApplication && (
        <InternApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onDelete={() => {
            internAppOps.remove(selectedApplication.id);
            setSelectedApplication(null);
          }}
        />
      )}
    </AdminLayout>
  );
}

function InternApplicationDetailModal({ application, onClose, onDelete }) {
  const resumePreviewSrc = application.resume
    ? `${application.resume}${application.resume.includes("#") ? "&" : "#"}toolbar=0&navpanes=0&scrollbar=1`
    : "";
  const details = [
    { icon: Users, label: "Full Name", value: application.name },
    { icon: Phone, label: "Phone", value: application.phone },
    { icon: Mail, label: "Email", value: application.email },
    { icon: Briefcase, label: "Applied Role", value: application.role },
    { icon: FileText, label: "Qualification", value: application.qualification },
    { icon: Clock3, label: "Duration", value: application.duration },
    { icon: MapPin, label: "Address", value: application.address },
    { icon: CalendarDays, label: "Applied On", value: application.date },
    { icon: Star, label: "Skills", value: application.skills },
    { icon: MessageSquare, label: "Message", value: application.message },
  ];

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="flex max-h-[78vh] w-full max-w-[1008px] flex-col overflow-hidden rounded-[22px] border border-border bg-background shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-9">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary">
                {application.name?.slice(0, 1)?.toUpperCase() || "A"}
              </span>
              <div>
                <h2 className="text-xl font-bold leading-tight text-foreground">{application.name}</h2>
                <p className="text-sm text-muted-foreground sm:text-base">{application.role}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close intern application details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-9">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Applicant Details
            </h3>
            <div className="grid gap-x-9 gap-y-3 md:grid-cols-2">
              {details.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex items-center gap-4 border-b border-border pb-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      <p className="truncate text-base font-semibold text-foreground">
                        {item.value || "Not provided"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Document</h3>
                {application.resume && (
                  <a
                    href={application.resume}
                    download={application.resumeName || "resume"}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline sm:text-base"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                )}
              </div>
              {application.resume ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-background">
                  <iframe
                    title={`${application.name || "Applicant"} resume`}
                    src={resumePreviewSrc}
                    className="h-[350px] w-full"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-border p-6 text-sm text-muted-foreground">
                  No document uploaded.
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-background px-5 py-4 sm:px-9">
            <Button type="button" variant="outline" onClick={onDelete}>
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhotoManagement() {
  const { sitePhotos, sitePhotoOps } = useAdmin();
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result?.toString() || "");
      if (!name) {
        setName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!preview) return;
    sitePhotoOps.add({ name: name || "Uploaded Photo", url: preview });
    setName("");
    setPreview("");
  };

  return (
    <AdminLayout>
      <SectionHeader
        title="Photo Management"
        description="Upload local images or store external URLs for the site gallery."
      />

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <SidePanel
          title="Upload Photo"
          description="Choose an image file and save it into the admin gallery."
        >
          <div className="space-y-4">
            <TextField label="Photo Name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Homepage banner" />
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Choose File</label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            {preview && (
              <img src={preview} alt="Preview" className="w-full aspect-video object-cover rounded-xl border border-border" />
            )}
            <Button className="w-full" onClick={handleAdd} disabled={!preview}>Save Photo</Button>
          </div>
        </SidePanel>

        <div className="glass-card rounded-2xl p-5">
          {sitePhotos.length === 0 ? (
            <p className="text-sm text-muted-foreground">No photos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {sitePhotos.map((photo) => (
                <div key={photo.id} className="rounded-2xl overflow-hidden border border-border bg-card">
                  <img src={photo.url} alt={photo.name} className="w-full aspect-video object-cover" />
                  <div className="p-4">
                    <p className="font-medium truncate">{photo.name}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => sitePhotoOps.remove(photo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export function ServiceRequestManagement() {
  const { serviceRequests, serviceRequestOps } = useAdmin();
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Client Service Requests
        </h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          {serviceRequests.length} total requests
        </p>
      </div>

      <DataTable
        columns={[
          { key: "name", label: "Name" },
          {
            key: "email",
            label: "Email",
            render: (value) =>
              value ? (
                <a
                  href={`mailto:${value}`}
                  className="hover:text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {value}
                </a>
              ) : (
                "No email"
              ),
          },
          {
            key: "phone",
            label: "Phone",
            className: "hidden",
            render: (value) =>
              value ? (
                <a
                  href={`tel:${String(value).replace(/[^\d+]/g, "")}`}
                  className="hover:text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {value}
                </a>
              ) : (
                "No phone"
              ),
          },
          { key: "services", label: "Services" },
          { key: "date", label: "Date" },
          {
            key: "status",
            label: "Status",
            render: (value) => (
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-500">
                {value || "New"}
              </span>
            ),
          },
          {
            key: "actions",
            label: "Actions",
            render: (_, row) => (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="rounded-lg p-1 text-foreground hover:bg-muted"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedRequest(row);
                  }}
                  aria-label="View request details"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="rounded-lg p-1 text-foreground hover:bg-muted"
                  onClick={(event) => {
                    event.stopPropagation();
                    serviceRequestOps.remove(row.id);
                  }}
                  aria-label="Delete request"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ),
          },
        ]}
        data={serviceRequests}
      />

      {selectedRequest && (
        <ServiceRequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onStatusChange={(status) => {
            serviceRequestOps.update(selectedRequest.id, { status });
            setSelectedRequest((prev) => ({ ...prev, status }));
          }}
        />
      )}
    </AdminLayout>
  );
}

function ServiceRequestDetailModal({ request, onClose, onStatusChange }) {
  const currentStatus = request.status || "New";
  const details = [
    { icon: Users, label: "Name", value: request.name },
    { icon: Mail, label: "Email", value: request.email },
    { icon: Phone, label: "Phone", value: request.phone },
    { icon: Building2, label: "Company", value: request.company },
    { icon: Tag, label: "Services", value: request.services },
    { icon: List, label: "Sub-Services", value: request.subServices || request.timeline },
    { icon: FileText, label: "Project Details", value: request.projectDetails },
    { icon: CalendarDays, label: "Date", value: request.date },
  ];
  const statusOptions = ["New", "In Review", "Completed", "Rejected"];

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="flex h-[77vh] w-full max-w-[660px] flex-col overflow-hidden rounded-[22px] border border-border bg-background shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                <Layers className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-bold text-foreground">Request Details</h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-500">
                {currentStatus}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Close request details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {details.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-start gap-5 border-b border-border py-4 last:border-0">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    <p className="break-words text-lg font-semibold text-foreground">
                      {item.value || "Not provided"}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-border pt-5 pb-1">
              <p className="mb-4 text-sm font-medium text-muted-foreground">Update Status</p>
              <div className="grid grid-cols-2 gap-3">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    type="button"
                    variant="outline"
                    className={
                      currentStatus === status
                        ? "border-blue-500 bg-blue-500/10 text-blue-500 hover:bg-blue-500/10 hover:text-blue-500"
                        : undefined
                    }
                    onClick={() => onStatusChange(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
