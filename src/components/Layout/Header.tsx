import { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Download, Eye, X } from "lucide-react";
import Hamburger from "./Hamburger";
import navLinks from "@data/navLinks";
import Resume from "@assets/Yaniv-Resume.pdf";
import theme from "@styles/theme";
import useScrollY from "@hooks/useScrollY";

const socialLinks = [
  { href: "https://github.com/YanivWein24", Icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/yaniv-weinshtein/",
    Icon: Linkedin,
    label: "LinkedIn"
  },
  { href: "mailto:Yanivwein22@gmail.com", Icon: Mail, label: "Email" }
];

interface ScrolledProps {
  $scrolled: boolean;
}

const Nav = styled.header.attrs({ className: "Header" })<ScrolledProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.fixed};
  transition:
    background 0.4s ease,
    backdrop-filter 0.4s ease,
    box-shadow 0.4s ease,
    padding 0.4s ease;

  ${({ $scrolled }) =>
    $scrolled
      ? css`
          background: rgba(5, 13, 26, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 1px 0 rgba(44, 139, 255, 0.15),
            0 4px 24px rgba(0, 0, 0, 0.4);
          padding: 12px 0;
        `
      : css`
          background: transparent;
          backdrop-filter: none;
          box-shadow: none;
          padding: 24px 0;
        `}
`;

const Inner = styled.div.attrs({ className: "HeaderInner" })`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const Logo = styled(Link).attrs({ className: "Logo" })`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.extrabold};
  background: linear-gradient(
    135deg,
    #fff 0%,
    ${theme.colors.primaryLight} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  letter-spacing: -0.5px;
`;

const NavLinks = styled.nav.attrs({ className: "NavLinks" })`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link).attrs({ className: "NavLink" })`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: 6px 2px;
  position: relative;
  transition: color ${theme.transitions.fast};
  letter-spacing: 0.3px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${theme.colors.primary};
    border-radius: 1px;
    transition: width 0.3s ease;
  }

  &:hover,
  &.active {
    color: ${theme.colors.text.primary};
    &::after {
      width: 100%;
    }
  }
`;

const Actions = styled.div.attrs({ className: "HeaderActions" })`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const SocialBtn = styled.a.attrs({ className: "SocialBtn" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.text.muted};
  transition:
    color ${theme.transitions.fast},
    background ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.text.primary};
    background: rgba(44, 139, 255, 0.12);
  }

  svg {
    width: 17px;
    height: 17px;
  }
`;

const ResumeBtn = styled.a.attrs({ className: "ResumeBtn" })`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border: 1px solid rgba(44, 139, 255, 0.5);
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.primaryLight};
  transition: all 0.25s ease;
  margin-left: 4px;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background: rgba(44, 139, 255, 0.12);
    border-color: ${theme.colors.primaryLight};
    color: #fff;
  }
`;

interface HamburgerWrapperProps {
  $visible: boolean;
}
const HamburgerWrapper = styled.div.attrs({
  className: "HamburgerWrapper"
})<HamburgerWrapperProps>`
  display: none;
  width: 44px;
  height: 44px;
  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const FloatingHamburger = styled.div.attrs({ className: "FloatingHamburger" })`
  display: none;
  position: fixed;
  top: 12px;
  right: ${theme.spacing.lg};
  z-index: ${theme.zIndex.overlay + 50};

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const Overlay = styled(motion.div).attrs({ className: "MobileOverlay" })`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: ${theme.zIndex.overlay - 1};
`;

const MobileMenu = styled(motion.div).attrs({ className: "MobileMenu" })`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(340px, 85vw);
  background: ${theme.colors.surface};
  border-left: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.xl};
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  z-index: ${theme.zIndex.overlay - 1};
  overflow-y: auto;
`;

const MobileNavLinks = styled.nav.attrs({ className: "MobileNavLinks" })`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: ${theme.spacing.xl};
`;

const MobileNavLink = styled(Link).attrs({ className: "MobileNavLink" })`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.secondary};
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border};
  cursor: pointer;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

const MobileSocials = styled.div.attrs({ className: "MobileSocials" })`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: auto;
`;

const MobileSocialBtn = styled.a.attrs({ className: "MobileSocialBtn" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text.secondary};
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.text.primary};
    background: rgba(44, 139, 255, 0.1);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const menuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "tween" as const,
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  },
  exit: {
    x: "100%",
    transition: {
      type: "tween" as const,
      duration: 0.28,
      ease: [0.55, 0, 1, 0.45] as [number, number, number, number]
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const scrollY = useScrollY();
  const scrolled = scrollY > 60;

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Inner>
          <Logo
            to="hero"
            smooth
            duration={1200}
            offset={0}
            easing="easeInOutQuint"
          >
            YW.
          </Logo>

          <NavLinks>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                smooth
                duration={400}
                easing="easeInOutQuint"
                offset={link.offset ?? -80}
                spy
                activeClass="active"
              >
                {link.label}
              </NavLink>
            ))}
          </NavLinks>

          <Actions>
            {socialLinks.map(({ href, Icon, label }) => (
              <SocialBtn
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon />
              </SocialBtn>
            ))}
            {isMobile ? (
              <ResumeBtn href={Resume} download="Yaniv-Weinshtein-Resume.pdf">
                <Download /> Resume
              </ResumeBtn>
            ) : (
              <ResumeBtn as="button" onClick={() => setShowPdfModal(true)}>
                <Eye /> View CV
              </ResumeBtn>
            )}
          </Actions>

          <HamburgerWrapper $visible={false} />
        </Inner>
      </Nav>

      <FloatingHamburger>
        <Hamburger isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
      </FloatingHamburger>

      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              key="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMenu}
            />
            <MobileMenu
              key="menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Logo
                to="hero"
                smooth
                duration={1200}
                easing="easeInOutQuint"
                onClick={closeMenu}
              >
                YW.
              </Logo>

              <MobileNavLinks>
                {navLinks.map((link) => (
                  <MobileNavLink
                    key={link.to}
                    to={link.to}
                    smooth
                    duration={1200}
                    easing="easeInOutQuint"
                    offset={link.offset ?? -80}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </MobileNavLink>
                ))}
              </MobileNavLinks>

              <ResumeBtn
                href={Resume}
                download="Yaniv-Weinshtein-Resume.pdf"
                style={{ alignSelf: "flex-start" }}
              >
                <Download /> Resume
              </ResumeBtn>

              <MobileSocials>
                {socialLinks.map(({ href, Icon, label }) => (
                  <MobileSocialBtn
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon />
                  </MobileSocialBtn>
                ))}
              </MobileSocials>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPdfModal && (
          <>
            <PdfOverlay
              key="pdf-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPdfModal(false)}
            />
            <PdfModal
              key="pdf-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <PdfHeader>
                <h3>Yaniv Weinshtein - Resume</h3>
                <CloseBtn
                  onClick={() => setShowPdfModal(false)}
                  aria-label="Close"
                >
                  <X />
                </CloseBtn>
              </PdfHeader>
              <PdfIframe src={Resume} title="Resume PDF" />
              <PdfFooter>
                <ResumeBtn href={Resume} download="Yaniv-Weinshtein-Resume.pdf">
                  <Download /> Download PDF
                </ResumeBtn>
              </PdfFooter>
            </PdfModal>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const PdfOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: ${theme.zIndex.modal};
`;

const PdfModal = styled(motion.div)`
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

const PdfHeader = styled.div`
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

const CloseBtn = styled.button`
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

const PdfIframe = styled.iframe`
  flex: 1;
  border: none;
  width: 100%;
  background: #fff;
`;

const PdfFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  background: ${theme.colors.bgAlt};
`;

export default Header;
