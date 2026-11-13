// Allow blocking route (TODO: Suspense)
// export const instant = false;

import { BlogPostComments } from "@/components/BlogPostComments";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getBlogPostById } from "@/services/BlogAPI";
import Image from "next/image";
import { notFound } from "next/navigation";

// http://localhost:3000/blog/post/123/

export default async function BlogPostPage(props: PageProps<`/blog/post/[postId]`>,) {
  
  const { postId } = await props.params;
  const post = await getBlogPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6">
      <article className="space-y-6">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={50}
              height={50}
              unoptimized
              className="size-10 rounded-full"
            />
            <div>
              <p className="font-medium text-foreground">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">/{post.slug}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>
        <div className="whitespace-pre-line leading-7 text-foreground">
          {post.body}
        </div>
        {post.images.length > 0 && (
          <section className="grid gap-4 sm:grid-cols-2">
            {post.images.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`${post.title} - image ${index + 1}`}
                width={600}
                height={300}
                unoptimized
                className="h-auto w-full rounded-lg"
              />
            ))}
          </section>
        )}
      </article>

      <Separator />

      <BlogPostComments comments={post.comments} />
    </main>
  );
}
