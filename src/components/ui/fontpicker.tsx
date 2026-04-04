"use client"

import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "@src/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@src/components/ui/command"
import { cn } from "@src/lib/utils"
import { useGoogleFonts } from "@src/features/theme/googleFonts"
import { useFont } from "@src/features/theme"
import { useState } from "react"

// I tried using built in combobox in shadcn
// https://ui.shadcn.com/docs/components/radix/combobox
// But it's broken as of now https://github.com/shadcn-ui/ui/issues/9400
// and I think it would require us to migrate to tailwind v4
// So, for now I just used https://v3.shadcn.com/docs/components/combobox
// their v3 suggestion with popover and command
// FIXME: refactor to use shadcn combobox
export function FontPicker() {
    const [open, setOpen] = useState(false)
    const { fontFamily: value, setFontFamily: setValue } = useFont()
    const { data: fonts, isLoading, isError } = useGoogleFonts()

    const selectedFontLabel =
        value === "default"
            ? "Default"
            : fonts?.find((font) => font.value === value)?.label || value

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    <span className="truncate">
                        {isLoading ? "Loading fonts..." : selectedFontLabel}
                    </span>
                    {isLoading ? (
                        <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
                    ) : (
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[--radix-popover-trigger-width] p-0"
                side="bottom"
                align="start"
                avoidCollisions={false}
            >
                <Command>
                    <CommandInput placeholder="Search font..." />
                    <CommandList>
                        <CommandEmpty>
                            {isError
                                ? "Error loading fonts."
                                : "No font found."}
                        </CommandEmpty>
                        {fonts && fonts.length > 0 && (
                            <CommandGroup heading="Google Fonts">
                                <CommandItem
                                    value="default"
                                    onSelect={() => {
                                        setValue("default")
                                        setOpen(false)
                                    }}
                                >
                                    <span className="flex-grow">Default</span>
                                    <Check
                                        className={cn(
                                            "ml-2 h-4 w-4",
                                            value === "default"
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                                {fonts.map((font) => (
                                    <CommandItem
                                        key={font.value}
                                        value={font.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <span className="flex-grow">
                                            {font.label}
                                        </span>
                                        <Check
                                            className={cn(
                                                "ml-2 h-4 w-4",
                                                value === font.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
