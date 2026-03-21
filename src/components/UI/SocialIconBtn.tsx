import styled, { css } from "styled-components";
import theme from "@styles/theme";

type SocialIconBtnVariant = "default" | "bordered" | "mobile";

interface SocialIconBtnProps {
  $variant?: SocialIconBtnVariant;
}

const variantStyles = {
  default: css`
    width: 34px;
    height: 34px;
    color: ${theme.colors.text.muted};
    background: transparent;
    border: none;
    &:hover {
      color: ${theme.colors.text.primary};
      background: rgba(var(--primary-rgb), 0.12);
    }
    svg {
      width: 17px;
      height: 17px;
    }
  `,
  bordered: css`
    width: 36px;
    height: 36px;
    color: ${theme.colors.text.muted};
    border: 1px solid ${theme.colors.border};
    background: transparent;
    &:hover {
      border-color: ${theme.colors.primary};
      color: ${theme.colors.primaryLight};
      background: rgba(var(--primary-rgb), 0.1);
    }
    svg {
      width: 16px;
      height: 16px;
    }
  `,
  mobile: css`
    width: 40px;
    height: 40px;
    color: ${theme.colors.text.secondary};
    border: 1px solid ${theme.colors.border};
    background: transparent;
    &:hover {
      border-color: ${theme.colors.primary};
      color: ${theme.colors.text.primary};
      background: rgba(var(--primary-rgb), 0.1);
    }
    svg {
      width: 18px;
      height: 18px;
    }
  `
};

const SocialIconBtn = styled.a.attrs({
  className: "SocialIconBtn"
})<SocialIconBtnProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.full};
  transition: all ${theme.transitions.fast};
  flex-shrink: 0;

  ${({ $variant = "bordered" }) => variantStyles[$variant]}
`;

export default SocialIconBtn;
