export type Level = "O Level" | "A Level" | "IGCSE" | "GCSE" | "AS" | "A2";
export type Board = "CAIE" | "Edexcel";
export type Subject = "Physics" | "Maths" | "Chemistry" | "Computer Science" | "Commerce";

export type VideoTags = {
  level?: Level;
  board?: Board;
  subject?: Subject;
  topic?: string;
};

// CAIE syllabus codes -> tags. Confirm against the subjects actually offered (spec section 7.4).
const SYLLABUS_CODES: Record<string, VideoTags> = {
  "5054": { level: "O Level", board: "CAIE", subject: "Physics" },
  "9702": { level: "A Level", board: "CAIE", subject: "Physics" },
  "0625": { level: "IGCSE", board: "CAIE", subject: "Physics" },
  "5070": { level: "O Level", board: "CAIE", subject: "Chemistry" },
  "9701": { level: "A Level", board: "CAIE", subject: "Chemistry" },
  "0620": { level: "IGCSE", board: "CAIE", subject: "Chemistry" },
  "4024": { level: "O Level", board: "CAIE", subject: "Maths" },
  "9709": { level: "A Level", board: "CAIE", subject: "Maths" },
  "0580": { level: "IGCSE", board: "CAIE", subject: "Maths" },
  "2210": { level: "O Level", board: "CAIE", subject: "Computer Science" },
  "9618": { level: "A Level", board: "CAIE", subject: "Computer Science" },
  "0478": { level: "IGCSE", board: "CAIE", subject: "Computer Science" },
};

const LEVEL_PATTERNS: Array<[RegExp, Level]> = [
  [/\bigcse\b/i, "IGCSE"],
  [/\bo[\s-]?level\b|\bolevel\b/i, "O Level"],
  [/\ba[\s-]?level\b|\balevel\b/i, "A Level"],
  [/\bas[\s-]?level\b|\bas\b/i, "AS"],
  [/\ba2\b/i, "A2"],
  [/\bgcse\b/i, "GCSE"],
];

const SUBJECT_PATTERNS: Array<[RegExp, Subject]> = [
  [/\bphysics\b|\bphy\b/i, "Physics"],
  [/\bmath(s|ematics)?\b/i, "Maths"],
  [/\bchem(istry)?\b/i, "Chemistry"],
  [/\bcomputer\s*science\b|\bcomputing\b|\bics\b/i, "Computer Science"],
  [/\baccounting\b|\bbusiness\b|\beconomics\b|\bcommerce\b/i, "Commerce"],
];

function matchSyllabusCode(text: string): VideoTags | null {
  const match = text.match(/\b\d{4}\b/);
  if (match && SYLLABUS_CODES[match[0]]) return SYLLABUS_CODES[match[0]];
  return null;
}

export function tagVideo(title: string, description: string): VideoTags {
  const text = `${title} ${description}`;

  const fromCode = matchSyllabusCode(text);
  if (fromCode) return fromCode;

  const tags: VideoTags = {};

  if (/\bedexcel\b/i.test(text)) tags.board = "Edexcel";
  else if (/\bcaie\b|\bcie\b|\bcambridge\b/i.test(text)) tags.board = "CAIE";

  for (const [pattern, level] of LEVEL_PATTERNS) {
    if (pattern.test(text)) {
      tags.level = level;
      break;
    }
  }

  for (const [pattern, subject] of SUBJECT_PATTERNS) {
    if (pattern.test(text)) {
      tags.subject = subject;
      break;
    }
  }

  return tags;
}
