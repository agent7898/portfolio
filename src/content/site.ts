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
  email: "gclikith@gmail.com",
  resume: "/GC_Likith_Chowdary_Resume.pdf",
  github: "https://github.com/agent7898",
  linkedin: "https://www.linkedin.com/in/gc-likith-chowdary/",
} as const;

export const about = {
  lead: "I build software that holds up.",
  body: "I am a Computer Science Engineering student with strong fundamentals in problem-solving and core CS, and a growing focus on software development and machine learning. I work across C, C++, Python, Java and R, and I care about the details most people only notice when they are missing.",
  stats: [
    { value: "9.06", label: "CGPA / 10" },
    { value: "6", label: "Languages" },
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
    detail: "93%",
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
    title: "Bynaptic Connections",
    role: "Freelance Website Developer",
    status: "Ongoing",
    summary:
      "A method-driven medical and technical platform built around four pillars — a diagnostic knowledge channel, an algorithmic reasoning engine, a signal-tools R&D hub, and a structured mentorship program.",
    contributions: [
      "Architected the React + Vite frontend and integrated Supabase for auth, storage, and row-level security",
      "Built a country-first, three-tier clinician verification flow gating the reviews workspace",
      "Designed the differential case pipeline: clinician intake → AI formatting → admin diagnosis → standardised report",
      "Shipped a dual-provider auth system (Google OAuth + passwordless email OTP) resolving to one account",
    ],
    stack: ["React", "Vite", "Supabase", "JavaScript"],
  },
  {
    index: "02",
    title: "FER Local",
    role: "Mini Project",
    status: "Prototype",
    summary:
      "A local, webcam-based facial emotion recognition prototype with an explainability overlay — it predicts an emotion and returns a Grad-CAM heatmap rendered over the detected face.",
    contributions: [
      "Built the emotion recognition model on MobileNetV2, tuned to run on edge devices",
      "Engineered the FastAPI service handling real-time inference and model hot-reload",
      "Implemented face detection and cropping with an OpenCV Haar cascade",
      "Generated Grad-CAM heatmaps to make predictions inspectable rather than opaque",
    ],
    stack: ["Python", "FastAPI", "TensorFlow", "MobileNetV2", "OpenCV", "Grad-CAM"],
  },
];

export const stack = {
  Languages: ["C", "C++", "Java", "Python", "JavaScript", "R"],
  "Web & Frontend": ["React", "Vite", "FastAPI", "Supabase"],
  "Machine Learning": [
    "TensorFlow",
    "OpenCV",
    "MobileNetV2",
    "Grad-CAM",
    "Model training workflows",
  ],
  "Tools & Practice": [
    "Git & GitHub",
    "Linux / Command Line",
    "Jupyter Notebook",
    "VS Code",
    "Eclipse IDE",
    "Object-Oriented Programming",
  ],
} as const;

/** Flat list for the marquee band. */
export const marqueeItems = [
  "C / C++",
  "Python",
  "Java",
  "JavaScript",
  "R",
  "FastAPI",
  "Supabase",
  "Machine Learning",
  "Linux",
];
