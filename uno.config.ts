import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      emphasis: {
        100: "var(--ifm-color-emphasis-100)",
        200: "var(--ifm-color-emphasis-200)",
        300: "var(--ifm-color-emphasis-300)",
        400: "var(--ifm-color-emphasis-400)",
        500: "var(--ifm-color-emphasis-500)",
        600: "var(--ifm-color-emphasis-600)",
        700: "var(--ifm-color-emphasis-700)",
        800: "var(--ifm-color-emphasis-800)",
        900: "var(--ifm-color-emphasis-900)",
      },
      gray: {
        100: "#EBF1F5",
        200: "#D9E3EA",
        300: "#C5D2DC",
        400: "#9BA9B4",
        500: "#707D86",
        600: "#55595F",
        700: "#33363A",
        800: "#25282C",
        900: "#151719",
      },
      purple: {
        100: "#F4F4FF",
        200: "#E2E1FF",
        300: "#CBCCFF",
        400: "#ABABFF",
        500: "#8D8DFF",
        600: "#5D5DFF",
        700: "#4B4ACF",
        800: "#38379C",
        900: "#262668",
      },
      primary: "var(--ifm-color-primary)",
      secondary: "var(--ifm-color-content-secondary)",
      content: "var(--ifm-color-content)",
      selected: "var(--ifm-hover-overlay)",
    },
    spacing: {
      "9/16": "56.25%",
      "3/4": "75%",
      "1/1": "100%",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "architects-daughter": ['"Architects Daughter"', "sans-serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "3.25rem",
      "6xl": "4rem",
    },
    letterSpacing: {
      tighter: "-0.02em",
      tight: "-0.01em",
      normal: "0",
      wide: "0.01em",
      wider: "0.02em",
      widest: "0.4em",
    },
    minWidth: {
      10: "2.5rem",
    },
  },
  shortcuts: {
    // Custom background for slides
    "bg-main": "bg-white text-[#181818] dark:(bg-[#121212] text-[#ddd])",

    // OpenFeature gradient backgrounds
    "bg-gradient-purple":
      "bg-gradient-to-br from-purple-500/30 to-purple-600/20",
    "bg-gradient-dark":
      "bg-gradient-to-br from-[rgba(54,56,85,0.82)] to-[rgba(26,28,44,0.92)]",
    "bg-gradient-card":
      "bg-gradient-to-br from-[rgba(54,56,85,0.5)] to-[rgba(24,26,38,0.45)]",

    // Purple theme borders
    "border-purple-light": "border-[rgba(141,141,255,0.35)]",
    "border-purple-medium": "border-[rgba(139,140,215,0.28)]",
    "border-purple-bright": "border-[#A3A3FF]",
    "border-subtle": "border-[rgba(122,126,160,0.38)]",

    // Utility shortcuts for common presentation patterns
    "slide-content": "w-full h-full flex flex-col justify-center items-center",
    "slide-title": "text-6xl font-bold mb-8",
    "slide-subtitle": "text-2xl opacity-80",

    // Glowing effects for emphasis
    "glow-purple": "shadow-[0_0_25px_rgba(109,118,255,0.35)]",
    "glow-blue": "shadow-[0_0_20px_rgba(93,93,255,0.4)]",
    "glow-purple-soft": "shadow-[0_0_15px_rgba(141,141,255,0.25)]",

    // Card with full purple theme styling
    "card-purple":
      "border-1.5 border-purple-medium rounded-xl bg-gradient-dark shadow-[0_8px_32px_0_rgba(60,66,110,0.38),0_0_0_2px_rgba(141,141,255,0.08)]",
  },
  rules: [
    // Custom inset rule
    [/^inset-full$/, () => ({ inset: "100%" })],
    // Custom scale rule
    [/^scale-98$/, () => ({ transform: "scale(0.98)" })],
  ],
  safelist: [
    // Color utilities - Purple theme
    "text-purple-100",
    "text-purple-200",
    "text-purple-300",
    "text-purple-400",
    "text-purple-500",
    "text-purple-600",
    "text-purple-700",
    "text-purple-800",
    "text-purple-900",
    "text-purple-light",
    "text-purple-bright",
    "text-blue-400",
    "text-blue-500",
    "text-blue-600",
    "text-red-400",
    "text-red-500",
    "text-green-400",
    "text-green-500",
    "text-orange-300",
    "text-orange-500",
    "text-amber-300",

    // Background colors
    "bg-purple-500",
    "bg-blue-400",
    "bg-green-900",
    "bg-red-900",
    "bg-orange-900",

    // Gradient backgrounds
    "bg-gradient-purple",
    "bg-gradient-dark",
    "bg-gradient-card",

    // Border utilities
    "border-purple-light",
    "border-purple-medium",
    "border-purple-bright",
    "border-subtle",
    "border-1.5",
    "border-2",
    "border-solid",

    // Glow effects
    "glow-purple",
    "glow-blue",
    "glow-purple-soft",

    // Card styles
    "card-purple",

    // Common presentation utilities
    "font-bold",
    "font-semibold",
    "opacity-70",
    "opacity-80",
    "bg-opacity-30",
    "bg-opacity-40",

    // Grid utilities used in slides
    "grid-cols-2",
    "grid-cols-3",
    "gap-3",
    "gap-4",
    "gap-6",
    "gap-8",
    "gap-12",
    "gap-16",

    // Spacing utilities
    "mt-4",
    "mt-6",
    "mt-8",
    "mt-12",
    "mt-16",
    "mb-4",
    "mb-8",
    "pt-12",
    "px-3",
    "px-4",
    "px-5",
    "px-6",
    "py-2",
    "py-3",
    "py-4",

    // Text utilities
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "leading-relaxed",

    // Layout utilities
    "text-center",
    "text-left",
    "flex",
    "inline-flex",
    "items-center",
    "justify-center",
    "space-y-2",
    "space-y-3",
    "space-y-4",

    // Interactive elements
    "cursor-pointer",
    "hover:opacity-100",
    "hover:bg-gray-400",
    "hover:bg-opacity-20",
    "transition",
    "transition-all",
    "duration-300",
    "duration-500",

    // Positioning
    "abs-br",
    "m-6",
    "p-2",
    "p-3",

    // Borders and styling
    "rounded",
    "rounded-md",
    "rounded-lg",
    "rounded-xl",
    "border",
    "border-main",
    "border-dashed",
    "border-red-500",

    // Filters and effects
    "backdrop-blur-sm",
    "overflow-hidden",
  ],
});