/**
 * Verification status for every public personal claim, link, or asset.
 * Ensures unconfirmed items are explicitly surfaced as candidate or TBD rather than fabricated.
 */
export type VerificationStatus = 'verified' | 'candidate' | 'tbd';

export interface VerifiableValue<T = string> {
  value: T | null;
  status: VerificationStatus;
  note?: string;
}

export type ThemeId = 'blood' | 'aged' | 'indigo' | 'moss';

export type SurfaceClass = 'on-paper' | 'on-paper-2' | 'on-ink' | 'on-accent';

export type ChapterAnchorId =
  | 'opening'
  | 'work'
  | 'stack'
  | 'story'
  | 'experience'
  | 'receipts'
  | 'capabilities'
  | 'contact';

export interface ChapterDefinition {
  number: string;
  kanji: string;
  id: ChapterAnchorId;
  title: string;
  navLabel?: string;
  surface: SurfaceClass;
}

export interface ProjectItem {
  index: string;
  slug: string;
  name: string;
  featured: boolean;
  role: VerifiableValue<string>;
  badge: VerifiableValue<string>;
  summary: VerifiableValue<string>;
  stack: string[];
  stackStatus: VerificationStatus;
  repoUrl: VerifiableValue<string>;
  demoUrl: VerifiableValue<string>;
}

export interface SkillLayer {
  index: string;
  name: string;
  subtitle: string;
  technologies: string[];
  usedIn: string[];
  status: VerificationStatus;
  accentCard?: boolean;
}

export interface StoryPanelItem {
  index: string;
  variant: 'place' | 'quote' | 'deadline' | 'now' | 'motto';
  heading: string;
  body: VerifiableValue<string>;
  note?: string;
}

export interface PolaroidPlaceholder {
  id: string;
  caption: VerifiableValue<string>;
  alt: string;
  status: VerificationStatus;
}

export interface ExperienceItem {
  index: string;
  title: string;
  organization: string;
  period: VerifiableValue<string>;
  kind: string;
  highlights: string[];
  tags: string[];
  status: VerificationStatus;
}

export interface ReceiptCredential {
  index: string;
  title: string;
  issuer: string;
  detail: VerifiableValue<string>;
  credentialUrl: VerifiableValue<string>;
  status: VerificationStatus;
}

export interface CapabilityItem {
  index: string;
  title: string;
  description: string;
  proofLabels: string[];
  status: VerificationStatus;
}

export interface SocialDestination {
  platform: 'GitHub' | 'LinkedIn' | 'Resume' | 'Email';
  handle: VerifiableValue<string>;
  url: VerifiableValue<string>;
}

export interface PortfolioContent {
  identity: {
    firstName: string;
    lastName: string;
    fullName: string;
    monogram: string;
    handle: VerifiableValue<string>;
    eyebrow: VerifiableValue<string>;
    lede: VerifiableValue<string>;
    now: VerifiableValue<string>;
    stackSummary: VerifiableValue<string>;
    availability: VerifiableValue<string>;
    location: string;
  };
  projects: ProjectItem[];
  skillLayers: SkillLayer[];
  statementText: string[];
  storyPanels: StoryPanelItem[];
  offThePage: PolaroidPlaceholder[];
  experiences: ExperienceItem[];
  receipts: ReceiptCredential[];
  capabilities: CapabilityItem[];
  contact: {
    prompt: string;
    email: VerifiableValue<string>;
    socials: SocialDestination[];
  };
  footer: {
    volumeLabel: string;
    fontsCredit: string;
    stackCredit: string;
    copyrightYear: string;
  };
}
