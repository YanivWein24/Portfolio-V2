import { useState, useRef, type FormEvent } from "react";
import styled from "styled-components";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Github,
  Linkedin
} from "lucide-react";
import useSectionParallax from "@hooks/useSectionParallax";
import { SectionLabel, SectionTitle as SectionTitleBase } from "@styles/shared";
import theme from "@styles/theme";
import MaxWidth from "@styles/responsive";
import Text from "../../constants";

const Section = styled.section.attrs({ className: "Contact" })`
  position: relative;
  padding: ${theme.spacing["5xl"]} 0;
  background: ${theme.colors.bgAlt};
  overflow: hidden;
`;

const ParallaxBg = styled(motion.div).attrs({ className: "ContactParallaxBg" })`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(
      ellipse at 50% 50%,
      rgba(var(--primary-rgb), 0.08) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 90% 10%,
      rgba(var(--accent-alt-rgb), 0.07) 0%,
      transparent 50%
    );
  pointer-events: none;
`;

const Container = styled.div.attrs({ className: "ContactContainer" })`
  max-width: 900px;
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

const Header = styled.div.attrs({ className: "ContactHeader" })`
  text-align: center;
  margin-bottom: ${theme.spacing["3xl"]};
`;

const SectionTitle = styled(SectionTitleBase)`
  margin-bottom: ${theme.spacing.md};
`;

const Subtitle = styled(motion.p).attrs({ className: "ContactSubtitle" })`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};

  strong {
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.fontWeights.semibold};
  }
`;

const Grid = styled.div.attrs({ className: "ContactGrid" })`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: ${theme.spacing["2xl"]};
  align-items: start;

  ${MaxWidth.lg`
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  `}

  ${MaxWidth.sm`
    gap: ${theme.spacing.lg};
  `}
`;

const InfoCol = styled(motion.div).attrs({ className: "ContactInfoCol" })`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  ${MaxWidth.sm`
    gap: ${theme.spacing.md};
  `}
`;

const InfoCard = styled.div.attrs({ className: "ContactInfoCard" })`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  transition:
    border-color ${theme.transitions.normal},
    transform ${theme.transitions.normal};

  &:hover {
    border-color: rgba(var(--primary-rgb), 0.35);
    transform: translateX(4px);
  }
`;

const IconWrap = styled.div.attrs({ className: "ContactIconWrap" })`
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.md};
  background: rgba(var(--primary-rgb), 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${theme.colors.primaryLight};

  svg {
    width: 20px;
    height: 20px;
  }
`;

const InfoText = styled.div.attrs({ className: "ContactInfoText" })``;

const InfoTitle = styled.p.attrs({ className: "ContactInfoTitle" })`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: 2px;
`;

const InfoValue = styled.p.attrs({ className: "ContactInfoValue" })`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.muted};
`;

const FormCard = styled(motion.form).attrs({ className: "ContactFormCard" })`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing["2xl"]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  ${MaxWidth.md`
    gap: ${theme.spacing.md};
  `}
`;

const FormRow = styled.div.attrs({ className: "FormRow" })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  ${MaxWidth.sm`
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  `}
`;

const Field = styled.div.attrs({ className: "FormField" })`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label.attrs({ className: "FormLabel" })`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.secondary};
`;

const inputStyles = `
  width: 100%;
  padding: 12px 16px;
  background: ${theme.colors.bg};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSizes.md};
  font-family: inherit;
  color: ${theme.colors.text.primary};
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &::placeholder {
    color: ${theme.colors.text.muted};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
  }
`;

const Input = styled.input.attrs({ className: "FormInput" })`
  ${inputStyles}
`;

const Textarea = styled.textarea.attrs({ className: "FormTextarea" })`
  ${inputStyles}
  resize: vertical;
  min-height: 140px;
`;

const SubmitBtn = styled(motion.button).attrs({
  className: "ContactSubmitBtn"
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  margin-top: ${theme.spacing.sm};
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
  align-self: flex-start;
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.35);
  transition: box-shadow 0.25s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.5);
  }

  svg {
    width: 16px;
    height: 16px;
  }

  ${MaxWidth.sm`
      margin: ${theme.spacing.sm} auto 0;
    `}
`;

interface StatusProps {
  $type: "success" | "error";
}

const StatusMsg = styled(motion.div).attrs({
  className: "ContactStatusMsg"
})<StatusProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  background: ${({ $type }) =>
    $type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)"};
  border: 1px solid
    ${({ $type }) =>
      $type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"};
  color: ${({ $type }) => ($type === "success" ? "#22c55e" : "#ef4444")};

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const colVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  }
};

const formVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      delay: 0.1
    }
  }
};

type Status = "idle" | "sending" | "success" | "error";

const CONTACT_LINKS = [
  {
    icon: Mail,
    title: "Email",
    value: Text.email,
    href: `mailto:${Text.email}`
  },
  {
    icon: Github,
    title: "GitHub",
    value: "YanivWein24",
    href: Text.github,
    external: true
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "yaniv-weinshtein",
    href: Text.linkedin,
    external: true
  }
];

const STATUS_CONFIG: Record<
  "success" | "error",
  { icon: typeof CheckCircle; text: string }
> = {
  success: { icon: CheckCircle, text: Text.messageSent },
  error: { icon: AlertCircle, text: Text.messageError }
};

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const { ref, bgY } = useSectionParallax();
  const [inViewRef, inView] = useInView({ threshold: 0.1 });

  const waitAndClearMessage = () => {
    setTimeout(() => {
      setStatus("idle");
    }, 4000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ""
      )
      .then(() => {
        setStatus("success");
        formRef.current?.reset();
        waitAndClearMessage();
      })
      .catch((err) => {
        console.error({ err });
        setStatus("error");
        waitAndClearMessage();
      });
  };

  return (
    <Section ref={ref} id="contact">
      <ParallaxBg style={{ y: bgY }} />
      <Container ref={inViewRef}>
        <Header>
          <SectionLabel
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Contact
          </SectionLabel>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's work together
          </SectionTitle>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {Text.contactIntro} <strong>{Text.contactBold}</strong>
          </Subtitle>
        </Header>

        <Grid>
          <InfoCol
            variants={colVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {CONTACT_LINKS.map(
              ({ icon: Icon, title, value, href, external }) => (
                <InfoCard
                  key={title}
                  as="a"
                  href={href}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer"
                  })}
                >
                  <IconWrap>
                    <Icon />
                  </IconWrap>
                  <InfoText>
                    <InfoTitle>{title}</InfoTitle>
                    <InfoValue>{value}</InfoValue>
                  </InfoText>
                </InfoCard>
              )
            )}
          </InfoCol>

          <FormCard
            ref={formRef}
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <FormRow>
              <Field>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </Field>
            </FormRow>
            <Field>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                required
              />
            </Field>

            {["success", "error"].includes(status) &&
              (() => {
                const { icon: Icon, text } =
                  STATUS_CONFIG[status as "success" | "error"];
                return (
                  <StatusMsg
                    $type={status as "success" | "error"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Icon /> {text}
                  </StatusMsg>
                );
              })()}

            <SubmitBtn
              type="submit"
              disabled={status === "sending"}
              whileTap={{ scale: 0.97 }}
            >
              <Send />
              {status === "sending" ? "Sending..." : "Send Message"}
            </SubmitBtn>
          </FormCard>
        </Grid>
      </Container>
    </Section>
  );
}

export default Contact;
