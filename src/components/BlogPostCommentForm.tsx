import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type BlogPostCommentFormProps = ComponentProps<"form"> & {
  postId: string;
};

export function BlogPostCommentForm({
  postId,
  className,
  ...props
}: BlogPostCommentFormProps) {
  return (
    <form className={className} {...props}>
      <input type="hidden" name="postId" value={postId} />
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor={`comment-user-${postId}`}>Name</FieldLabel>
          <Input
            id={`comment-user-${postId}`}
            name="user"
            placeholder="Your name"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`comment-text-${postId}`}>Comment</FieldLabel>
          <Textarea
            id={`comment-text-${postId}`}
            name="comment"
            placeholder="Write a comment..."
          />
        </Field>
        <Field orientation="horizontal">
          <Button type="submit">Add comment</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
