import { createContext } from "react";

export interface PdfViewerContextType {
  isOpen: boolean;
  openPdfViewer: () => void;
  closePdfViewer: () => void;
}

export const PdfViewerContext = createContext<PdfViewerContextType | undefined>(
  undefined
);
