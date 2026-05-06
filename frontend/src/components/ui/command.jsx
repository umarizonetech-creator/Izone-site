import React, { forwardRef } from "react";
import { Dialog, DialogContent } from "@radix-ui/react-dialog"; // already installed
import { TextField, Autocomplete, Popper } from "@mui/material"; // MUI replacement
import { Search } from "lucide-react"; // already installed
import { cn } from "@/lib/utils";

// --- CommandDialog ---
const CommandDialog = ({ children, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-lg rounded-md">
        {children}
      </DialogContent>
    </Dialog>
  );
};

// --- CommandInput ---
const CommandInput = forwardRef(({ className, placeholder = "Search...", ...props }, ref) => (
  <div className="flex items-center border-b px-3">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <TextField
      inputRef={ref}
      placeholder={placeholder}
      variant="standard"
      InputProps={{
        disableUnderline: true,
        className: cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
      }}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

// --- CommandList & Items ---
const CommandList = forwardRef(
  ({ className, options = [], renderOption, noOptionsText = "No results", ...props }, ref) => {
    return (
      <Autocomplete
        ref={ref}
        options={options}
        disablePortal
        PopperComponent={(popperProps) => (
          <Popper {...popperProps} className={cn("max-h-[300px] overflow-y-auto", className)} />
        )}
        renderInput={(params) => <TextField {...params} className="hidden" />}
        renderOption={(props, option, { selected }) =>
          renderOption ? (
            renderOption(props, option, selected)
          ) : (
            <li
              {...props}
              className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                selected ? "bg-accent text-accent-foreground" : "",
                "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
              )}
            >
              {option.label || option}
            </li>
          )
        }
        noOptionsText={noOptionsText}
        {...props}
      />
    );
  }
);
CommandList.displayName = "CommandList";

// --- CommandShortcut ---
const CommandShortcut = ({ className, children, ...props }) => {
  return (
    <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props}>
      {children}
    </span>
  );
};
CommandShortcut.displayName = "CommandShortcut";

// --- CommandSeparator ---
const CommandSeparator = ({ className, ...props }) => (
  <hr className={cn("-mx-1 h-px bg-border", className)} {...props} />
);
CommandSeparator.displayName = "CommandSeparator";

// --- CommandGroup ---
const CommandGroup = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&>h2]:px-2 [&>h2]:py-1.5 [&>h2]:text-xs [&>h2]:font-medium [&>h2]:text-muted-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
CommandGroup.displayName = "CommandGroup";

// --- Command main wrapper ---
const Command = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
Command.displayName = "Command";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem: CommandList, // MUI Autocomplete handles items
  CommandShortcut,
  CommandSeparator,
};
