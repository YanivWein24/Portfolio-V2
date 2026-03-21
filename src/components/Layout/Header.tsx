import { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Download, Eye, Sun, Moon } from "lucide-react";
import Hamburger from "./Hamburger";
import navLinks from "@data/navLinks";
import Resume from "@assets/Yaniv-Resume.pdf";
import theme from "@styles/theme";
import MaxWidth from "@styles/responsive";
import { ButtonLink } from "@components/UI/Button";
import SocialIconBtn from "@components/UI/SocialIconBtn";
import PdfViewerModal from "@components/UI/PdfViewerModal";
import useScrollY from "@hooks/useScrollY";
import useTheme from "@hooks/useTheme";

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
  $isOpen?: boolean;
}

const Nav = styled.header.attrs({ className: "Header" })<ScrolledProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ $isOpen }) =>
    $isOpen ? theme.zIndex.overlay + 10 : theme.zIndex.fixed};
  transition:
    background 0.4s ease,
    backdrop-filter 0.4s ease,
    box-shadow 0.4s ease,
    padding 0.4s ease;

  ${({ $scrolled }) =>
    $scrolled
      ? css`
          background: var(--header-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 1px 0 rgba(var(--primary-rgb), 0.15),
            0 4px 24px rgba(var(--shadow-rgb), 0.4);
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
  justify-content: center;
  position: relative;
  height: 100%;

  ${MaxWidth.md`
    padding: 0 ${theme.spacing.lg};
    justify-content: space-between;
  `}

  ${MaxWidth.sm`
    padding: 0 ${theme.spacing.md};
  `}
`;

interface ScrollLinkProps {
  easing?: string;
}

const Logo = styled(Link).attrs({ className: "Logo" })<ScrollLinkProps>`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.extrabold};
  background: linear-gradient(
    135deg,
    var(--logo-from) 0%,
    ${theme.colors.primaryLight} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  letter-spacing: -0.5px;
  position: absolute;
  left: ${theme.spacing.xl};

  ${MaxWidth.md`
    position: static;
  `}
`;

const NavLinks = styled.nav.attrs({ className: "NavLinks" })`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  ${MaxWidth.lg`
    gap: ${theme.spacing.sm};
  `}

  ${MaxWidth.md`
    display: none;
  `}
`;

const NavLink = styled(Link).attrs({ className: "NavLink" })<ScrollLinkProps>`
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
  position: absolute;
  right: ${theme.spacing.xl};

  ${MaxWidth.md`
    display: none;
  `}

  ${MaxWidth.sm`
    right: ${theme.spacing.md};
  `}
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
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${theme.spacing.lg};
  z-index: ${theme.zIndex.overlay + 10};

  ${MaxWidth.md`
    display: flex;
  `}

  ${MaxWidth.sm`
    right: ${theme.spacing.md};
  `}
`;

const FloatingHamburger = styled.div.attrs({ className: "FloatingHamburger" })`
  display: none;
`;

const ThemeToggle = styled.button.attrs({ className: "ThemeToggle" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid ${theme.colors.border};
  background: transparent;
  color: ${theme.colors.text.muted};
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${theme.colors.text.primary};
    border-color: rgba(var(--primary-rgb), 0.4);
    background: rgba(var(--primary-rgb), 0.1);
  }
`;

const Overlay = styled(motion.div).attrs({ className: "MobileOverlay" })`
  position: fixed;
  inset: 0;
  background: rgba(var(--shadow-rgb), 0.7);
  backdrop-filter: blur(4px);
  z-index: ${theme.zIndex.overlay - 1};
`;

const MobileMenu = styled(motion.div).attrs({ className: "MobileMenu" })`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(300px, 80vw);
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

const MobileNavLink = styled(Link).attrs({
  className: "MobileNavLink"
})<ScrollLinkProps>`
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
  const { isDark, toggleTheme } = useTheme();

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <Nav $scrolled={scrolled} $isOpen={isOpen}>
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
              <SocialIconBtn
                key={label}
                $variant="default"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon />
              </SocialIconBtn>
            ))}
            <ButtonLink
              $variant="cv"
              $size="sm"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowPdfModal(true);
              }}
            >
              <Eye /> View CV
            </ButtonLink>
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun /> : <Moon />}
            </ThemeToggle>
          </Actions>

          <HamburgerWrapper $visible={isOpen}>
            <Hamburger isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
          </HamburgerWrapper>
        </Inner>
      </Nav>

      <FloatingHamburger />

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

              <ButtonLink
                $variant="cv"
                $size="sm"
                href={Resume}
                download="Yaniv-Weinshtein-Resume.pdf"
                style={{ alignSelf: "flex-start" }}
              >
                <Download /> Resume
              </ButtonLink>

              <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
                {isDark ? <Sun /> : <Moon />}
              </ThemeToggle>

              <MobileSocials>
                {socialLinks.map(({ href, Icon, label }) => (
                  <SocialIconBtn
                    key={label}
                    $variant="mobile"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon />
                  </SocialIconBtn>
                ))}
              </MobileSocials>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>

      <PdfViewerModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
      />
    </>
  );
}

export default Header;
