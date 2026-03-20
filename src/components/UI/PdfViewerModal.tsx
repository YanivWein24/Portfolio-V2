import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import theme from "@styles/theme";
import Resume from "@assets/Yaniv-Resume.pdf";

const Overlay = styled(motion.div).attrs({ className: "PdfOverlay" })`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: ${theme.zIndex.modal};
`;

const Modal = styled(motion.div).attrs({ className: "PdfModal" })`
  position: fixed;
  inset: 0;
  margin: auto;
  width: min(900px, 92vw);
  height: min(88vh, 1000px);
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  z-index: ${theme.zIndex.modal + 1};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: ${theme.shadows.xl};
`;

const ModalHeader = styled.div.attrs({ className: "PdfModalHeader" })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border};
  background: ${theme.colors.bgAlt};

  h3 {
    margin: 0;
    font-size: ${theme.typography.fontSizes.lg};
    font-weight: ${theme.typography.fontWeights.semibold};
    color: ${theme.colors.text.primary};
  }
`;

const CloseBtn = styled.button.attrs({ className: "PdfCloseBtn" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.fast};

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.text.primary};
  }
`;

const Iframe = styled.iframe.attrs({ className: "PdfIframe" })`
  flex: 1;
  border: none;
  width: 100%;
  background: #fff;
`;

const ModalFooter = styled.div.attrs({ className: "PdfModalFooter" })`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  background: ${theme.colors.bgAlt};
`;

const DownloadBtn = styled.a.attrs({ className: "PdfDownloadBtn" })`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border: 1px solid rgba(44, 139, 255, 0.5);
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.primaryLight};
  transition: all 0.25s ease;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background: rgba(44, 139, 255, 0.12);
    color: #fff;
  }
`;

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

function PdfViewerModal({ isOpen, onClose, title = "Yaniv Weinshtein - Resume" }: PdfViewerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            key="pdf-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <Modal
            key="pdf-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ModalHeader>
              <h3>{title}</h3>
              <CloseBtn onClick={onClose} aria-label="Close">
                <X />
              </CloseBtn>
            </ModalHeader>
            <Iframe src={Resume} title="Resume PDF" />
            <ModalFooter>
              <DownloadBtn href={Resume} download="Yaniv-Weinshtein-Resume.pdf">
                <Download /> Download PDF
              </DownloadBtn>
            </ModalFooter>
          </Modal>
        </>
      )}
    </AnimatePresence>
  );
}

export default PdfViewerModal;
