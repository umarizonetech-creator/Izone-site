import React, { forwardRef } from "react";
import { Menu, MenuItem, MenuList, MenuDivider, MenuGroup, MenuRadioGroup, MenuRadioItem, MenuCheckItem, MenuSub, MenuSubTrigger, MenuSubList, MenuLabel } from "@mui/material";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- ContextMenu ---
const ContextMenu = ({ children, anchorEl, open, onClose }) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose} className="rounded-md border bg-popover shadow-md">
      {children}
    </Menu>
  );
};

// --- Trigger --- (MUI uses native anchorEl for trigger, so use a wrapper)
const ContextMenuTrigger = ({ children, onClick }) => {
  return React.cloneElement(children, { onClick });
};

// --- Content ---
const ContextMenuContent = forwardRef(({ className, children, ...props }, ref) => (
  <MenuList ref={ref} className={cn("p-1 min-w-[8rem] text-popover-foreground", className)} {...props}>
    {children}
  </MenuList>
));
ContextMenuContent.displayName = "ContextMenuContent";

// --- Item ---
const ContextMenuItem = forwardRef(({ className, children, inset, ...props }, ref) => (
  <MenuItem
    ref={ref}
    className={cn("flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none", inset && "pl-8", className)}
    {...props}
  >
    {children}
  </MenuItem>
));
ContextMenuItem.displayName = "ContextMenuItem";

// --- Checkbox Item ---
const ContextMenuCheckboxItem = forwardRef(({ className, checked, children, ...props }, ref) => (
  <MenuCheckItem
    ref={ref}
    checked={checked}
    className={cn("relative flex items-center px-2 py-1.5 text-sm outline-none", className)}
    {...props}
  >
    <span className="absolute left-2 flex items-center justify-center">
      <Check className="h-4 w-4" />
    </span>
    {children}
  </MenuCheckItem>
));
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

// --- Radio Item ---
const ContextMenuRadioItem = forwardRef(({ className, children, ...props }, ref) => (
  <MenuRadioItem
    ref={ref}
    className={cn("relative flex items-center px-2 py-1.5 text-sm outline-none", className)}
    {...props}
  >
    <span className="absolute left-2 flex items-center justify-center">
      <Circle className="h-2 w-2 fill-current" />
    </span>
    {children}
  </MenuRadioItem>
));
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

// --- Label ---
const ContextMenuLabel = forwardRef(({ className, inset, children, ...props }, ref) => (
  <MenuLabel ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)} {...props}>
    {children}
  </MenuLabel>
));
ContextMenuLabel.displayName = "ContextMenuLabel";

// --- Separator ---
const ContextMenuSeparator = forwardRef(({ className, ...props }, ref) => (
  <MenuDivider ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";

// --- Shortcut ---
const ContextMenuShortcut = ({ className, children, ...props }) => (
  <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props}>
    {children}
  </span>
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

// --- Submenu ---
const ContextMenuSub = MenuSub;
const ContextMenuSubTrigger = forwardRef(({ className, inset, children, ...props }, ref) => (
  <MenuSubTrigger ref={ref} className={cn("flex items-center justify-between px-2 py-1.5 text-sm outline-none", inset && "pl-8", className)} {...props}>
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenuSubTrigger>
));
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

const ContextMenuSubContent = forwardRef(({ className, children, ...props }, ref) => (
  <MenuSubList ref={ref} className={cn("p-1 min-w-[8rem] rounded-md border bg-popover shadow-md", className)} {...props}>
    {children}
  </MenuSubList>
));
ContextMenuSubContent.displayName = "ContextMenuSubContent";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup: MenuGroup,
  ContextMenuPortal: React.Fragment, // MUI handles portal internally
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup: MenuRadioGroup,
};
