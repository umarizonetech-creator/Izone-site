import React, { useState } from "react";
import { Menu, MenuItem, MenuList, MenuButton, MenuPopover, MenuGroup, MenuDivider } from "@mui/joy";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

// Navigation Menu Root
const NavigationMenu = ({ className, children }) => {
  return (
    <div className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}>
      {children}
    </div>
  );
};

// Navigation Menu List
const NavigationMenuList = ({ className, children }) => (
  <div className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}>
    {children}
  </div>
);

// Navigation Menu Item (basic wrapper)
const NavigationMenuItem = ({ children }) => <>{children}</>;

// Navigation Menu Trigger with Chevron
const NavigationMenuTrigger = ({ className, children, onClick }) => (
  <button
    className={cn(
      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    onClick={onClick}
  >
    {children} <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
  </button>
);

// Navigation Menu Content using MUI Menu + Popover
const NavigationMenuContent = ({ anchorEl, open, onClose, className, children }) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    placement="bottom-start"
    className={cn(
      "origin-top-center relative mt-1.5 h-auto w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg md:w-auto",
      className
    )}
  >
    {children}
  </Menu>
);

// Navigation Menu Link
const NavigationMenuLink = ({ href, children }) => (
  <a href={href} className="block px-3 py-1 text-sm hover:bg-accent rounded">{children}</a>
);

// Navigation Menu Viewport (placeholder wrapper)
const NavigationMenuViewport = ({ children }) => (
  <div className="absolute left-0 top-full flex justify-center w-full">{children}</div>
);

// Navigation Menu Indicator (decorative arrow)
const NavigationMenuIndicator = () => (
  <div className="top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden">
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </div>
);

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
};
