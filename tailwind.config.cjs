import {
    isolateInsideOfContainer,
    scopedPreflightStyles,
} from "tailwindcss-scoped-preflight"

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    corePlugins: {
        preflight: false,
    },
    important: true,
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: "100ch",
                    },
                },
            },
            gridTemplateColumns: {
                files: "max-content auto 4fr max-content max-content 3fr",
            },
            backgroundSize: {
                "200%": "200%",
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: {
                    DEFAULT: "hsl(var(--background))",
                    "layer-1": "hsl(var(--background-layer-1))",
                    "flow-start": "hsl(var(--background-flow-start))",
                    "flow-end": "hsl(var(--background-flow-end))",
                },
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                pulse: {
                    "0%, 100%": {
                        opacity: 0,
                    },
                    "50%": {
                        opacity: 1,
                    },
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "background-flow": {
                    "0%": {
                        backgroundPosition: "0% 0%",
                    },
                    "100%": {
                        backgroundPosition: "400% 0%",
                    },
                },
            },
            animation: {
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "background-flow": "background-flow 5s linear infinite",
            },
            backgroundImage: {
                "gradient-flow":
                    "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 100%)",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
        scopedPreflightStyles({
            isolationStrategy: isolateInsideOfContainer(
                "._tailwind_preflight_reset"
            ),
        }),
    ],
}
