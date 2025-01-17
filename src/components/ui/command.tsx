/* eslint-disable react/prop-types */
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive, useCommandState } from "cmdk"
import { Loader2, Search } from "lucide-react"
import * as React from "react"

import { NiceModalHandler } from "@ebay/nice-modal-react"
import { Dialog, DialogContent } from "@src/components/ui/dialog"
import { cn } from "@src/lib/utils"

const Command = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
    <CommandPrimitive
        ref={ref}
        className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
            "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
            className
        )}
        {...props}
    />
))
Command.displayName = CommandPrimitive.displayName

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CommandDialogProps extends DialogProps {
    handler: NiceModalHandler<Record<string, unknown>>
}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
    return (
        <Dialog {...props}>
            <DialogContent className="__better_studres_theme_root _tailwind_preflight_reset overflow-hidden p-0 shadow-lg">
                {children}
            </DialogContent>
        </Dialog>
    )
}

const CommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
        pages?: string[]
        isLoading?: boolean
    }
>(({ className, isLoading, pages, ...props }, ref) => {
    const lastPages = pages?.slice(-2)
    const isManyPages = (pages?.length || 0) > 2

    return (
        <div
            className="_tailwind_preflight_reset flex items-center gap-2 border-b border-muted px-3"
            // eslint-disable-next-line react/no-unknown-property
            cmdk-input-wrapper=""
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin opacity-50" />
            ) : (
                <Search className="h-4 w-4 shrink-0 opacity-50" />
            )}
            {isManyPages && <div>...</div>}
            {lastPages?.map((page) => {
                return (
                    <>
                        <div className="h-11 w-max whitespace-nowrap py-3 text-sm text-foreground">
                            {page}
                        </div>
                        <span>/</span>
                    </>
                )
            })}
            <CommandPrimitive.Input
                ref={ref}
                className={cn(
                    "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            />
        </div>
    )
})

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.List
        ref={ref}
        className={cn(
            "_tailwind_preflight_reset max-h-[300px] overflow-y-auto overflow-x-hidden",
            className
        )}
        {...props}
    />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Empty>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
    <CommandPrimitive.Empty
        ref={ref}
        className="_tailwind_preflight_reset py-6 text-center text-sm"
        {...props}
    />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
        ref={ref}
        className={cn(
            "_tailwind_preflight_reset overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
            className
        )}
        {...props}
    />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 h-px bg-border", className)}
        {...props}
    />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
        onTab?: () => void
    }
>(({ className, onTab, children, ...props }, forwardedRef) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internalRef: any = React.useRef<HTMLDivElement | null>(null)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.useImperativeHandle(forwardedRef, () => internalRef.current as any)

    React.useEffect(() => {
        if (internalRef.current && onTab) {
            internalRef.current.__onTab = onTab
        }
    }, [onTab])

    return (
        <CommandPrimitive.Item
            ref={internalRef}
            className={cn(
                "group _tailwind_preflight_reset relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50",
                className
            )}
            {...props}
        >
            <span className="flex-grow">{children}</span>
            {onTab && (
                <div className="invisible absolute right-1 space-x-1 rounded-sm bg-background p-2 group-data-[selected=true]:visible">
                    <kbd className="whitespace-nowrap rounded-sm bg-primary px-[6px] py-[2px] font-sans text-base font-medium leading-[1rem] text-primary-foreground">
                        Tab
                    </kbd>
                    <span>for more</span>
                </div>
            )}
        </CommandPrimitive.Item>
    )
})

CommandItem.displayName = CommandPrimitive.Item.displayName

const SubCommandItem = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => {
    const search = useCommandState((state) => state.search)
    if (!search) return null

    return (
        <CommandPrimitive.Item
            ref={ref}
            className={cn(
                "_tailwind_preflight_reset relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50",
                className
            )}
            {...props}
        />
    )
})

SubCommandItem.displayName = "Sub" + CommandPrimitive.Item.displayName

const CommandShortcut = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn(
                "_tailwind_preflight_reset ml-auto text-xs tracking-widest text-muted-foreground",
                className
            )}
            {...props}
        />
    )
}
CommandShortcut.displayName = "CommandShortcut"

const ITEM_SELECTOR = `[cmdk-item=""]`

function getSelectedCommandItem(listInnerRef: React.RefObject<HTMLDivElement>) {
    return listInnerRef.current?.querySelector(
        `${ITEM_SELECTOR}[aria-selected="true"]`
    )
}

export {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    getSelectedCommandItem,
    SubCommandItem,
}
