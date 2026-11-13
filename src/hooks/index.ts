import { fetchGET } from "@/api";
import { BlogPost, BlogPostComment } from "@/services/BlogAPI";
import { useState, useEffect } from "react";

export function useBlogPostCommentsQuery(
  postId = "",
  initial: BlogPostComment[] = [],
) {
  return useFetchQuery<BlogPostComment[]>(
    [postId],
    ({ signal }) => fetchGET("/api/blog/posts/${postId}/comments", { signal }),
    initial,
  );
}

export function useBlogPostsQuery(postId = "", initial: BlogPost[] = []) {
  return useFetchQuery<BlogPost[]>(
    [postId],
    ({ signal }) => fetchGET("/api/blog/posts", { signal }),
    initial,
  );
}

export function useFetchQuery<T>(
  key: unknown[],
  fetcher: (init: { signal: AbortSignal }) => Promise<T>,
  initial?: T,
) {
  const [data, setData] = useState<T | undefined>(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const huston = new AbortController();

    const handler = setTimeout(() => {
      setIsLoading(true);

      fetcher({
        signal: huston.signal,
      })
        .then((e) => setData(e))
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    }, 0);

    return () => {
      clearTimeout(handler);
      huston.abort("CANCELLED");
    };
  }, key);

  return {
    data,
    isLoading,
    error,
  };
}
