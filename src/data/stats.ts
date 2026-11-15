export type Stat = {
  label: string;
  value: number | null; // null until the client confirms a real figure
  suffix?: string;
};

export const stats: Stat[] = [
  { label: "Years of teaching", value: null, suffix: "+" },
  { label: "Students taught", value: null, suffix: "+" },
  { label: "A/A* grades", value: null, suffix: "+" },
  { label: "Subjects offered", value: 5 },
];
