import { useState, useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import theme from "@styles/theme";
import skillsData from "@data/skills";
import type { SkillSet } from "@appTypes/index";

const Section = styled.section.attrs({ className: "Skills" })`
  position: relative;
  padding: ${theme.spacing["5xl"]} 0;
  background: ${theme.colors.bg};
  overflow: hidden;
`;

const ParallaxBg = styled(motion.div).attrs({ className: "SkillsParallaxBg" })`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(
      ellipse at 80% 20%,
      rgba(124, 58, 237, 0.08) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse at 20% 80%,
      rgba(44, 139, 255, 0.07) 0%,
      transparent 55%
    );
  pointer-events: none;
`;

const Container = styled.div.attrs({ className: "SkillsContainer" })`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const Header = styled.div.attrs({ className: "SkillsHeader" })`
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

const Tabs = styled(motion.div).attrs({ className: "SkillsTabs" })`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing["2xl"]};
`;

interface TabBtnProps {
  $active: boolean;
}

const TabBtn = styled.button.attrs({ className: "SkillsTabBtn" })<TabBtnProps>`
  padding: 8px 22px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1px solid
    ${({ $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ $active }) =>
    $active ? `rgba(44,139,255,0.15)` : "transparent"};
  color: ${({ $active }) =>
    $active ? theme.colors.primaryLight : theme.colors.text.muted};
  letter-spacing: 0.3px;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.text.primary};
  }
`;

const GridWrapper = styled.div.attrs({ className: "SkillsGridWrapper" })`
  min-height: 420px;

  @media (max-width: ${theme.breakpoints.sm}) {
    min-height: 360px;
  }
`;

const Grid = styled(motion.div).attrs({ className: "SkillsGrid" })`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: ${theme.spacing.md};
  }
`;

const SkillCard = styled(motion.a).attrs({ className: "SkillCard" })`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  text-decoration: none;
  transition:
    border-color ${theme.transitions.normal},
    transform ${theme.transitions.normal},
    box-shadow ${theme.transitions.normal};

  &:hover {
    border-color: var(--skill-color);
    transform: translateY(-6px);
    box-shadow:
      0 8px 30px rgba(0, 0, 0, 0.3),
      0 0 20px color-mix(in srgb, var(--skill-color) 20%, transparent);
  }
`;

const SkillImg = styled.img.attrs({ className: "SkillImg" })`
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
  transition: transform ${theme.transitions.normal};

  ${SkillCard}:hover & {
    transform: scale(1.12);
  }
`;

const SkillName = styled.span.attrs({ className: "SkillName" })`
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.secondary};
  text-align: center;
  letter-spacing: 0.3px;
`;

const TABS: { key: keyof SkillSet; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "crm", label: "CRM & Automation" },
  { key: "misc", label: "Misc" }
];

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  }
};

function Skills() {
  const [activeTab, setActiveTab] = useState<keyof SkillSet>("frontend");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const [inViewRef, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section ref={ref} id="skills">
      <ParallaxBg style={{ y: bgY }} />
      <Container ref={inViewRef}>
        <Header>
          <SectionLabel
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Skills
          </SectionLabel>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Tech I work with
          </SectionTitle>
        </Header>

        <Tabs
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {TABS.map((tab) => (
            <TabBtn
              key={tab.key}
              $active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </TabBtn>
          ))}
        </Tabs>

        <GridWrapper>
          <Grid
            key={activeTab}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {skillsData[activeTab].map((skill) => (
              <SkillCard
                key={skill.name}
                href={skill.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--skill-color": skill.color } as React.CSSProperties}
                variants={cardVariants}
              >
                <SkillImg src={skill.img} alt={skill.name} loading="lazy" />
                <SkillName>{skill.name}</SkillName>
              </SkillCard>
            ))}
          </Grid>
        </GridWrapper>
      </Container>
    </Section>
  );
}

export default Skills;
