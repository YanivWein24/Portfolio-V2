import { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedNumbers from "react-animated-numbers";
// @ts-expect-error - CommonJS interop
const AnimatedNumbersComponent =
  (AnimatedNumbers as any).default || AnimatedNumbers;
import theme from "@styles/theme";
import Text from "../../constants";

const Section = styled.section.attrs({ className: "About" })`
  position: relative;
  padding: ${theme.spacing["5xl"]} 0;
  background: ${theme.colors.bgAlt};
  overflow: hidden;
`;

const ParallaxBg = styled(motion.div).attrs({ className: "AboutParallaxBg" })`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(
      ellipse at 20% 50%,
      rgba(44, 139, 255, 0.07) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 80% 30%,
      rgba(124, 58, 237, 0.06) 0%,
      transparent 55%
    );
  pointer-events: none;
`;

const Container = styled.div.attrs({ className: "AboutContainer" })`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const SectionLabel = styled(motion.span).attrs({ className: "SectionLabel" })`
  display: inline-block;
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.primary};
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.md};
`;

const SectionTitle = styled(motion.h2).attrs({ className: "SectionTitle" })`
  font-size: clamp(2rem, 4vw, ${theme.typography.fontSizes["4xl"]});
  font-weight: ${theme.typography.fontWeights.extrabold};
  color: ${theme.colors.text.primary};
  letter-spacing: -1px;
  line-height: ${theme.typography.lineHeights.tight};
  margin-bottom: ${theme.spacing["2xl"]};
`;

const Grid = styled.div.attrs({ className: "AboutGrid" })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing["3xl"]};
  align-items: start;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const TextCol = styled(motion.div).attrs({ className: "AboutTextCol" })`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const BodyText = styled.p.attrs({ className: "AboutBodyText" })`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
`;

const Divider = styled.div.attrs({ className: "AboutDivider" })`
  width: 48px;
  height: 3px;
  background: linear-gradient(90deg, ${theme.colors.primary}, transparent);
  border-radius: 2px;
  margin: ${theme.spacing.md} 0;
`;

const HighlightBox = styled(motion.div).attrs({ className: "HighlightBox" })`
  padding: ${theme.spacing.xl};
  background: linear-gradient(
    135deg,
    rgba(44, 139, 255, 0.08),
    rgba(124, 58, 237, 0.05)
  );
  border: 1px solid rgba(44, 139, 255, 0.2);
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 5rem;
    line-height: 1;
    color: ${theme.colors.primary};
    opacity: 0.25;
    font-family: Georgia, serif;
  }
`;

const StatsCol = styled(motion.div).attrs({ className: "AboutStatsCol" })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
`;

const StatCard = styled(motion.div).attrs({ className: "StatCard" })`
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  position: relative;
  overflow: hidden;
  transition:
    border-color ${theme.transitions.normal},
    transform ${theme.transitions.normal};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${theme.colors.primary},
      ${theme.colors.accent}
    );
    opacity: 0;
    transition: opacity ${theme.transitions.normal};
  }

  &:hover {
    border-color: rgba(44, 139, 255, 0.35);
    transform: translateY(-4px);
    &::before {
      opacity: 1;
    }
  }
`;

const StatNumber = styled.div.attrs({ className: "StatNumber" })`
  display: flex;
  align-items: baseline;
  gap: 2px;
  font-size: ${theme.typography.fontSizes["3xl"]};
  font-weight: ${theme.typography.fontWeights.extrabold};
  color: ${theme.colors.text.primary};
  line-height: 1;
`;

const Plus = styled.span.attrs({ className: "StatPlus" })`
  font-size: ${theme.typography.fontSizes.xl};
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.p.attrs({ className: "StatLabel" })`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.muted};
  font-weight: ${theme.typography.fontWeights.medium};
`;

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  }
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  }
};

const staggerCard: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  })
};

function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const [inViewRef, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <Section ref={ref} id="about">
      <ParallaxBg style={{ y: bgY }} />

      <Container ref={inViewRef}>
        <SectionLabel
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About Me
        </SectionLabel>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Engineering with purpose,
          <br />
          shipping with precision.
        </SectionTitle>

        <Grid>
          <TextCol
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <BodyText>{Text.aboutMe}</BodyText>
            <Divider />
            <BodyText>{Text.alwaysDiscovering}</BodyText>
            <HighlightBox
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {Text.yearsOfExperience}
            </HighlightBox>
          </TextCol>

          <StatsCol
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {Text.stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                custom={i}
                variants={staggerCard}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <StatNumber>
                  {inView && (
                    <AnimatedNumbersComponent
                      animateToNumber={stat.value}
                      useThousandsSeparator={false}
                      fontStyle={{
                        color: theme.colors.text.primary,
                        fontWeight: "800"
                      }}
                    />
                  )}
                  <Plus>+</Plus>
                </StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsCol>
        </Grid>
      </Container>
    </Section>
  );
}

export default About;
