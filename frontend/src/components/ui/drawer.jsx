import React, { forwardRef } from "react";
import { Drawer as MUIDrawer, DrawerHeader as MUIDrawerHeader, DrawerContent as MUIDrawerContent, DrawerFooter as MUIDrawerFooter } from "@mui/material";
import { cn } from "@/lib/utils";

// --- Drawer Root ---
const Drawer = ({ open, onClose, shouldScaleBackground = true, children, ...props }) => (
  <MUIDrawer
    anchor="bottom"
    open={open}
    onClose={onClose}
    ModalProps={{ keepMounted: true }}
    className={cn(shouldScaleBackground ? "scale-100" : "", "z-50")}
    {...props}
  >
    {children}
  </MUIDrawer>
);

// --- Overlay handled by MUI Modal automatically ---

// --- Drawer Content ---
const DrawerContent = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex flex-col rounded-t-[10px] border bg-background mt-24",
      className
    )}
    {...props}
  >
    <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
    {children}
  </div>
));
DrawerContent.displayName = "DrawerContent";

// --- Drawer Header ---
const DrawerHeader = ({ className, ...props }) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

// --- Drawer Footer ---
const DrawerFooter = ({ className, ...props }) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

// --- Drawer Title ---
const DrawerTitle = forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
DrawerTitle.displayName = "DrawerTitle";

// --- Drawer Description ---
const DrawerDescription = forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerDescription.displayName = "DrawerDescription";

// --- Trigger / Close handled via props in MUI Drawer ---

export {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
