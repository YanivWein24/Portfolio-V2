const theme = {
  colors: {
    bg: "var(--color-bg)",
    bgAlt: "var(--color-bg-alt)",
    surface: "var(--color-surface)",
    surfaceHigh: "var(--color-surface-high)",
    border: "var(--color-border)",
    borderHover: "var(--color-border-hover)",
    primary: "var(--color-primary)",
    primaryLight: "var(--color-primary-light)",
    primaryDark: "var(--color-primary-dark)",
    accent: "var(--color-accent)",
    accentAlt: "var(--color-accent-alt)",
    text: {
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
      muted: "var(--color-text-muted)"
    },
    gradients: {
      hero: "var(--gradient-hero)",
      primary: "var(--gradient-primary)",
      glow: "var(--gradient-glow)",
      glowAccent: "var(--gradient-glow-accent)",
      card: "var(--gradient-card)",
      section: "var(--gradient-section)",
      sectionAlt: "var(--gradient-section-alt)"
    }
  },
  typography: {
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.75rem",
      "5xl": "3.75rem",
      "6xl": "5rem"
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeights: {
      tight: 1.1,
      snug: 1.3,
      normal: 1.6,
      relaxed: 1.8
    }
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "96px",
    "5xl": "128px"
  },
  breakpoints: {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1440
  },
  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    full: "9999px"
  },
  shadows: {
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    xl: "var(--shadow-xl)",
    glow: "var(--shadow-glow)",
    glowStrong: "var(--shadow-glow-strong)",
    glowAccent: "var(--shadow-glow-accent)"
  },
  transitions: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
    spring: "0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
  },
  zIndex: {
    base: 0,
    above: 10,
    modal: 100,
    fixed: 200,
    overlay: 300
  }
} as const;

export type Theme = typeof theme;
export default theme;
