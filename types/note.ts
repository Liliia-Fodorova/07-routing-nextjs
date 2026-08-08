export const TAGS = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
] as const;

export type Tag = (typeof TAGS)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}