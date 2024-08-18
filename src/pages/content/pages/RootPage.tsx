import NiceModal from "@ebay/nice-modal-react";
import WideLayout from "@src/components/layouts/WideLayout";
import MainSection from "@src/components/root/MainSection";
import { SkipToMainContent } from "@src/features/accessibility/SkipToMainContent";
import CommandInput from "@src/features/command/CommandInput";
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount";
import { ConfigContext } from "@src/features/config";
import { RootContent } from "@src/features/parser";
import { ModuleContent } from "@src/features/parser/root/parseRootPageContent";
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog";
import { useContext } from "react";

interface RootProps {
    content: RootContent
}

export function RootPage({ content }: RootProps) {
    const { showCommandButton } = useContext(ConfigContext);
    const modules = content
    const handleCommandActivation = () => {
        NiceModal.show(CommandsDialog);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background py-2 text-foreground">
            <CommandsShortcutMount />
            {showCommandButton && (
            <WideLayout>
                    <CommandInput onSelect={handleCommandActivation} />
            </WideLayout>
            )}
            <SkipToMainContent />    
            <MainSection content={content}/>

        </div>
    );
}

export default RootPage;
