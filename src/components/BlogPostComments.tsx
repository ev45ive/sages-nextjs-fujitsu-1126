"use client";

import { useState, type ComponentProps } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "@/services/BlogAPI";

type BlogPostCommentsProps = ComponentProps<"section"> & {
  comments?: BlogPost["comments"];
};

export function BlogPostComments({
  comments: initialComments = [],
  className,
  ...props
}: BlogPostCommentsProps) {
  const [comments, setComments] = useState(initialComments);

  //   const reset = () => setComments(comments); // no-op - same comments stable ref!
  const reset = () => setComments([]); //same value -> new ref - renrender!

  //   setComments([...comments]) // Ininite rerender loop

  return (
    <section className={className} {...props}>
      <Card>
        <CardHeader onClick={() => reset()}>
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
