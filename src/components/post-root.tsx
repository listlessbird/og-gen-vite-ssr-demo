import { useQuery } from "@tanstack/react-query";

type Post = {
  id: string;
  title: string;
  description: string;
  content: string;
  date: Date;
};

export function PostRoot() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5173/posts/");
      return res.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (!posts) {
    return <div>No posts found</div>;
  }

  return (
    <section className="space-y-4">
      {posts.map((p) => (
        <PostView
          title={p.title}
          description={p.description}
          date={p.date}
          key={p.title}
        />
      ))}
    </section>
  );
}

function PostView({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: Date;
}) {
  return (
    <div className="rounded-lg transition-all hover:bg-muted">
      <a href="#" className="flex items-center gap-4 p-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold hover:text-primary">{title}</h2>
          <p className="mt-3 text-muted-foreground">{description}</p>
          <div className="mt-3 text-sm text-muted-foreground">
            {new Intl.DateTimeFormat("en-GB", {
              dateStyle: "medium",
            }).format(new Date(date))}
          </div>
        </div>
      </a>
    </div>
  );
}
