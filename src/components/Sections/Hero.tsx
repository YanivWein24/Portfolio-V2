import { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from "framer-motion";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Eye,
  Download,
  X
} from "lucide-react";
import Profile from "@assets/media/profile.jpg";
import Resume from "@assets/Yaniv-Resume.pdf";
import theme from "@styles/theme";
import Text from "../../constants";

const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-18px); }
`;

const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.08); }
`;

const Wrapper = styled.section.attrs({ className: "Hero" })`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${theme.colors.bg};
`;

const BgGlow = styled.div.attrs({ className: "HeroBgGlow" })`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 600px;
    background: radial-gradient(
      ellipse,
      rgba(44, 139, 255, 0.14) 0%,
      transparent 70%
    );
    filter: blur(40px);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 10%;
    width: 500px;
    height: 400px;
    background: radial-gradient(
      ellipse,
      rgba(124, 58, 237, 0.1) 0%,
      transparent 70%
    );
    filter: blur(60px);
    animation: ${pulse} 8s ease-in-out infinite;
  }
`;

const Grid = styled.div.attrs({ className: "HeroGrid" })`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px ${theme.spacing.xl} ${theme.spacing["3xl"]};
  display: grid;
  grid-template-columns: 1fr 420px;
  align-items: center;
  gap: ${theme.spacing["3xl"]};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 140px;
  }
`;

const Content = styled(motion.div).attrs({ className: "HeroContent" })`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const Badge = styled(motion.div).attrs({ className: "HeroBadge" })`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border: 1px solid rgba(44, 139, 255, 0.35);
  border-radius: ${theme.borderRadius.full};
  background: rgba(44, 139, 255, 0.08);
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.primaryLight};
  width: fit-content;

  @media (max-width: ${theme.breakpoints.lg}) {
    margin: 0 auto;
  }

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px #22c55e;
    animation: ${pulse} 2.5s ease-in-out infinite;
  }
`;

const Heading = styled(motion.h1).attrs({ className: "HeroHeading" })`
  font-size: clamp(2.8rem, 6vw, ${theme.typography.fontSizes["6xl"]});
  font-weight: ${theme.typography.fontWeights.extrabold};
  line-height: ${theme.typography.lineHeights.tight};
  letter-spacing: -2px;
  color: ${theme.colors.text.primary};
`;

const GradientSpan = styled.span.attrs({ className: "GradientSpan" })`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.accent} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TypeRow = styled(motion.div).attrs({ className: "HeroTypeRow" })`
  font-size: clamp(1.1rem, 2.5vw, ${theme.typography.fontSizes["2xl"]});
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  min-height: 2em;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: ${theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const TypeCursor = styled.span.attrs({ className: "TypeCursor" })`
  color: ${theme.colors.primary};
`;

const Bio = styled(motion.p).attrs({ className: "HeroBio" })`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  max-width: 540px;

  @media (max-width: ${theme.breakpoints.lg}) {
    margin: 0 auto;
  }
`;

const CTARow = styled(motion.div).attrs({ className: "HeroCTARow" })`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const PrimaryBtn = styled.button.attrs({ className: "HeroPrimaryBtn" })`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.primaryDark} 100%
  );
  border: none;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: #fff;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  box-shadow: 0 4px 12px rgba(44, 139, 255, 0.35);

  &:hover {
    box-shadow: 0 6px 20px rgba(44, 139, 255, 0.45);
  }
`;

const SecondaryBtn = styled(Link).attrs({ className: "HeroSecondaryBtn" })`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 24px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.25s ease;
  background: none;
  text-decoration: none;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.text.primary};
    background: rgba(44, 139, 255, 0.08);
  }
`;

const HeroPdfOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: ${theme.zIndex.modal};
`;

const HeroPdfModal = styled(motion.div)`
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

const HeroPdfHeader = styled.div`
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

const HeroCloseBtn = styled.button`
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

const HeroPdfIframe = styled.iframe`
  flex: 1;
  border: none;
  width: 100%;
  background: #fff;
`;

const HeroPdfFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  background: ${theme.colors.bgAlt};
`;

const HeroPdfDownloadBtn = styled.a`
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

const SocialRow = styled(motion.div).attrs({ className: "HeroSocialRow" })`
  display: flex;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a.attrs({ className: "HeroSocialLink" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text.muted};
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primaryLight};
    background: rgba(44, 139, 255, 0.1);
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ImageSide = styled(motion.div).attrs({ className: "HeroImageSide" })`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.lg}) {
    order: -1;
  }
`;

const ImageFrame = styled.div.attrs({ className: "HeroImageFrame" })`
  position: relative;
  width: 340px;
  height: 340px;
  animation: ${floatY} 6s ease-in-out infinite;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 240px;
    height: 240px;
  }
`;

const RingOuter = styled.div.attrs({ className: "HeroRingOuter" })`
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  border: 1px dashed rgba(44, 139, 255, 0.3);
  animation: ${rotateSlow} 20s linear infinite;
`;

const RingInner = styled.div.attrs({ className: "HeroRingInner" })`
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px solid rgba(44, 139, 255, 0.2);
`;

const GlowCircle = styled.div.attrs({ className: "HeroGlowCircle" })`
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: ${theme.colors.gradients.primary};
  opacity: 0.15;
  filter: blur(20px);
`;

const ProfileImg = styled.img.attrs({ className: "HeroProfileImg" })`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: top center;
  border: 3px solid rgba(44, 139, 255, 0.3);
  position: relative;
  z-index: 1;
`;

const TechBadge = styled(motion.div).attrs({ className: "HeroTechBadge" })`
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  white-space: nowrap;
  box-shadow: ${theme.shadows.md};
  z-index: 2;
`;

const ScrollIndicator = styled(motion.div).attrs({
  className: "ScrollIndicator"
})`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${theme.colors.text.muted};
  font-size: ${theme.typography.fontSizes.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const ScrollLine = styled(motion.div).attrs({ className: "ScrollLine" })`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, ${theme.colors.primary}, transparent);
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  } as const
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.85, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      delay: 0.3
    }
  }
};

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [showPdf, setShowPdf] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Wrapper ref={ref} id="hero">
      <BgGlow />

      <motion.div style={{ y, opacity, width: "100%" }}>
        <Grid>
          <Content
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Badge variants={itemVariants}>Available for opportunities</Badge>

            <Heading variants={itemVariants}>
              Hi, I'm <GradientSpan>{Text.name}</GradientSpan>
              <br />
              <TypeRow as="div">
                <TypeCursor>{">"}</TypeCursor>
                <TypeAnimation
                  sequence={[
                    "Full-Stack Developer",
                    2200,
                    "React & Node.js Expert",
                    2200,
                    "TypeScript Enthusiast",
                    2200,
                    "Microservices Builder",
                    2200
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  style={{ display: "inline-block" }}
                />
              </TypeRow>
            </Heading>

            <Bio variants={itemVariants}>{Text.heroSubtitle}</Bio>

            <CTARow variants={itemVariants}>
              {isMobile ? (
                <PrimaryBtn
                  as="a"
                  href={Resume}
                  download="Yaniv-Weinshtein-Resume.pdf"
                >
                  <Download /> Download CV
                </PrimaryBtn>
              ) : (
                <PrimaryBtn onClick={() => setShowPdf(true)}>
                  <Eye /> View CV
                </PrimaryBtn>
              )}
              <SecondaryBtn
                to="contact"
                smooth
                duration={1200}
                easing="easeInOutQuint"
                offset={-80}
              >
                Contact Me
              </SecondaryBtn>
            </CTARow>

            <SocialRow variants={itemVariants}>
              <SocialLink
                href={Text.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </SocialLink>
              <SocialLink
                href={Text.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </SocialLink>
              <SocialLink href={`mailto:${Text.email}`} aria-label="Email">
                <Mail />
              </SocialLink>
            </SocialRow>
          </Content>

          <AnimatePresence>
            {showPdf && (
              <>
                <HeroPdfOverlay
                  key="hero-pdf-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowPdf(false)}
                />
                <HeroPdfModal
                  key="hero-pdf-modal"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <HeroPdfHeader>
                    <h3>Yaniv Weinshtein - Resume</h3>
                    <HeroCloseBtn
                      onClick={() => setShowPdf(false)}
                      aria-label="Close"
                    >
                      <X />
                    </HeroCloseBtn>
                  </HeroPdfHeader>
                  <HeroPdfIframe src={Resume} title="Resume PDF" />
                  <HeroPdfFooter>
                    <HeroPdfDownloadBtn
                      href={Resume}
                      download="Yaniv-Weinshtein-Resume.pdf"
                    >
                      <Download /> Download PDF
                    </HeroPdfDownloadBtn>
                  </HeroPdfFooter>
                </HeroPdfModal>
              </>
            )}
          </AnimatePresence>

          <ImageSide
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <ImageFrame>
              <GlowCircle />
              <RingOuter />
              <RingInner />
              <ProfileImg src={Profile} alt="Yaniv Weinshtein" />
            </ImageFrame>

            <TechBadge
              style={{ top: "8%", right: "-5%" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              ⚛️ React & Next.js
            </TechBadge>
            <TechBadge
              style={{ bottom: "18%", left: "-8%" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              🟢 Node.js + TypeScript
            </TechBadge>
            <TechBadge
              style={{ bottom: "3%", right: "5%" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              🗄️ MongoDB · Redis · Kafka
            </TechBadge>
          </ImageSide>
        </Grid>
      </motion.div>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <Link
          to="about"
          smooth
          duration={900}
          offset={-80}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8
          }}
        >
          <ScrollLine
            animate={{ scaleY: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <ArrowDown size={14} />
        </Link>
      </ScrollIndicator>
    </Wrapper>
  );
}

export default Hero;
