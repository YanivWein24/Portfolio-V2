import styled from "styled-components";
import { Link } from "react-scroll";
import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import theme from "@styles/theme";
import MaxWidth from "@styles/responsive";
import SocialIconBtn from "@components/UI/SocialIconBtn";
import Text from "../../constants";

const FooterEl = styled.footer.attrs({ className: "Footer" })`
  position: relative;
  background: ${theme.colors.bg};
  border-top: 1px solid ${theme.colors.border};
  padding: ${theme.spacing["2xl"]} 0 ${theme.spacing.xl};
`;

const Inner = styled.div.attrs({ className: "FooterInner" })`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};

  ${MaxWidth.md`
    padding: 0 ${theme.spacing.lg};
  `}
`;

const Top = styled.div.attrs({ className: "FooterTop" })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
`;

interface ScrollLinkProps {
  easing?: string;
}

const Logo = styled(Link).attrs({ className: "FooterLogo" })<ScrollLinkProps>`
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

const Nav = styled.nav.attrs({ className: "FooterNav" })`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xl};

  ${MaxWidth.sm`
    gap: ${theme.spacing.lg};
  `}
`;

const NavLink = styled(Link).attrs({
  className: "FooterNavLink"
})<ScrollLinkProps>`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.muted};
  cursor: pointer;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

const Socials = styled.div.attrs({ className: "FooterSocials" })`
  display: flex;
  gap: ${theme.spacing.md};
`;

const Divider = styled.hr.attrs({ className: "FooterDivider" })`
  border: none;
  border-top: 1px solid ${theme.colors.border};
`;

const Bottom = styled.div.attrs({ className: "FooterBottom" })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const Copyright = styled.p.attrs({ className: "FooterCopyright" })`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.muted};
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 13px;
    height: 13px;
    color: #ef4444;
  }
`;

const BackToTop = styled(Link).attrs({
  className: "FooterBackToTop"
})<ScrollLinkProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.muted};
  cursor: pointer;
  transition: color ${theme.transitions.fast};

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    color: ${theme.colors.primaryLight};
  }
`;

const navItems = ["about", "skills", "experience", "projects", "contact"];

function Footer() {
  return (
    <FooterEl>
      <Inner>
        <Top>
          <Logo to="hero" smooth duration={1200} easing="easeInOutQuint">
            YW.
          </Logo>
          <Nav>
            {navItems.map((item) => (
              <NavLink
                key={item}
                to={item}
                smooth
                duration={1200}
                easing="easeInOutQuint"
                offset={-80}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavLink>
            ))}
          </Nav>
          <Socials>
            <SocialIconBtn
              href={Text.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github />
            </SocialIconBtn>
            <SocialIconBtn
              href={Text.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </SocialIconBtn>
            <SocialIconBtn href={`mailto:${Text.email}`} aria-label="Email">
              <Mail />
            </SocialIconBtn>
          </Socials>
        </Top>

        <Divider />

        <Bottom>
          <Copyright>
            Built with <Heart /> by {Text.name} · {new Date().getFullYear()}
          </Copyright>
          <BackToTop to="hero" smooth duration={1200} easing="easeInOutQuint">
            Back to top <ArrowUp />
          </BackToTop>
        </Bottom>
      </Inner>
    </FooterEl>
  );
}

export default Footer;
