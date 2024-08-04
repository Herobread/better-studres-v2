export function SkipToMainContent() {
    const handleSkip = () => {
        document.getElementById("main-content")?.focus()
    }

    return (
        <button
            onClick={handleSkip}
            className="focus:clip-auto absolute h-1 w-1 overflow-hidden bg-background focus:z-50 focus:h-auto focus:w-auto focus:overflow-visible"
        >
            Skip to main content
        </button>
    )
}
