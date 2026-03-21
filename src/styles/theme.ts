const theme = {
  colors: {
    bg: "#050d1a",
    bgAlt: "#071020",
    surface: "#0b1829",
    surfaceHigh: "#0f1f33",
    border: "rgba(255,255,255,0.08)",
    borderHover: "rgba(44,139,255,0.4)",
    primary: "#2c8bff",
    primaryLight: "#5aaeff",
    primaryDark: "#0e51a3",
    accent: "#00d4ff",
    accentAlt: "#7c3aed",
    text: {
      primary: "#f0f6ff",
      secondary: "rgba(240,246,255,0.65)",
      muted: "rgba(240,246,255,0.38)"
    },
    gradients: {
      hero: "linear-gradient(135deg, #050d1a 0%, #0e2a50 60%, #0e51a3 100%)",
      primary: "linear-gradient(135deg, #0e51a3 0%, #2c8bff 100%)",
      glow: "radial-gradient(ellipse at 50% 0%, rgba(44,139,255,0.18) 0%, transparent 70%)",
      glowAccent:
        "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.12) 0%, transparent 60%)",
      card: "linear-gradient(145deg, #0b1829 0%, #0f1f33 100%)",
      section: "linear-gradient(180deg, #050d1a 0%, #071020 100%)",
      sectionAlt: "linear-gradient(180deg, #071020 0%, #050d1a 100%)"
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
    sm: "0 2px 8px rgba(0,0,0,0.3)",
    md: "0 4px 20px rgba(0,0,0,0.4)",
    lg: "0 8px 40px rgba(0,0,0,0.5)",
    xl: "0 16px 60px rgba(0,0,0,0.6)",
    glow: "0 0 30px rgba(44,139,255,0.25), 0 0 60px rgba(44,139,255,0.1)",
    glowStrong: "0 0 40px rgba(44,139,255,0.4), 0 0 80px rgba(44,139,255,0.15)",
    glowAccent: "0 0 30px rgba(0,212,255,0.25)"
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
