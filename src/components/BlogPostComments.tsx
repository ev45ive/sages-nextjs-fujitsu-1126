"use client";

import { type ComponentProps } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "@/services/BlogAPI";
import { useBlogPostCommentsQuery } from "@/hooks";

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
  //...
  //   const query2 = useBlogPostCommentsQuery(123, initialComments)

  const {
    data: comments,
    isLoading,
    error,
  } = useBlogPostCommentsQuery(postId, initialComments);

  return (
    <section className={className} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <p className="text-sm text-muted-foreground">
              Loading commments...
            </p>
          )}
          {error && (
            <p className="text-sm text-danger">Error loading comments</p>
          )}
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
