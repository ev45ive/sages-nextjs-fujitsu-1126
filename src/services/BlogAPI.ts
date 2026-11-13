import { delay } from "@/app/utils/delay";
import { notFound } from "next/navigation";

import posts from "../../public/postsdata.json";

export async function getBlogPosts({
  filter = "",
}: {
  filter?: string;
} = {}): Promise<BlogPost[]> {
  await delay(500, 1_000);

  // TODO: DB
  return posts.filter((p) =>
    p.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
  );
}

export async function getBlogPostById(
  postId = "",
): Promise<BlogPost | undefined> {
  await delay(1000);

  if (parseInt(postId) == 500) {
    throw new Error("Ten post się pospsuł..."); // error.tsx
  }

  const post: BlogPost | undefined = posts.find(
    (p) => p.id == parseInt(postId),
  );

  //   if (!post) notFound(); // never -> not_found.tsx

  return post;
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
  comments: {
    user: string;
    comment: string;
  }[];
  tags: string[];
};
