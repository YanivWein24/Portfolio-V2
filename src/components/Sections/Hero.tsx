import { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, Mail, Eye, Download } from "lucide-react";
import { Button, ButtonLink, ButtonScrollLink } from "@components/UI/Button";
import SocialIconBtn from "@components/UI/SocialIconBtn";
import PdfViewerModal from "@components/UI/PdfViewerModal";
import Profile from "@assets/media/profile.jpg";
import Resume from "@assets/Yaniv-Resume.pdf";
import theme from "@styles/theme";
import MaxWidth from "@styles/responsive";
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

const BgGlob = styled(animated.div).attrs({ className: "HeroBgGlob" })`
  position: absolute;
  pointer-events: none;
  z-index: 0;
  border-radius: 50%;
  filter: blur(60px);
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

  ${MaxWidth.lg`
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 140px;
  `}

  ${MaxWidth.md`
    padding: 100px ${theme.spacing.lg} ${theme.spacing["2xl"]};
    gap: ${theme.spacing.xl};
  `}

  ${MaxWidth.sm`
    padding: 90px ${theme.spacing.md} ${theme.spacing.xl};
  `}
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
  border: 1px solid rgba(var(--primary-rgb), 0.35);
  border-radius: ${theme.borderRadius.full};
  background: rgba(var(--primary-rgb), 0.08);
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.primaryLight};
  width: fit-content;

  ${MaxWidth.lg`
    margin: 0 auto;
  `}

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
  letter-spacing: 0.1px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  min-height: 2em;
  display: flex;
  align-items: center;
  gap: 10px;

  ${MaxWidth.lg`
    justify-content: center;
  `}
`;

const TypeCursor = styled.span.attrs({ className: "TypeCursor" })`
  color: ${theme.colors.primary};
`;

const Bio = styled(motion.p).attrs({ className: "HeroBio" })`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  max-width: 540px;

  ${MaxWidth.lg`
    margin: 0 auto;
  `}
`;

const CTARow = styled(motion.div).attrs({ className: "HeroCTARow" })`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};

  ${MaxWidth.lg`
    justify-content: center;
  `}
`;

const SocialRow = styled(motion.div).attrs({ className: "HeroSocialRow" })`
  display: flex;
  gap: ${theme.spacing.md};

  ${MaxWidth.lg`
    justify-content: center;
  `}
`;

const ImageSide = styled(motion.div).attrs({ className: "HeroImageSide" })`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${MaxWidth.lg`
    order: -1;
  `}
`;

const ImageFrame = styled.div.attrs({ className: "HeroImageFrame" })`
  position: relative;
  width: 340px;
  height: 340px;
  animation: ${floatY} 6s ease-in-out infinite;

  ${MaxWidth.md`
    width: 260px;
    height: 260px;
  `}

  ${MaxWidth.sm`
    width: 200px;
    height: 200px;
  `}
`;

const RingOuter = styled.div.attrs({ className: "HeroRingOuter" })`
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  border: 1px dashed rgba(var(--primary-rgb), 0.3);
  animation: ${rotateSlow} 20s linear infinite;
`;

const RingInner = styled.div.attrs({ className: "HeroRingInner" })`
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
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
  border: 3px solid rgba(var(--primary-rgb), 0.3);
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const blob1Spring = useSpring({
    transform: `translate(-50%, calc(-20% + ${scrollY * -0.35}px))`,
    config: { mass: 1, tension: 80, friction: 26 }
  });

  const blob2Spring = useSpring({
    transform: `translate(0%, calc(0% + ${scrollY * 0.25}px))`,
    config: { mass: 1, tension: 60, friction: 22 }
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Wrapper ref={ref} id="hero">
      <BgGlob
        style={{
          ...blob1Spring,
          top: "-20%",
          left: "50%",
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse, rgba(var(--primary-rgb),0.14) 0%, transparent 70%)"
        }}
      />
      <BgGlob
        style={{
          ...blob2Spring,
          bottom: "0",
          right: "10%",
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(var(--accent-alt-rgb),0.1) 0%, transparent 70%)"
        }}
      />

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
                <ButtonLink
                  $variant="primary"
                  $size="lg"
                  href={Resume}
                  download="Yaniv-Weinshtein-Resume.pdf"
                >
                  <Download /> Download CV
                </ButtonLink>
              ) : (
                <Button
                  $variant="primary"
                  $size="lg"
                  onClick={() => setShowPdf(true)}
                >
                  <Eye /> View CV
                </Button>
              )}
              <ButtonScrollLink
                $variant="outline"
                $size="md"
                to="contact"
                smooth
                duration={1200}
                easing="easeInOutQuint"
                offset={-80}
              >
                Contact Me
              </ButtonScrollLink>
            </CTARow>

            <SocialRow variants={itemVariants}>
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
            </SocialRow>
          </Content>

          <PdfViewerModal isOpen={showPdf} onClose={() => setShowPdf(false)} />

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
              style={{ top: "8%", right: "0" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              ⚛️ React & Next.js
            </TechBadge>
            <TechBadge
              style={{ bottom: "18%", left: "0%" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              🟢 Node.js + TypeScript
            </TechBadge>
            <TechBadge
              style={{ bottom: "0%", right: "5%" }}
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
