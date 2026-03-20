import { useState, useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Briefcase,
  GraduationCap,
  Shield,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import theme from "@styles/theme";
import timeline from "@data/timeline";
import type { TimelineEntry } from "@appTypes/index";

const Section = styled.section.attrs({ className: "Experience" })`
  position: relative;
  padding: ${theme.spacing["5xl"]} 0;
  background: ${theme.colors.bgAlt};
  overflow: hidden;
`;

const ParallaxBg = styled(motion.div).attrs({
  className: "ExperienceParallaxBg"
})`
  position: absolute;
  inset: -20%;
  background: radial-gradient(
    ellipse at 50% 30%,
    rgba(44, 139, 255, 0.06) 0%,
    transparent 60%
  );
  pointer-events: none;
`;

const Container = styled.div.attrs({ className: "ExperienceContainer" })`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const Header = styled.div.attrs({ className: "ExperienceHeader" })`
  text-align: center;
  margin-bottom: ${theme.spacing["3xl"]};
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
`;

const TimelineWrap = styled.div.attrs({ className: "TimelineWrap" })`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 28px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${theme.colors.border} 10%,
      ${theme.colors.border} 90%,
      transparent
    );

    @media (max-width: ${theme.breakpoints.sm}) {
      left: 18px;
    }
  }
`;

const EntryWrapper = styled(motion.div).attrs({
  className: "TimelineEntryWrapper"
})`
  position: relative;
  padding-left: 68px;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    padding-left: 50px;
  }
`;

const Dot = styled.div.attrs({ className: "TimelineDot" })<{
  $type: TimelineEntry["type"];
}>`
  position: absolute;
  left: 14px;
  top: 20px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: ${({ $type }) =>
    $type === "work"
      ? "linear-gradient(135deg, #2c8bff, #0e51a3)"
      : $type === "military"
        ? "linear-gradient(135deg, #10b981, #059669)"
        : "linear-gradient(135deg, #7c3aed, #5b21b6)"};
  box-shadow:
    0 0 0 4px ${theme.colors.bgAlt},
    0 0 12px rgba(44, 139, 255, 0.3);

  svg {
    width: 13px;
    height: 13px;
    color: #fff;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    left: 4px;
    width: 24px;
    height: 24px;
  }
`;

const Card = styled(motion.div).attrs({ className: "TimelineCard" })`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: border-color ${theme.transitions.normal};

  &:hover {
    border-color: rgba(44, 139, 255, 0.3);
  }
`;

const CardHeader = styled.button.attrs({ className: "TimelineCardHeader" })`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`;

const CardMeta = styled.div.attrs({ className: "TimelineCardMeta" })`
  flex: 1;
`;

const CardTitle = styled.h3.attrs({ className: "TimelineCardTitle" })`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: 4px;
`;

const CardSubtitle = styled.div.attrs({ className: "TimelineCardSubtitle" })`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const Company = styled.span.attrs({ className: "TimelineCompany" })`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.primary};
`;

const DateBadge = styled.span.attrs({ className: "TimelineDateBadge" })`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.text.muted};
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
`;

interface ChevronProps {
  $isOpen: boolean;
}

const ChevronIcon = styled(ChevronDown).attrs({
  className: "TimelineChevron"
})<ChevronProps>`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  color: ${theme.colors.text.muted};
  transition: transform 0.3s ease;
  margin-top: 4px;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const CardBody = styled(motion.div).attrs({ className: "TimelineCardBody" })`
  overflow: hidden;
`;

const CardBodyInner = styled.div.attrs({ className: "TimelineCardBodyInner" })`
  padding: 0 ${theme.spacing.xl} ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const Description = styled.p.attrs({ className: "TimelineDescription" })`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
`;

const TechList = styled.div.attrs({ className: "TimelineTechList" })`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const TechChip = styled.span.attrs({ className: "TechChip" })`
  padding: 4px 12px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.primaryLight};
  background: rgba(44, 139, 255, 0.1);
  border: 1px solid rgba(44, 139, 255, 0.2);
`;

const LinkBtn = styled.a.attrs({ className: "TimelineLinkBtn" })`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.primaryLight};
  transition: color ${theme.transitions.fast};

  svg {
    width: 13px;
    height: 13px;
  }

  &:hover {
    color: #fff;
  }
`;

const CompanyImg = styled.img.attrs({ className: "TimelineCompanyImg" })`
  width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.sm};
  opacity: 0.85;
`;

const entryVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  })
};

const bodyVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  }
};

const typeIcon: Record<TimelineEntry["type"], React.ReactNode> = {
  work: <Briefcase />,
  school: <GraduationCap />,
  military: <Shield />
};

function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const [inViewRef, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <Section ref={ref} id="experience">
      <ParallaxBg style={{ y: bgY }} />
      <Container ref={inViewRef}>
        <Header>
          <SectionLabel
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Experience
          </SectionLabel>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            My journey so far
          </SectionTitle>
        </Header>

        <TimelineWrap>
          {timeline.map((entry, i) => (
            <EntryWrapper
              key={`${entry.header}-${i}`}
              custom={i}
              variants={entryVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <Dot $type={entry.type}>{typeIcon[entry.type]}</Dot>

              <Card>
                <CardHeader
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <CardMeta>
                    <CardTitle>{entry.header}</CardTitle>
                    <CardSubtitle>
                      <Company>{entry.subHeader}</Company>
                      <DateBadge>{entry.date}</DateBadge>
                    </CardSubtitle>
                  </CardMeta>
                  <ChevronIcon $isOpen={openIndex === i} />
                </CardHeader>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <CardBody
                      key="body"
                      variants={bodyVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                    >
                      <CardBodyInner>
                        {entry.image && (
                          <CompanyImg
                            src={entry.image}
                            alt={entry.subHeader}
                            loading="lazy"
                          />
                        )}
                        <Description>{entry.text}</Description>
                        {entry.technologies && (
                          <TechList>
                            {entry.technologies.map((tech) => (
                              <TechChip key={tech}>{tech}</TechChip>
                            ))}
                          </TechList>
                        )}
                        {entry.link && (
                          <LinkBtn
                            href={entry.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit <ExternalLink />
                          </LinkBtn>
                        )}
                        {entry.finalProjectScore && (
                          <TechChip>
                            Final Score: {entry.finalProjectScore}
                          </TechChip>
                        )}
                      </CardBodyInner>
                    </CardBody>
                  )}
                </AnimatePresence>
              </Card>
            </EntryWrapper>
          ))}
        </TimelineWrap>
      </Container>
    </Section>
  );
}

export default Experience;
