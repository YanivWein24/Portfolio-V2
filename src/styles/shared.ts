import styled from "styled-components";
import { motion } from "framer-motion";

import theme from "@styles/theme";

export const SectionLabel = styled(motion.span).attrs({ className: "SectionLabel" })`
  display: inline-block;
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.primary};
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.md};
`;

export const SectionTitle = styled(motion.h2).attrs({ className: "SectionTitle" })`
  font-size: clamp(2rem, 4vw, ${theme.typography.fontSizes["4xl"]});
  font-weight: ${theme.typography.fontWeights.extrabold};
  color: ${theme.colors.text.primary};
  letter-spacing: -1px;
  line-height: ${theme.typography.lineHeights.tight};
`;
