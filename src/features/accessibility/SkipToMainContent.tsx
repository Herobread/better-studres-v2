export function SkipToMainContent() {
    const handleSkip = () => {
        document.getElementById("main-content")?.focus()
    }

    return (
        <button
            onClick={handleSkip}
            className="sr-only p-2 focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-50 focus:h-auto focus:w-auto focus:bg-background"
        >
            Skip to main content
        </button>
    )
}
