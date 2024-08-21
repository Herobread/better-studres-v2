export function SkipToMainContent() {
    const handleSkip = () => {
        document.getElementById("main-content")?.focus()
    }

    return (
        <button
            onClick={handleSkip}
            className="sr-only focus:not-sr-only"
        >
            Skip to main content
        </button>
    )
}
