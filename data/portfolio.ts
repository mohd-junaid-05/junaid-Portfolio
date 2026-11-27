import type { PortfolioContent } from './types';

/**
 * Typed personal content inventory for Mohd Junaid.
 * Candidate entries come directly from `docs/content-inventory.md`;
 * unconfirmed dates, roles, links, and descriptions remain explicitly marked `tbd`
 * until owner sign-off.
 */
export const portfolioContent: PortfolioContent = {
  identity: {
    firstName: 'Mohd',
    lastName: 'Junaid',
    fullName: 'Mohd Junaid',
    monogram: 'MJ',
    handle: {
      value: 'MOHD-JUNAID-05',
      status: 'candidate',
      note: 'Confirm preferred public handle.',
    },
    eyebrow: {
      value: 'CSE Student · Hyderabad, India',
      status: 'candidate',
      note: 'Confirm preferred public headline.',
    },
    lede: {
      value: 'Building software systems across web, core programming, and AI.',
      status: 'candidate',
      note: 'Refine personal editorial lede on owner review.',
    },
    now: {
      value: 'B.Tech CSE · SCET Hyderabad & NEXUS Coding Club',
      status: 'candidate',
      note: 'Confirm semester, year, and exact leadership title.',
    },
    stackSummary: {
      value: 'Next.js · TypeScript · Python · C · Git',
      status: 'candidate',
      note: 'Confirm finalized primary stack list.',
    },
    availability: {
      value: null,
      status: 'tbd',
      note: 'TBD — confirm internship / collaboration / project availability.',
    },
    location: 'Hyderabad, India',
  },
  projects: [
    {
      index: '01',
      slug: 'repnex',
      name: 'Repnex',
      featured: true,
      role: { value: null, status: 'tbd', note: 'Confirm role and contribution.' },
      badge: { value: 'Candidate Project', status: 'candidate' },
      summary: {
        value: null,
        status: 'tbd',
        note: 'TBD — owner to provide verified description and outcome.',
      },
      stack: [],
      stackStatus: 'tbd',
      repoUrl: { value: null, status: 'tbd' },
      demoUrl: { value: null, status: 'tbd' },
    },
    {
      index: '02',
      slug: 'roomify',
      name: 'Roomify',
      featured: true,
      role: { value: null, status: 'tbd', note: 'Confirm role and contribution.' },
      badge: { value: 'Candidate Project', status: 'candidate' },
      summary: {
        value: null,
        status: 'tbd',
        note: 'TBD — owner to provide verified description and outcome.',
      },
      stack: [],
      stackStatus: 'tbd',
      repoUrl: { value: null, status: 'tbd' },
      demoUrl: { value: null, status: 'tbd' },
    },
    {
      index: '03',
      slug: 'ghost-ai',
      name: 'Ghost AI',
      featured: true,
      role: { value: null, status: 'tbd', note: 'Confirm role and contribution.' },
      badge: { value: 'Candidate Project', status: 'candidate' },
      summary: {
        value: null,
        status: 'tbd',
        note: 'TBD — owner to provide verified description and outcome.',
      },
      stack: [],
      stackStatus: 'tbd',
      repoUrl: { value: null, status: 'tbd' },
      demoUrl: { value: null, status: 'tbd' },
    },
    {
      index: '04',
      slug: 'medcomm',
      name: 'MedComm',
      featured: true,
      role: { value: null, status: 'tbd', note: 'Confirm role and contribution.' },
      badge: { value: 'Candidate Project', status: 'candidate' },
      summary: {
        value: null,
        status: 'tbd',
        note: 'TBD — owner to provide verified description and outcome.',
      },
      stack: [],
      stackStatus: 'tbd',
      repoUrl: { value: null, status: 'tbd' },
      demoUrl: { value: null, status: 'tbd' },
    },
  ],
  skillLayers: [
    {
      index: '00',
      name: 'Languages',
      subtitle: 'Core languages used across projects and workshops',
      technologies: ['Python', 'C', 'TypeScript (TBD)'],
      usedIn: ['Workshops', 'Coursework'],
      status: 'candidate',
    },
    {
      index: '01',
      name: 'Web & UI',
      subtitle: 'Application architecture and interface layer (TBD)',
      technologies: ['Next.js', 'React', 'HTML/CSS'],
      usedIn: ['Portfolio Foundation'],
      status: 'candidate',
    },
    {
      index: '02',
      name: 'AI & Data',
      subtitle: 'AI exploration and applied workflows (TBD)',
      technologies: ['AI Workshops', 'Ghost AI (TBD)'],
      usedIn: ['Ghost AI'],
      status: 'candidate',
    },
    {
      index: '03',
      name: 'Tooling & Cloud',
      subtitle: 'Version control and cloud foundations',
      technologies: ['Git', 'GitHub', 'Google Cloud (Skill Badges)'],
      usedIn: ['Workshops', 'Credentials'],
      status: 'candidate',
      accentCard: true,
    },
  ],
  statementText: ['LEARN BY BUILDING', 'SHIP REAL WORK'],
  storyPanels: [
    {
      index: '1',
      variant: 'place',
      heading: 'SCET Hyderabad',
      body: {
        value: 'Computer Science & Engineering student at SCET Hyderabad.',
        status: 'candidate',
        note: 'Confirm current academic year/semester and graduation timeline.',
      },
    },
    {
      index: '2',
      variant: 'quote',
      heading: 'Engineering Approach',
      body: {
        value: null,
        status: 'tbd',
        note: 'TBD — owner quote or guiding principle.',
      },
    },
    {
      index: '3',
      variant: 'deadline',
      heading: 'NEXUS Coding Club',
      body: {
        value: 'Active contributor and workshop lead with NEXUS Coding Club.',
        status: 'candidate',
        note: 'Confirm official role title and dates.',
      },
    },
    {
      index: '4',
      variant: 'now',
      heading: 'Workshops',
      body: {
        value: 'Peer sessions covering Git/GitHub, Python, C programming, and AI.',
        status: 'candidate',
        note: 'Confirm dates and session scope.',
      },
    },
    {
      index: '5',
      variant: 'motto',
      heading: 'Build & Share',
      body: {
        value: null,
        status: 'tbd',
        note: 'TBD — concise closing motto.',
      },
    },
  ],
  offThePage: [
    {
      id: 'snap-01',
      caption: { value: null, status: 'tbd', note: 'TBD — photo 1 caption' },
      alt: 'Placeholder slot awaiting owner-approved photograph 1',
      status: 'tbd',
    },
    {
      id: 'snap-02',
      caption: { value: null, status: 'tbd', note: 'TBD — photo 2 caption' },
      alt: 'Placeholder slot awaiting owner-approved photograph 2',
      status: 'tbd',
    },
    {
      id: 'snap-03',
      caption: { value: null, status: 'tbd', note: 'TBD — photo 3 caption' },
      alt: 'Placeholder slot awaiting owner-approved photograph 3',
      status: 'tbd',
    },
    {
      id: 'snap-04',
      caption: { value: null, status: 'tbd', note: 'TBD — photo 4 caption' },
      alt: 'Placeholder slot awaiting owner-approved photograph 4',
      status: 'tbd',
    },
  ],
  experiences: [
    {
      index: '01',
      title: 'NEXUS Coding Club',
      organization: 'SCET Hyderabad',
      period: { value: null, status: 'tbd', note: 'Confirm exact role title and dates.' },
      kind: 'Leadership (Role TBD)',
      highlights: [
        'Club involvement and peer mentoring (details TBD).',
      ],
      tags: ['NEXUS', 'Community'],
      status: 'candidate',
    },
    {
      index: '02',
      title: 'Technical Workshops',
      organization: 'SCET / NEXUS',
      period: { value: null, status: 'tbd', note: 'Confirm workshop dates and responsibilities.' },
      kind: 'Workshops',
      highlights: [
        'Git and GitHub workflow fundamentals (dates/role TBD).',
        'Python and C programming sessions (dates/role TBD).',
        'AI introductory workshop (dates/role TBD).',
      ],
      tags: ['Git/GitHub', 'Python', 'C', 'AI'],
      status: 'candidate',
    },
    {
      index: '03',
      title: 'B.Tech — Computer Science & Engineering',
      organization: 'SCET Hyderabad',
      period: { value: null, status: 'tbd', note: 'Confirm current year/semester and graduation year.' },
      kind: 'Education',
      highlights: [
        'Pursuing Computer Science & Engineering at SCET Hyderabad.',
      ],
      tags: ['CSE', 'Hyderabad'],
      status: 'candidate',
    },
  ],
  receipts: [
    {
      index: '01',
      title: 'Google Cloud Skill Badges',
      issuer: 'Google Cloud',
      detail: {
        value: null,
        status: 'tbd',
        note: 'TBD — confirm exact badge titles and completion dates.',
      },
      credentialUrl: {
        value: null,
        status: 'tbd',
        note: 'TBD — confirm public Cloud Skills Boost profile link.',
      },
      status: 'candidate',
    },
    {
      index: '02',
      title: 'NxtWave Courses',
      issuer: 'NxtWave',
      detail: {
        value: null,
        status: 'tbd',
        note: 'TBD — confirm completed course names and dates.',
      },
      credentialUrl: {
        value: null,
        status: 'tbd',
        note: 'TBD — confirm public certificate URLs.',
      },
      status: 'candidate',
    },
  ],
  capabilities: [
    {
      index: '01',
      title: 'Web Applications',
      description: 'Structured frontend and full-stack application builds (verified project proof TBD).',
      proofLabels: ['Repnex (TBD)', 'Roomify (TBD)'],
      status: 'candidate',
    },
    {
      index: '02',
      title: 'AI & Applied Systems',
      description: 'Applied AI exploration and system prototypes (verified details TBD).',
      proofLabels: ['Ghost AI (TBD)', 'MedComm (TBD)'],
      status: 'candidate',
    },
    {
      index: '03',
      title: 'Core Programming',
      description: 'Problem solving and foundational engineering in Python and C.',
      proofLabels: ['Python', 'C'],
      status: 'candidate',
    },
    {
      index: '04',
      title: 'Git & Technical Workshops',
      description: 'Version-control workflows and peer technical workshops at SCET / NEXUS.',
      proofLabels: ['Git/GitHub', 'NEXUS'],
      status: 'candidate',
    },
  ],
  contact: {
    prompt: 'Direct links and contact destinations are staged below without a form backend.',
    email: {
      value: null,
      status: 'tbd',
      note: 'TBD — confirm public contact email address.',
    },
    socials: [
      {
        platform: 'GitHub',
        handle: { value: 'mohd-junaid-05', status: 'candidate' },
        url: {
          value: 'https://github.com/mohd-junaid-05',
          status: 'candidate',
          note: 'Confirm public GitHub URL visibility.',
        },
      },
      {
        platform: 'LinkedIn',
        handle: { value: null, status: 'tbd' },
        url: { value: null, status: 'tbd', note: 'TBD — confirm LinkedIn destination.' },
      },
      {
        platform: 'Resume',
        handle: { value: null, status: 'tbd' },
        url: { value: null, status: 'tbd', note: 'TBD — confirm public resume link.' },
      },
    ],
  },
  footer: {
    volumeLabel: 'END OF VOLUME 01',
    fontsCredit: 'Anton, Archivo, Instrument Serif, JetBrains Mono, Shippori Mincho',
    stackCredit: 'Next.js, React, TypeScript, Tailwind CSS',
    copyrightYear: '2026',
  },
};
