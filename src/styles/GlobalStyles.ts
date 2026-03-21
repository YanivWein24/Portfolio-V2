import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyles = createGlobalStyle`
  /* ── Dark theme (default) ─────────────────────────────── */
  :root {
    --color-bg: #050d1a;
    --color-bg-alt: #071020;
    --color-surface: #0b1829;
    --color-surface-high: #0f1f33;
    --color-border: rgba(255, 255, 255, 0.08);
    --color-border-hover: rgba(44, 139, 255, 0.4);
    --color-primary: #2c8bff;
    --color-primary-light: #5aaeff;
    --color-primary-dark: #0e51a3;
    --color-accent: #00d4ff;
    --color-accent-alt: #7c3aed;
    --color-text-primary: #f0f6ff;
    --color-text-secondary: rgba(240, 246, 255, 0.65);
    --color-text-muted: rgba(240, 246, 255, 0.38);

    /* RGB triplets for rgba() usage */
    --primary-rgb: 44, 139, 255;
    --accent-rgb: 0, 212, 255;
    --accent-alt-rgb: 124, 58, 237;
    --shadow-rgb: 0, 0, 0;
    --overlay-rgb: 255, 255, 255;

    /* Gradients */
    --gradient-hero: linear-gradient(135deg, #050d1a 0%, #0e2a50 60%, #0e51a3 100%);
    --gradient-primary: linear-gradient(135deg, #0e51a3 0%, #2c8bff 100%);
    --gradient-glow: radial-gradient(ellipse at 50% 0%, rgba(44, 139, 255, 0.18) 0%, transparent 70%);
    --gradient-glow-accent: radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.12) 0%, transparent 60%);
    --gradient-card: linear-gradient(145deg, #0b1829 0%, #0f1f33 100%);
    --gradient-section: linear-gradient(180deg, #050d1a 0%, #071020 100%);
    --gradient-section-alt: linear-gradient(180deg, #071020 0%, #050d1a 100%);

    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 16px 60px rgba(0, 0, 0, 0.6);
    --shadow-glow: 0 0 30px rgba(44, 139, 255, 0.25), 0 0 60px rgba(44, 139, 255, 0.1);
    --shadow-glow-strong: 0 0 40px rgba(44, 139, 255, 0.4), 0 0 80px rgba(44, 139, 255, 0.15);
    --shadow-glow-accent: 0 0 30px rgba(0, 212, 255, 0.25);

    /* Header glassmorphism */
    --header-bg: rgba(5, 13, 26, 0.88);
    --section-card-shadow: 0 -12px 40px rgba(0, 0, 0, 0.55);
    --vignette-color: rgba(0, 0, 0, 0.15);

    /* Logo gradient */
    --logo-from: #fff;

    /* Selection */
    --selection-bg: rgba(44, 139, 255, 0.3);
    --selection-color: #fff;

    color-scheme: dark;
  }

  /* ── Light theme ──────────────────────────────────────── */
  [data-theme="light"] {
    --color-bg: #f8fafc;
    --color-bg-alt: #f1f5f9;
    --color-surface: #ffffff;
    --color-surface-high: #f8fafc;
    --color-border: rgba(15, 23, 42, 0.1);
    --color-border-hover: rgba(37, 99, 235, 0.4);
    --color-primary: #2563eb;
    --color-primary-light: #3b82f6;
    --color-primary-dark: #1d4ed8;
    --color-accent: #0891b2;
    --color-accent-alt: #7c3aed;
    --color-text-primary: #0f172a;
    --color-text-secondary: rgba(15, 23, 42, 0.7);
    --color-text-muted: rgba(15, 23, 42, 0.5);

    --primary-rgb: 37, 99, 235;
    --accent-rgb: 8, 145, 178;
    --accent-alt-rgb: 124, 58, 237;
    --shadow-rgb: 15, 23, 42;
    --overlay-rgb: 0, 0, 0;

    --gradient-hero: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 60%, #bfdbfe 100%);
    --gradient-primary: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
    --gradient-glow: radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
    --gradient-glow-accent: radial-gradient(ellipse at 50% 50%, rgba(8, 145, 178, 0.08) 0%, transparent 60%);
    --gradient-card: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    --gradient-section: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
    --gradient-section-alt: linear-gradient(180deg, #f1f5f9 0%, #f8fafc 100%);

    --shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.08);
    --shadow-md: 0 4px 20px rgba(15, 23, 42, 0.1);
    --shadow-lg: 0 8px 40px rgba(15, 23, 42, 0.12);
    --shadow-xl: 0 16px 60px rgba(15, 23, 42, 0.15);
    --shadow-glow: 0 0 30px rgba(37, 99, 235, 0.15), 0 0 60px rgba(37, 99, 235, 0.06);
    --shadow-glow-strong: 0 0 40px rgba(37, 99, 235, 0.25), 0 0 80px rgba(37, 99, 235, 0.1);
    --shadow-glow-accent: 0 0 30px rgba(8, 145, 178, 0.15);

    --header-bg: rgba(248, 250, 252, 0.88);
    --section-card-shadow: 0 -8px 30px rgba(15, 23, 42, 0.08);
    --vignette-color: rgba(15, 23, 42, 0.06);

    --logo-from: #0f172a;

    --selection-bg: rgba(37, 99, 235, 0.2);
    --selection-color: #0f172a;

    color-scheme: light;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: ${theme.colors.bg};
    color: ${theme.colors.text.primary};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: ${theme.typography.lineHeights.normal};
    overflow-x: hidden;
    transition: background 0.3s ease, color 0.3s ease;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: var(--selection-bg);
    color: var(--selection-color);
  }

  /* Scroll-snap — desktop only (touch inertia makes it sluggish on mobile) */
  @media (min-width: ${theme.breakpoints.lg}px) {
    html {
      scroll-snap-type: y proximity;
    }
    main > section {
      scroll-snap-align: start;
    }
  }

  /* Ensure all sections have minimum height */
  section {
    min-height: 100vh;
  }

  /* Stacking order: later sections sit on top of earlier ones */
  main > section:nth-child(1) { z-index: 1; }
  main > section:nth-child(2) { z-index: 2; }
  main > section:nth-child(3) { z-index: 3; }
  main > section:nth-child(4) { z-index: 4; }
  main > section:nth-child(5) { z-index: 5; }
  main > section:nth-child(6) { z-index: 6; }

  /* Card appearance: rounded top corners + drop shadow for sections 2–6 */
  main > section + section {
    border-radius: 20px 20px 0 0;
    box-shadow: var(--section-card-shadow);
  }

  /* Subtle bottom vignette — fixed height so it never covers content */
  main > section:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 120px;
    background: linear-gradient(to bottom, transparent 0%, var(--vignette-color) 100%);
    pointer-events: none;
    z-index: 1;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.bg};
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(var(--primary-rgb), 0.4);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(var(--primary-rgb), 0.7);
  }
`;

export default GlobalStyles;
