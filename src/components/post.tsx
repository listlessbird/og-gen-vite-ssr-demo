import { useQuery } from "@tanstack/react-query";
import { Post } from "./post-root";
import { useSearchParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";

export function PostView() {
  const [searchParam] = useSearchParams();

  const postId = searchParam.get("postId");

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<Post>({
    queryKey: ["posts", "postId", postId],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5173/api/post?postId=${postId}`
      );
      return res.json();
    },
  });

  if (isError || !post) {
    return (
      <div className="grid min-h-screen place-items-center place-content-center">
        <div className="text-destructive text-center">
          Error getting the post.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center place-content-center">
        <div className="text-destructive text-center">Loading the post...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Listless's Blog</title>
        <meta
          name="description"
          content={post.description || "Read this blog post"}
        />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.description || "Read this blog post"}
        />
        <meta
          property="og:image"
          content={`/og-image/post.png?postId=${post.id}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="article:published_time"
          content={new Date(post.date).toISOString()}
        />
        <meta property="article:author" content={post.author} />
      </Helmet>
      <div className="bg-background text-foreground">
        <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span>{post.author}</span>
                </div>
                <span>
                  Published on
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "medium",
                  }).format(new Date(post.date))}
                </span>
              </div>
            </div>
            <div className="prose prose-gray max-w-none dark:prose-invert text-black/60 text-pretty">
              <p>{post.content}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
