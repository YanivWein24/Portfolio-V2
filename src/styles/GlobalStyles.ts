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
