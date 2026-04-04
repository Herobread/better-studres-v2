"use client"

import * as React from "react"
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

export function FontPicker() {
    const [open, setOpen] = React.useState(false)
    const { fontFamily: value, setFontFamily: setValue } = useFont()
    const { data: fonts, isLoading, isError } = useGoogleFonts()

    const selectedFontLabel = React.useMemo(() => {
        if (value === "default") return "Default"
        if (value === "fira") return "Fira Code"
        return fonts?.find((font) => font.value === value)?.label || value
    }, [value, fonts])

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
                onPointerDown={(e) => e.stopPropagation()}
            >
                <Command>
                    <CommandInput placeholder="Search font..." />
                    <CommandList>
                        <CommandEmpty>
                            {isError ? "Error loading fonts." : "No font found."}
                        </CommandEmpty>
                        <CommandGroup>
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
                            <CommandItem
                                value="fira"
                                onSelect={() => {
                                    setValue("fira")
                                    setOpen(false)
                                }}
                            >
                                <span className="flex-grow">Fira Code</span>
                                <Check
                                    className={cn(
                                        "ml-2 h-4 w-4",
                                        value === "fira"
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                            {fonts?.map((font) => (
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
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
