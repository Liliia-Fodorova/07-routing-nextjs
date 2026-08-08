import axios from "axios";
import type { Note } from "@/types/note";

const key = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${key}`;

interface Response {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  query: string;
  page: number;
  perPage: number;
  tag?: string;
}

export async function fetchNotes({
  query,
  page,
  perPage,
  tag,
}: FetchNotesProps): Promise<Response> {
  const response = await axios.get<Response>(`/notes`, {
    params: {
      search: query,
      page,
      perPage,
      tag,
    },
  });

  return response.data;
}

interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteProps): Promise<Note> {
  const response = await axios.post<Note>(`/notes`, { title, content, tag });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}