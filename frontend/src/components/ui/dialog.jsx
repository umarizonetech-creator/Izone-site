import React, { forwardRef } from "react";
import { Dialog as MUIDialog, DialogTitle as MUIDialogTitle, DialogContent as MUIDialogContent, DialogActions as MUIDialogActions, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Dialog Root ---
const Dialog = ({ open, onClose, children, ...props }) => {
  return (
    <MUIDialog open={open} onClose={onClose} className="z-50" {...props}>
      {children}
    </MUIDialog>
  );
};

// --- Overlay ---
const DialogOverlay = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 bg-black/80 animate-fade-in data-[state=closed]:animate-fade-out",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

// --- Content ---
const DialogContent = forwardRef(({ className, children, onClose, ...props }, ref) => (
  <MUIDialogContent
    ref={ref}
    className={cn(
      "relative grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg rounded-lg animate-fade-in",
      className
    )}
    {...props}
  >
    {children}
    {onClose && (
      <IconButton
        onClick={onClose}
        className="absolute right-4 top-4 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
      </IconButton>
    )}
  </MUIDialogContent>
));
DialogContent.displayName = "DialogContent";

// --- Header ---
const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

// --- Footer ---
const DialogFooter = ({ className, ...props }) => (
  <DialogActions className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

// --- Title ---
const DialogTitle = forwardRef(({ className, ...props }, ref) => (
  <MUIDialogTitle ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
DialogTitle.displayName = "DialogTitle";

// --- Description ---
const DialogDescription = forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";

// --- Trigger / Close handled via props in MUI ---

export {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
