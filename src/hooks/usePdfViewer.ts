import { useContext } from "react";
import { PdfViewerContext } from "@context/PdfViewerContext";

function usePdfViewer() {
  const context = useContext(PdfViewerContext);
  if (!context) {
    throw new Error("usePdfViewer must be used within PdfViewerProvider");
  }
  return context;
}

export default usePdfViewer;
