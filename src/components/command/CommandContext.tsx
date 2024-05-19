import { createContext, useContext, useState, ReactNode } from 'react';

interface CommandContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const CommandContext = createContext<CommandContextType | undefined>(undefined);

export function CommandProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <CommandContext.Provider value={{ open, setOpen }}>
            {children}
        </CommandContext.Provider>
    );
}

export function useCommand(): CommandContextType {
    const context = useContext(CommandContext);
    if (!context) {
        throw new Error('useCommand must be used within a CommandProvider');
    }
    return context;
}
