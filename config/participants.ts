/**
 * Participants Configuration
 *
 * TEST SCENARIO — Americas:
 *   - Linda as host
 *   - 2 co-organizers + Mihaly as support-presenter (3 total in closing grid)
 *   - 4 AWS supporters (tests 4-person / 2×2 grid)
 *   - 15 Americas UGs across US, Canada, Brazil, Mexico, Argentina, Colombia, Chile, Peru
 */

// ── User Group Interface ──
export interface UserGroup {
  flag: string;
  name: string;
  location: string; // "City, Country"
  logo?: string;
}

// ── 15 Participating User Groups — Americas ──
export const USER_GROUPS = [
  { flag: "🇺🇸", name: "AWS User Group New York",       location: "New York, United States" },
  { flag: "🇺🇸", name: "AWS User Group Seattle",        location: "Seattle, United States" },
  { flag: "🇺🇸", name: "AWS User Group Chicago",        location: "Chicago, United States" },
  { flag: "🇺🇸", name: "AWS User Group Boston",         location: "Boston, United States" },
  { flag: "🇺🇸", name: "AWS User Group Austin",         location: "Austin, United States" },
  { flag: "🇺🇸", name: "AWS User Group San Francisco",  location: "San Francisco, United States" },
  { flag: "🇨🇦", name: "AWS User Group Toronto",        location: "Toronto, Canada" },
  { flag: "🇨🇦", name: "AWS User Group Vancouver",      location: "Vancouver, Canada" },
  { flag: "🇧🇷", name: "AWS User Group São Paulo",      location: "São Paulo, Brazil" },
  { flag: "🇧🇷", name: "AWS User Group Rio de Janeiro", location: "Rio de Janeiro, Brazil" },
  { flag: "🇲🇽", name: "AWS User Group Mexico City",    location: "Mexico City, Mexico" },
  { flag: "🇦🇷", name: "AWS User Group Buenos Aires",   location: "Buenos Aires, Argentina" },
  { flag: "🇨🇴", name: "AWS User Group Bogotá",         location: "Bogotá, Colombia" },
  { flag: "🇨🇱", name: "AWS User Group Santiago",       location: "Santiago, Chile" },
  { flag: "🇵🇪", name: "AWS User Group Lima",           location: "Lima, Peru" },
] as const satisfies UserGroup[];

export type UserGroupName = typeof USER_GROUPS[number]["name"];

export const COUNTRIES = Array.from(new Set(USER_GROUPS.map((g) => g.flag)));

// ── Community Program Types ──
export type CommunityProgram =
  | "ug-leader"
  | "aws-hero"
  | "aws-community-builder"
  | "cloud-club-captain"
  | "aws-ambassador";

export const COMMUNITY_PROGRAM_LABELS: Record<CommunityProgram, string> = {
  "ug-leader":              "AWS User Group Leader",
  "aws-hero":               "AWS Hero",
  "aws-community-builder":  "AWS Community Builder",
  "cloud-club-captain":     "Cloud Club Captain",
  "aws-ambassador":         "AWS Ambassador",
};

export interface CommunityMembership {
  program: CommunityProgram;
  userGroup?: UserGroupName;
}

// ── Organizer Interface ──
export interface Organizer {
  name: string;
  fullName?: string;
  streamRole?: "host" | "co-organizer" | "support-presenter" | "gamemaster";
  programs?: CommunityMembership[];
  jobTitle?: string;
  location?: string;
  flag: string;
  face: string;
  type: "community" | "aws";
  title?: string;
  subtitle?: string;
  bio?: string[];
}

export function getOrganizerRole(p: Organizer): string {
  if (p.jobTitle) return p.jobTitle;
  if (p.programs?.length) {
    return p.programs.map((m) => COMMUNITY_PROGRAM_LABELS[m.program]).join(" & ");
  }
  return "";
}

export function getOrganizerUserGroup(p: Organizer): UserGroupName | undefined {
  return p.programs?.find((m) => m.program === "ug-leader")?.userGroup;
}

// ── Community Organizers ──
// Americas scenario: 3 in closing grid (2 co-organizers + 1 support-presenter)
export const ORGANIZERS: Organizer[] = [
  {
    name: "Linda", fullName: "Linda Mohamed", streamRole: "host",
    programs: [
      { program: "ug-leader", userGroup: "AWS User Group New York" },
      { program: "aws-hero" },
    ],
    location: "New York, United States", flag: "🇺🇸", face: "assets/faces/linda.jpg", type: "community",
    title: "AWS Community Hero",
    subtitle: "AWS User Group New York",
    bio: [
      "Your host for today's GameDay Americas stream",
      "AWS Community Hero & User Group Leader",
    ],
  },
  {
    name: "Jerome", streamRole: "co-organizer",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Toronto" }],
    location: "Toronto, Canada", flag: "🇨🇦", face: "assets/faces/jerome.jpg", type: "community",
    bio: ["AWS User Group Leader — Toronto. Co-organizer of GameDay Americas."],
  },
  {
    name: "Anda", streamRole: "co-organizer",
    programs: [
      { program: "ug-leader", userGroup: "AWS User Group São Paulo" },
      { program: "aws-community-builder" },
    ],
    location: "São Paulo, Brazil", flag: "🇧🇷", face: "assets/faces/anda.jpg", type: "community",
    bio: ["AWS Community Builder & UG Leader — São Paulo."],
  },
  {
    name: "Mihaly", streamRole: "support-presenter",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Seattle" }],
    location: "Seattle, United States", flag: "🇺🇸", face: "assets/faces/mihaly.jpg", type: "community",
  },
];

// ── AWS Supporters — 4 people (tests 2×2 grid) ──
export const AWS_SUPPORTERS: Organizer[] = [
  { name: "Arnaud", streamRole: "gamemaster", jobTitle: "Sr. Developer Advocate, AWS",        flag: "🇫🇷", face: "assets/faces/arnaud.jpg", type: "aws",
    bio: ["Sr. Developer Advocate at AWS. Delivers the official GameDay instructions."] },
  { name: "Loïc",   streamRole: "gamemaster", jobTitle: "Sr. Technical Account Manager, AWS", flag: "🇫🇷", face: "assets/faces/loic.jpg",   type: "aws",
    bio: ["Sr. Technical Account Manager at AWS. Co-delivers GameDay instructions."] },
  { name: "Uliana",  jobTitle: "Community Manager, AWS",        flag: "🌍", face: "assets/faces/uliana.jpg",  type: "aws" },
  { name: "Natalia", jobTitle: "DevEx Community Manager, AWS",  flag: "🌍", face: "assets/faces/natalia.jpg", type: "aws" },
];

// ── Display Stats Config ────────────────────────────────────────────────────
export type StatType = "user-groups" | "countries" | "timezones" | "edition" | "gameplay-hours";
export type StatConfig = StatType | { type: StatType; sub: string };
export const DISPLAY_STATS: StatConfig[] = ["user-groups", "countries", "timezones", "edition"];
