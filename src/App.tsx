import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostRoot } from "./components/post-root";
import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { PostView } from "./components/post";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" index element={<PostRoot />} />
          </Route>
          <Route path="/post" index element={<PostView />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

function Home() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="flex justify-center w-full flex-col">
        <h1 className="text-blue-600 font-bold text-center text-5xl py-2">
          Listless's Blog
        </h1>
        <hr className="inline-block w-full py-3`" />
      </div>
      {/* <PostRoot /> */}
      <Outlet />
    </main>
  );
}

function NoMatch() {
  return (
    <div className="min-h-screen grid place-content-center">
      <h2 className="text-3xl font-bold">Nothing to see here!</h2>
      <p>
        <Link to="/" className="text-pretty text-blue-600 font-semibold">
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
