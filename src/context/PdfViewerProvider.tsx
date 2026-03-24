import { useState, type ReactNode } from "react";
import { PdfViewerContext } from "./PdfViewerContext";

interface PdfViewerProviderProps {
  children: ReactNode;
}

function PdfViewerProvider({ children }: PdfViewerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openPdfViewer = () => setIsOpen(true);
  const closePdfViewer = () => setIsOpen(false);

  return (
    <PdfViewerContext.Provider
      value={{ isOpen, openPdfViewer, closePdfViewer }}
    >
      {children}
    </PdfViewerContext.Provider>
  );
}

export default PdfViewerProvider;
