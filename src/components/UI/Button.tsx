import styled, { css } from "styled-components";
import { Link } from "react-scroll";
import theme from "@styles/theme";

type ButtonVariant = "primary" | "outline" | "ghost" | "cv";

interface ButtonBaseProps {
  $variant?: ButtonVariant;
  $size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: css`
    padding: 7px 16px;
    font-size: ${theme.typography.fontSizes.sm};
    svg {
      width: 14px;
      height: 14px;
    }
  `,
  md: css`
    padding: 13px 24px;
    font-size: ${theme.typography.fontSizes.md};
    svg {
      width: 16px;
      height: 16px;
    }
  `,
  lg: css`
    padding: 14px 28px;
    font-size: ${theme.typography.fontSizes.md};
    svg {
      width: 16px;
      height: 16px;
    }
  `
};

const variantStyles = {
  primary: css`
    background: linear-gradient(
      135deg,
      ${theme.colors.primary} 0%,
      ${theme.colors.primaryDark} 100%
    );
    border: none;
    color: #fff;
    box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.35);
    &:hover:not(:disabled) {
      box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.5);
    }
  `,
  outline: css`
    background: none;
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.text.secondary};
    &:hover:not(:disabled) {
      border-color: ${theme.colors.primary};
      color: ${theme.colors.text.primary};
      background: rgba(var(--primary-rgb), 0.08);
    }
  `,
  ghost: css`
    background: none;
    border: none;
    color: ${theme.colors.text.muted};
    &:hover:not(:disabled) {
      color: ${theme.colors.text.primary};
      background: rgba(var(--primary-rgb), 0.08);
    }
  `,
  cv: css`
    background: none;
    border: 1px solid rgba(var(--primary-rgb), 0.5);
    color: ${theme.colors.primaryLight};
    margin-left: 4px;
    &:hover:not(:disabled) {
      background: rgba(var(--primary-rgb), 0.12);
      border-color: ${theme.colors.primaryLight};
      color: ${theme.colors.text.primary};
    }
  `
};

const sharedStyles = css<ButtonBaseProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $size = "md" }) => sizeStyles[$size]}
  ${({ $variant = "primary" }) => variantStyles[$variant]}
`;

export const Button = styled.button.attrs({
  className: "Button"
})<ButtonBaseProps>`
  ${sharedStyles}
`;

export const ButtonLink = styled.a.attrs({
  className: "ButtonLink"
})<ButtonBaseProps>`
  ${sharedStyles}
`;

interface ButtonScrollLinkProps extends ButtonBaseProps {
  easing?: string;
}

export const ButtonScrollLink = styled(Link).attrs({
  className: "ButtonScrollLink"
})<ButtonScrollLinkProps>`
  ${sharedStyles}
`;
