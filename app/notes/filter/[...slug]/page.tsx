import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", slug[0]],
    queryFn: () => fetchNotes({ query: "", page: 1, perPage: 8, tag: slug[0] }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={slug[0]} />
      </HydrationBoundary>
    </>
  );
}