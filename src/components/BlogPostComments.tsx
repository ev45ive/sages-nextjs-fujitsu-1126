"use client";

import { use, type ComponentProps } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost, BlogPostComment } from "@/services/BlogAPI";
import { useBlogPostCommentsQuery } from "@/hooks";
import { BlogPostCommentForm } from "./BlogPostCommentForm";
import { Separator } from "./ui/separator";
import { cn } from "cn";
import { fetchPOST } from "@/api";

type BlogPostCommentsProps = ComponentProps<"section"> & {
  comments: Promise<BlogPost["comments"]>;
  postId: string;
};

export function BlogPostCommentsClient({
  postId,
  comments: commentsPromise,
  className,
  ...props
}: BlogPostCommentsProps) {
  const initialcomments = use(commentsPromise); // Delay loading

  const {
    data: comments = [],
    isLoading,
    error,
    refetch,
  } = useBlogPostCommentsQuery(postId, initialcomments);

  const createComment = async (data: BlogPostComment) => {
    try {
      await fetchPOST(`/api/blog/posts/${postId}/comments`, {
        ...data,
      }); // TODO: loading error

      refetch();
    } catch (e) {
      //error..
    }
  };

  return (
    <section className={cn(className, "space-y-3")} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p className="text-sm text-danger">Error loading comments</p>
          )}
          {isLoading && (
            <p className="text-sm text-muted-foreground">
              Loading commments...
            </p>
          )}
          {!isLoading && !error && comments.length === 0 && (
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

      <Separator />
      <Card>
        <CardContent className="space-y-4">
          <BlogPostCommentForm
            postId={postId}
            onSubmit={(event) => {
              event.preventDefault(); // prevent browser navigation

              const formData = new FormData(event.target);
              const data = Object.fromEntries(
                formData.entries(),
              ) as BlogPostComment;

              createComment(data);
            }}
          />
        </CardContent>
      </Card>
    </section>
  );
}
