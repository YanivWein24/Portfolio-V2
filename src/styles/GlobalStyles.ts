import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyles = createGlobalStyle`
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
    background: rgba(44, 139, 255, 0.3);
    color: #fff;
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
    box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.55);
  }

  /* Fade-out shadow overlay as sections leave viewport */
  main > section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 70%,
      rgba(0, 0, 0, 0.15) 100%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  main > section:not(:last-child)::before {
    opacity: 1;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.bg};
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(44, 139, 255, 0.4);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(44, 139, 255, 0.7);
  }
`;

export default GlobalStyles;
