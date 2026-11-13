"use client";

import { useEffect, useState, type ComponentProps } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "@/services/BlogAPI";
import { fetchGET } from "@/api";

type BlogPostCommentsProps = ComponentProps<"section"> & {
  comments?: BlogPost["comments"];
  postId?: string;
};

export function BlogPostComments({
  postId,
  comments: initialComments = [],
  className,
  ...props
}: BlogPostCommentsProps) {
  const [comments, setComments] = useState(initialComments);

  const onResetClick = () => setComments([]);

  // Formula =SUM(A1,B2)
  useEffect(() => {
    console.log("effect");

    const huston = new AbortController();

    fetchGET<BlogPost["comments"]>(`/api/blog/posts/${postId}/comments`, {
      signal: huston.signal,
    }).then((e) => setComments(e));

    // Cleanup - on destory or on [deps] change
    return () => huston.abort("CANCELLED");
  }, [postId]);

  console.log("render");

  /* vdiv : {type:'div', props: { className:'' } */
  return (
    <section className={className} {...props}>
      <Card>
        <CardHeader onClick={() => onResetClick()}>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {comments.length === 0 && (
            <p className="text-sm text-muted-foreground">No comments yet.</p>
          )}
          {comments.map((item, index) => (
            <div key={index} className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium text-foreground">{item.user}</p>
              <p className="text-sm text-muted-foreground">{item.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
