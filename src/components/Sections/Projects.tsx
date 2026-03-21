import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import useSectionParallax from "@hooks/useSectionParallax";
import theme from "@styles/theme";
import MaxWidth from "@styles/responsive";
import projects from "@data/projects";

const Section = styled.section.attrs({ className: "Projects" })`
  position: relative;
  padding: ${theme.spacing["5xl"]} 0 400px;
  background: ${theme.colors.bg};
  overflow: hidden;
`;

const ParallaxBg = styled(motion.div).attrs({
  className: "ProjectsParallaxBg"
})`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(
      ellipse at 70% 70%,
      rgba(44, 139, 255, 0.07) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse at 30% 20%,
      rgba(124, 58, 237, 0.07) 0%,
      transparent 50%
    );
  pointer-events: none;
`;

const Container = styled.div.attrs({ className: "ProjectsContainer" })`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  position: relative;
  z-index: 1;

  ${MaxWidth.md`
    padding: 0 ${theme.spacing.lg};
  `}

  ${MaxWidth.sm`
    padding: 0 ${theme.spacing.md};
  `}
`;

const Header = styled.div.attrs({ className: "ProjectsHeader" })`
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

const Grid = styled(motion.div).attrs({ className: "ProjectsGrid" })`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};

  ${MaxWidth.lg`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${MaxWidth.md`
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  `}
`;

const Card = styled(motion.div).attrs({ className: "ProjectCard" })`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition:
    border-color ${theme.transitions.normal},
    box-shadow ${theme.transitions.normal},
    transform ${theme.transitions.normal};

  &:hover {
    border-color: rgba(44, 139, 255, 0.35);
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.4),
      0 0 24px rgba(44, 139, 255, 0.1);
    transform: translateY(-6px);
  }
`;

const FeaturedBadge = styled.span.attrs({ className: "FeaturedBadge" })`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  padding: 4px 12px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.bold};
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.accent}
  );
  color: #fff;
  letter-spacing: 0.5px;
`;

const ImageCarousel = styled.div.attrs({ className: "ProjectImageCarousel" })`
  position: relative;
  height: 200px;
  overflow: hidden;
  background: ${theme.colors.surfaceHigh};
  flex-shrink: 0;

  ${MaxWidth.sm`
    height: 180px;
  `}
`;

const CarouselImg = styled(motion.img).attrs({ className: "CarouselImg" })`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CarouselBtn = styled.button.attrs({ className: "CarouselBtn" })`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(5, 13, 26, 0.8);
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity ${theme.transitions.fast};

  svg {
    width: 14px;
    height: 14px;
  }

  ${ImageCarousel}:hover & {
    opacity: 1;
  }
`;

const PrevBtn = styled(CarouselBtn).attrs({ className: "PrevBtn" })`
  left: 8px;
`;

const NextBtn = styled(CarouselBtn).attrs({ className: "NextBtn" })`
  right: 8px;
`;

const CardBody = styled.div.attrs({ className: "ProjectCardBody" })`
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  flex: 1;
`;

const ProjectName = styled.h3.attrs({ className: "ProjectName" })`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
`;

const ProjectDesc = styled.p.attrs({ className: "ProjectDesc" })`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  flex: 1;
`;

const ToolList = styled.div.attrs({ className: "ToolList" })`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ToolChip = styled.span.attrs({ className: "ToolChip" })`
  padding: 3px 10px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.muted};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.colors.border};
`;

const LinkRow = styled.div.attrs({ className: "ProjectLinkRow" })`
  display: flex;
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border};
`;

const ProjectLink = styled.a.attrs({ className: "ProjectLink" })`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.muted};
  transition: color ${theme.transitions.fast};

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    color: ${theme.colors.primaryLight};
  }
`;

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  }
};

interface ProjectCardInnerProps {
  project: (typeof projects)[0];
}

function ProjectCardInner({ project }: ProjectCardInnerProps) {
  const [imgIndex, setImgIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i === 0 ? project.image.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i === project.image.length - 1 ? 0 : i + 1));
  };

  return (
    <Card variants={cardVariants}>
      {project.featured && <FeaturedBadge>Featured</FeaturedBadge>}
      <ImageCarousel>
        <AnimatePresence mode="wait">
          <CarouselImg
            key={imgIndex}
            src={project.image[imgIndex]}
            alt={`${project.name} screenshot`}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        {project.image.length > 1 && (
          <>
            <PrevBtn onClick={prev} aria-label="Previous image">
              <ChevronLeft />
            </PrevBtn>
            <NextBtn onClick={next} aria-label="Next image">
              <ChevronRight />
            </NextBtn>
          </>
        )}
      </ImageCarousel>

      <CardBody>
        <ProjectName>{project.name}</ProjectName>
        <ProjectDesc>{project.description}</ProjectDesc>
        <ToolList>
          {project.tools.map((t) => (
            <ToolChip key={t}>{t}</ToolChip>
          ))}
        </ToolList>
        <LinkRow>
          {project.links[0] && (
            <ProjectLink
              href={project.links[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github /> Source
            </ProjectLink>
          )}
          {project.links[1] && (
            <ProjectLink
              href={project.links[1]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink /> Live Demo
            </ProjectLink>
          )}
        </LinkRow>
      </CardBody>
    </Card>
  );
}

function Projects() {
  const { ref, bgY, contentY, contentOpacity } = useSectionParallax();
  const [inViewRef, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <Section ref={ref} id="projects">
      <ParallaxBg style={{ y: bgY }} />
      <motion.div style={{ y: contentY, opacity: contentOpacity }}>
        <Container ref={inViewRef}>
          <Header>
            <SectionLabel
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Projects
            </SectionLabel>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Things I've built
            </SectionTitle>
          </Header>

          <Grid
            variants={gridVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {projects.map((project) => (
              <ProjectCardInner key={project.name} project={project} />
            ))}
          </Grid>
        </Container>
      </motion.div>
    </Section>
  );
}

export default Projects;
