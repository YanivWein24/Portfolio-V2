import type { TimelineEntry } from "@appTypes/index";
import Socialo from "@assets/media/Socialo.jpg";
import eBigay from "@assets/media/eBigay.jpg";
import Productive from "@assets/media/Productive.jpg";

const timeline: TimelineEntry[] = [
  {
    header: "Full Stack Developer",
    subHeader: "Productive",
    text: "Building and maintaining full-stack applications with React, TypeScript, Next.js, Node.js, Express, and MongoDB. Designing backend services with Redis caching and Kafka event pipelines to support scalable and reliable data flows. Developing rich frontend experiences using React, Next.js, React-Query, Material-UI, and Styled-Components. Implementing microservices architecture with clear service boundaries, async communication, and scalable data flows. Optimizing performance, code quality, and developer workflows.",
    date: "May 2025 – Present",
    type: "work",
    link: "https://productive.co.il",
    image: Productive,
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Kafka",
      "React-Query",
      "Material-UI",
      "Styled-Components",
      "Microservices"
    ]
  },
  {
    header: "CRM Developer",
    subHeader: "Productive",
    text: "Building custom CRM solutions tailored to diverse clients, ranging from small businesses to large companies. Utilizing platforms such as Salesforce and Monday.com for CRM functionalities, alongside Make (Integromat) and Zapier for automation and API integrations. Leading the development process from the initial characterization stage through to production, working in an agile environment.",
    date: "Dec 2023 – Apr 2025",
    type: "work",
    link: "https://productive.co.il",
    image: Productive,
    technologies: [
      "Salesforce",
      "Monday",
      "SQL",
      "Make",
      "Zapier",
      "Postman",
      "Jira"
    ]
  },
  {
    header: "Front-End Developer",
    subHeader: "Fluffy Finder",
    text: "Joining the frontend team to continue a Work-In-Progress centralized system for reporting lost/found pets that uses AI and algorithms to match between reports. Improving and refactoring the existing UI, adding new features, integrating with the backend API and analytics providers.",
    date: "Oct 2023 – Mar 2024",
    type: "work",
    link: "https://fluffyfinder.org/",
    image:
      "https://github.com/YanivWein24/Portfolio/assets/97472180/56cc72d9-dc78-48d2-b34d-052e1c985d40",
    technologies: [
      "React",
      "TypeScript",
      "Context",
      "Material-UI",
      "Auth0",
      "SWR",
      "PWA"
    ]
  },
  {
    header: "Full-Stack Developer",
    subHeader: "Socialo",
    text: "Building an AI-based B2B SaaS digital-marketing platform for businesses and marketing agencies. Leading product development from planning to production. Writing clean, reusable, and type-safe code, managing integrations (AI models, social network APIs, analytics) and working with SCRUM methodology.",
    date: "Feb 2023 – Sep 2023",
    type: "work",
    link: "https://www.socialo.app",
    image: Socialo,
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "OAuth",
      "React-Query",
      "Material-UI",
      "Styled-Components",
      "I18N"
    ]
  },
  {
    header: "Front-End Developer",
    subHeader: "eBigay",
    text: "Working in the frontend team for a marketplace web app that connects donors with those in need. Developing responsive and user-friendly UI from scratch according to the given Figma design. Consuming the server API and working alongside the back-end team.",
    date: "Oct 2022 – Jan 2023",
    type: "work",
    image: eBigay,
    technologies: [
      "React",
      "TypeScript",
      "Context",
      "React-Query",
      "Styled-Components",
      "MUI"
    ]
  },
  {
    header: "Full-Stack Development",
    subHeader: "Self Study",
    text: "Learning Full-Stack web development using online courses and a lot of hands-on projects, mostly with React and Node.js.",
    date: "2022",
    type: "school"
  },
  {
    header: "Control Systems Technician",
    subHeader: "Israeli Navy",
    text: "Locating and solving complex problems on large-scale naval systems. Working in a team under tight schedules and high-pressure conditions.",
    date: "2019 – 2022",
    type: "military"
  },
  {
    header: "Practical Engineering",
    subHeader: "Kziney-Yam Acre",
    text: "Electrical And Electronics Engineering.",
    date: "2017 – 2019",
    type: "school",
    finalProjectScore: "97"
  }
];

export default timeline;
