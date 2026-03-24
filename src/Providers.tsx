import ThemeProvider from "./context/ThemeProvider";
import PdfViewerProvider from "./context/PdfViewerProvider";
import GlobalStyles from "@styles/GlobalStyles";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <PdfViewerProvider>
        <GlobalStyles />
        {children}
      </PdfViewerProvider>
    </ThemeProvider>
  );
};

export default Providers;
