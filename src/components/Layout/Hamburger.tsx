import styled from "styled-components";
import theme from "@styles/theme";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const Button = styled.button.attrs({ className: "Hamburger" })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: ${theme.zIndex.overlay};
`;

interface LineProps {
  $isOpen: boolean;
  $index: number;
}

const Line = styled.span.attrs({ className: "HamburgerLine" })<LineProps>`
  display: block;
  width: 24px;
  height: 2px;
  background: ${theme.colors.text.primary};
  border-radius: 2px;
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease;

  ${({ $isOpen, $index }) =>
    $isOpen &&
    $index === 0 &&
    `
    transform: translateY(7px) rotate(45deg);
  `}
  ${({ $isOpen, $index }) =>
    $isOpen &&
    $index === 1 &&
    `
    opacity: 0;
    transform: scaleX(0);
  `}
  ${({ $isOpen, $index }) =>
    $isOpen &&
    $index === 2 &&
    `
    transform: translateY(-7px) rotate(-45deg);
  `}
`;

function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
    <Button
      onClick={onClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
    >
      <Line $isOpen={isOpen} $index={0} />
      <Line $isOpen={isOpen} $index={1} />
      <Line $isOpen={isOpen} $index={2} />
    </Button>
  );
}

export default Hamburger;
