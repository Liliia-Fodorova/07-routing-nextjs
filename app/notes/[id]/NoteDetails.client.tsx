"use client";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useQuery({
    queryKey: ["noteDetails", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const formattedDate = note?.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note?.createdAt}`;

  const router = useRouter();
  const handleBack = () => router.back();
  return (
    <div className={css.container}>
      {isLoading && <p>Loading, wait...</p>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && (
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
          <button className={css.backBtn} onClick={handleBack}>
            Go back
          </button>
        </div>
      )}
    </div>
  );
}