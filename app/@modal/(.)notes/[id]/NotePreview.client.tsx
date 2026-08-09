"use client";
import Modal from "@/components/Modal/Modal";
import { useRouter, useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const router = useRouter();
  const handleBack = () => router.back();

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

  return (
    <Modal onClose={handleBack}>
      <div className={css.container}>
        {isLoading && <p>Loading, wait...</p>}

        {isError && (
          <p>Error: {error instanceof Error ? error.message : "Something went wrong"}</p>
        )}

        {isSuccess && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>

            <p className={css.tag}>{note.tag}</p>

            <p className={css.content}>{note.content}</p>

            <p className={css.date}>Created at: {note.createdAt}</p>
            
            <button className={css.backBtn} onClick={handleBack}>
              Go back
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}