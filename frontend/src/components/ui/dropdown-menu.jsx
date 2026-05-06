import React, { forwardRef } from "react";
import { Menu, MenuItem, MenuList, MenuDivider, MenuButton, MenuGroup, MenuOptionGroup, MenuItemOption } from "@mui/material";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Dropdown Root ---
const DropdownMenu = ({ children, ...props }) => <Menu {...props}>{children}</Menu>;

// --- Trigger ---
const DropdownMenuTrigger = ({ children, ...props }) => <MenuButton {...props}>{children}</MenuButton>;

// --- Content ---
const DropdownMenuContent = forwardRef(({ className, children, ...props }, ref) => (
  <MenuList ref={ref} className={cn("z-50 min-w-[8rem] rounded-md border bg-popover p-1 shadow-md", className)} {...props}>
    {children}
  </MenuList>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

// --- Item ---
const DropdownMenuItem = forwardRef(({ className, inset, children, ...props }, ref) => (
  <MenuItem ref={ref} className={cn("relative flex items-center px-2 py-1.5 text-sm rounded-sm transition-colors", inset && "pl-8", className)} {...props}>
    {children}
  </MenuItem>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

// --- Checkbox Item ---
const DropdownMenuCheckboxItem = forwardRef(({ className, children, checked, ...props }, ref) => (
  <MenuItem ref={ref} className={cn("relative flex items-center px-2 py-1.5 pl-8 pr-2 text-sm rounded-sm transition-colors", className)} {...props}>
    {checked && <Check className="absolute left-2 h-4 w-4" />}
    {children}
  </MenuItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// --- Radio Item ---
const DropdownMenuRadioItem = forwardRef(({ className, children, selected, ...props }, ref) => (
  <MenuItem ref={ref} className={cn("relative flex items-center px-2 py-1.5 pl-8 pr-2 text-sm rounded-sm transition-colors", className)} {...props}>
    {selected && <Circle className="absolute left-2 h-2 w-2 fill-current" />}
    {children}
  </MenuItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// --- Label ---
const DropdownMenuLabel = forwardRef(({ className, inset, children, ...props }, ref) => (
  <MenuGroup ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} {...props}>
    {children}
  </MenuGroup>
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

// --- Separator ---
const DropdownMenuSeparator = forwardRef(({ className, ...props }, ref) => (
  <MenuDivider ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// --- Shortcut ---
const DropdownMenuShortcut = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// --- Sub & SubContent not natively in MUI, handled via nested Menu components ---
const DropdownMenuSub = DropdownMenu;
const DropdownMenuSubTrigger = DropdownMenuItem;
const DropdownMenuSubContent = DropdownMenuContent;

// --- Radio Group ---
const DropdownMenuRadioGroup = MenuOptionGroup;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
