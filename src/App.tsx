import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostRoot } from "./components/post-root";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="flex justify-center w-full flex-col">
          <h1 className="text-blue-600 font-bold text-center text-5xl">
            Posts
          </h1>
          <hr className="inline-block w-full py-3`" />
        </div>
        <PostRoot />
      </main>
    </QueryClientProvider>
  );
}
