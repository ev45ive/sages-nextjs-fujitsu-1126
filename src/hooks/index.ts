import { fetchGET } from "@/api";
import { BlogPostComment } from "@/services/BlogAPI";
import { useState, useEffect } from "react";

export function useBlogPostCommentsQuery(
  postId = "",
  initial: BlogPostComment[] = [],
) {
  const [comments, setComments] = useState<BlogPostComment[]>(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const huston = new AbortController();

    const handler = setTimeout(() => {
      setIsLoading(true);

      fetchGET<BlogPostComment[]>(`/api/blog/posts/${postId}/comments`, {
        signal: huston.signal,
      })
        .then((e) => setComments(e))
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    }, 0);

    return () => {
      clearTimeout(handler);
      huston.abort("CANCELLED");
    };
  }, [postId]);

  return {
    data: comments,
    isLoading,
    error,
  };
}
