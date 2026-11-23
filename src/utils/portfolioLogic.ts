import type {
  ExperienceItem,
  ProfileConfig,
  ProjectItem,
  TechCategoryId,
  TechItem,
} from '../data/portfolioData';

export interface ContactFormValues {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormValues, string>>;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  scale: number;
}

/**
 * Filters technology ecosystem entries by category id.
 */
export function filterTechnologies(
  items: TechItem[],
  category: TechCategoryId,
): TechItem[] {
  if (category === 'all') {
    return items;
  }
  return items.filter((item) => item.category === category);
}

/**
 * Finds all featured projects utilizing a specific technology name (case-insensitive).
 */
export function getProjectsForTechnology(
  projects: ProjectItem[],
  techName: string,
): ProjectItem[] {
  const normalized = techName.trim().toLowerCase();
  if (!normalized) {
    return [];
  }
  return projects.filter((project) =>
    project.technologies.some((tech) => tech.trim().toLowerCase() === normalized),
  );
}

/**
 * Validates the contact form fields strictly without silent fallbacks.
 */
export function validateContactForm(
  values: ContactFormValues,
): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!emailPattern.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (trimmedMessage.length < 12) {
    errors.message = 'Please share a brief overview of your project or inquiry (at least 12 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates a clean, formatted plain-text resume directly from the editable portfolio configuration.
 */
export function generateResumeText(
  profile: ProfileConfig,
  experience: ExperienceItem[],
  projects: ProjectItem[],
  techStack: TechItem[],
): string {
  const grouped = new Map<string, string[]>();
  for (const item of techStack) {
    const existing = grouped.get(item.categoryLabel) ?? [];
    existing.push(item.name);
    grouped.set(item.categoryLabel, existing);
  }

  const skillLines = Array.from(grouped.entries())
    .map(([category, names]) => `  - ${category}: ${names.join(', ')}`)
    .join('\n');

  const experienceLines = experience
    .map(
      (exp) =>
        `${exp.company.toUpperCase()} — ${exp.role} (${exp.period})\n` +
        `  ${exp.summary}\n` +
        exp.focusAreas.map((area) => `  • ${area}`).join('\n'),
    )
    .join('\n\n');

  const projectLines = projects
    .map(
      (proj) =>
        `${proj.index}. ${proj.title}\n` +
        `  ${proj.description}\n` +
        proj.highlights.map((h) => `  • ${h}`).join('\n') +
        `\n  Stack: ${proj.technologies.join(', ')}`,
    )
    .join('\n\n');

  return [
    profile.name.toUpperCase(),
    profile.title,
    `Experience: ${profile.experienceYears}`,
    `Email: ${profile.contact.email}`,
    `LinkedIn: ${profile.contact.linkedinUrl}`,
    ...(profile.contact.githubUrl ? [`GitHub: ${profile.contact.githubUrl}`] : []),
    '',
    'SUMMARY',
    profile.positioning,
    '',
    'WORK EXPERIENCE',
    experienceLines,
    '',
    'FEATURED PROJECTS',
    projectLines,
    '',
    'TECHNICAL ECOSYSTEM',
    skillLines,
    '',
  ].join('\n');
}

/**
 * Rotates a 3D point around X, Y, and Z axes (Euler angles in radians).
 */
export function rotatePoint3D(
  point: Point3D,
  rx: number,
  ry: number,
  rz = 0,
): Point3D {
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y1 = point.y * cosX - point.z * sinX;
  const z1 = point.y * sinX + point.z * cosX;

  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x2 = point.x * cosY + z1 * sinY;
  const z2 = -point.x * sinY + z1 * cosY;

  if (rz === 0) {
    return { x: x2, y: y1, z: z2 };
  }

  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);
  return {
    x: x2 * cosZ - y1 * sinZ,
    y: x2 * sinZ + y1 * cosZ,
    z: z2,
  };
}

/**
 * Projects a 3D point onto 2D screen coordinates using perspective foreshortening.
 */
export function projectPoint3D(
  point: Point3D,
  fov: number,
  viewerDistance: number,
  centerX: number,
  centerY: number,
): ProjectedPoint {
  const depth = Math.max(0.5, viewerDistance + point.z);
  const scale = fov / depth;
  return {
    x: centerX + point.x * scale,
    y: centerY + point.y * scale,
    z: point.z,
    scale,
  };
}

/**
 * Converts a normalized [0, 1] scroll ratio into a clamped integer percentage [0, 100].
 */
export function calculateScrollPercent(progress: number): number {
  if (!Number.isFinite(progress)) return 0;
  return Math.round(Math.min(1, Math.max(0, progress)) * 100);
}

/**
 * Prefixes local root-relative asset paths with Vite's BASE_URL so assets resolve
 * identically on root domains (Vercel/Netlify) and subpath hosts (GitHub Pages).
 */
export function resolveAssetPath(assetPath: string, baseUrl = '/'): string {
  if (/^(https?:|data:|blob:)/i.test(assetPath)) {
    return assetPath;
  }
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanAsset = assetPath.replace(/^\/+/, '');
  return `${normalizedBase}${cleanAsset}`;
}
