import { delay } from "@/app/utils/delay";
import { notFound } from "next/navigation";

import posts from "../../public/postsdata.json";

export async function getBlogPosts({
  filter = "",
}: {
  filter?: string;
} = {}): Promise<BlogPost[]> {
  await delay(300, 500);

  // TODO: DB
  return posts.filter((p) =>
    p.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
  );
}

export async function getBlogPostById(
  postId: string,
): Promise<BlogPost | undefined> {
  await delay(600);

  if (parseInt(postId) == 500) {
    throw new Error("Ten post się pospsuł..."); // error.tsx
  }

  const post: BlogPost | undefined = posts.find(
    (p) => p.id == parseInt(postId),
  );

  //   if (!post) notFound(); // never -> not_found.tsx

  return post;
}

export async function getBlogPostComments(
  postId: string,
): Promise<BlogPost["comments"]> {
  const post: BlogPost | undefined = posts.find(
    (p) => p.id == parseInt(postId),
  );

  return post?.comments ?? [];
}

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  author: {
    name: string;
    avatar: string;
  };
  body: string;
  images: string[];
  comments: BlogPostComment[];
  tags: string[];
};

export type BlogPostComment = {
  user: string;
  comment: string;
};
