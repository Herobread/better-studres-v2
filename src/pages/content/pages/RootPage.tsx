import NiceModal from "@ebay/nice-modal-react";
import CompactLayout from "@src/components/layouts/CompactLayout";
import MainLayout from "@src/components/layouts/MainLayout";
import WideLayout from "@src/components/layouts/WideLayout";
import MainSection from "@src/components/root/MainSection";
import { ThemeToggle } from "@src/components/ui/theme-toggle";
import { SkipToMainContent } from "@src/features/accessibility/SkipToMainContent";
import CommandInput from "@src/features/command/CommandInput";
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount";
import { ConfigContext } from "@src/features/config";
import RootHeader from "@src/features/header/RootHeader";
import SubheaderBreadcrumbs from "@src/features/header/SubheaderBreadCrumbs";
import { RootContent } from "@src/features/parser";
import { AddQuickLinkButton, QuickLinkContainer, QuickLinkList } from "@src/features/quickLinks/components";
import { EmptyQuickLinksMessage } from "@src/features/quickLinks/components/EmptyQuickLinksMessage";
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog";
import { useContext } from "react";

interface RootProps {
    content: RootContent
}

export function RootPage({ content }: RootProps) {
    const { showCommandButton, showQuickLinks } = useContext(ConfigContext);
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
            <MainLayout>
                <CompactLayout>
                    <div className="grid grid-cols-[1fr_max-content]">
                        <RootHeader />
                        <ThemeToggle />
                    </div>
                    <SubheaderBreadcrumbs />
                </CompactLayout>
                {showQuickLinks && (
                    <QuickLinkContainer>
                        <AddQuickLinkButton />
                        <QuickLinkList />
                        <EmptyQuickLinksMessage />
                    </QuickLinkContainer>
                )}
                <MainSection content={content} />
            </MainLayout>

        </div>
    );
}

export default RootPage;
