/**
 * Single source of truth for page copy. Sections read from here so that
 * editing the portfolio's content never means touching layout or motion code.
 *
 * Everything below is drawn from the résumé in `public/` and the project
 * READMEs in `content/projects.md`. Keep it that way — no aspirational tech.
 */

export const profile = {
  name: "GC Likith Chowdary",
  role: "Software Engineer",
  location: "Bengaluru, Karnataka, India",
  resume: "/GC_Likith_Chowdary_Resume.pdf",
  github: "https://github.com/agent7898",
  linkedin: "https://www.linkedin.com/in/gc-likith-chowdary/",
} as const;

export const about = {
  lead: "I build software that holds up.",
  body: "I am a Computer Science Engineering student and Software Engineer Intern focused on back-end development and REST API design. I build mainly in Java and Python, with C, C++ and JavaScript alongside, and I use Claude Code for AI-assisted rapid development — on the Bynaptic Connections client website and on Amplyt, my major project. I care about the details most people only notice when they are missing.",
  stats: [
    { value: "9.06", label: "CGPA / 10" },
    { value: "5", label: "Languages" },
    { value: "2", label: "Projects" },
  ],
} as const;

export type Education = {
  index: string;
  qualification: string;
  institution: string;
  period: string;
  detail: string;
  coursework?: string[];
};

export const education: Education[] = [
  {
    index: "01",
    qualification: "Bachelor of Engineering, Computer Science & Engineering",
    institution: "KS Institute of Technology (Autonomous under VTU)",
    period: "2022 — Present",
    detail: "CGPA 9.06 / 10, up to the 6th semester",
    coursework: [
      "Data Structures",
      "Algorithms",
      "Object-Oriented Programming",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
  },
  {
    index: "02",
    qualification: "Pre-University, Karnataka State Board",
    institution: "Narayana PU College",
    period: "2020 — 2022",
    detail: "91.83%",
  },
];

export type Project = {
  index: string;
  title: string;
  role: string;
  status: string;
  summary: string;
  contributions: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Amplyt",
    role: "Backend Developer",
    status: "Major Project",
    summary:
      "An EV charging trip planner for highway drivers — it routes a journey such as Bengaluru → Mysuru, finds reachable, compatible chargers along the route and ranks each stop by expected wait, detour and charging speed.",
    contributions: [
      "Built a layered FastAPI backend — routers, services and repositories over a SQLAlchemy ORM — documented through Swagger/OpenAPI",
      "Managed schema changes with Alembic migrations and secured accounts with JWT-based authentication",
      "Integrated a self-hosted OSRM routing engine and containerised the services with Docker Compose",
      "Covered the API, auth and routing with a pytest suite, using Claude Code for AI-assisted rapid development",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "JWT", "Docker", "OSRM"],
  },
  {
    index: "02",
    title: "Bynaptic Connections",
    role: "Freelance Website Developer",
    status: "Ongoing",
    summary:
      "A method-driven medical and technical platform built around four pillars — a diagnostic knowledge channel, an algorithmic reasoning engine, a signal-tools R&D hub, and a structured mentorship program.",
    contributions: [
      "Secured the OpenAI API key within server-side Supabase Edge Functions with 256 kB payload caps and automated offline fallback",
      "Built a country-first, three-tier clinician verification flow gating the reviews workspace",
      "Engineered a rule-based diagnostic reasoning engine across 25 clinical pathways with negation parsing and automated red-flag triage",
      "Shipped a dual-provider auth system (Google OAuth + passwordless email OTP) resolving to one account",
    ],
    stack: ["Supabase", "OpenAI API", "Edge Functions", "JavaScript", "Claude Code"],
  },
];

export const stack = {
  Languages: ["Java", "Python", "C", "C++", "JavaScript"],
  "Backend & APIs": [
    "FastAPI",
    "REST APIs",
    "SQLAlchemy",
    "Alembic",
    "JWT Authentication",
    "Swagger / OpenAPI",
    "Supabase",
    "PostgreSQL",
  ],
  "Tools & Platforms": [
    "Git & GitHub",
    "Docker & Docker Compose",
    "Linux / Command Line",
    "pytest",
    "VS Code",
    "Eclipse IDE",
    "Claude Code",
  ],
  "Core Concepts": [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
  ],
} as const;

/** Flat list for the marquee band. */
export const marqueeItems = [
  "Java",
  "Python",
  "C / C++",
  "JavaScript",
  "FastAPI",
  "SQLAlchemy",
  "Docker",
  "Supabase",
  "Claude Code",
  "Linux",
];
