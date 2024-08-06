import fs from "node:fs/promises";
import express from "express";
import { getBlogPostOg, getOg } from "./og.jsx";
import sharp from "sharp";
import { getAllPosts, getPostById } from "./posts.js";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

app.get("/api/posts", (req, res) => {
  const posts = getAllPosts();

  return res.json(posts);
});

app.get("/api/post", (req, res) => {

    const postId = req.query['postId'];

    const post = getPostById(postId);

    return res.json(post);
})


app.get("/og-image/default.png", async (req, res) => {
  try {
    const imageBuffer = await generateDefaultOgImage();

    console.log("Image buffer size:", imageBuffer.length);
    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error generating OG image:", error);
    res.status(500).send("Error generating OG image");
  }
});

app.get("/og-image/debug.svg", async (req, res) => {
  const svg = await getOg({
    title: "Your Default Title",
    description: "Your default description",
  });
  console.log("Generated SVG:", svg.substring(0, 200) + "...");
  res.set("Content-Type", "image/svg+xml");
  res.send(svg);
});

app.get("/og-image/debug-post.svg", async (req, res) => {
  const svg = await getBlogPostOg({
    title:
      "AI Dungeon 2: Creating Infinitely Generated Text Adventures with Deep Learning Language Models",
    author: "Some Autistic Retard",
    date: "2021-09-01",
  });
  console.log("Generated SVG:", svg.substring(0, 200) + "...");
  res.set("Content-Type", "image/svg+xml");
  res.send(svg);
});

app.get("/og-image/debug-post.png", async (req, res) => {
  const svg = await getBlogPostOg({
    title:
      "AI Dungeon 2: Creating Infinitely Generated Text Adventures with Deep Learning Language Models",
    author: "Some Autistic Retard",
    content: "dwqascfwescddddddddddddddddddddwqsdswadqaswfesaqwfcdaqeswfqaeswfdqaeswrdqwrdqawdrqawfd",
    date: "2021-09-01",
  });

  const img = await sharp(Buffer.from(svg)).png().toBuffer();

  res.set("Content-Type", "image/png");
  res.send(img);
});



app.get("/og-image/post.png", async (req, res) => {


  const postId = req.query['postId'];
  const post = getPostById(postId)
  const svg = await getBlogPostOg({
    title: post.title,
    author: post.author,
    content: post.content,
    date: new Intl.DateTimeFormat("en-GB", {dateStyle: 'medium'}).format(new Date(post.date)),
    imageUrl: 'http://localhost:5173/placeholder.jpg'
  });

  const img = await sharp(Buffer.from(svg)).png().toBuffer();

  res.set("Content-Type", "image/png");
  res.send(img);
});



// Serve HTML
app.use("*", async (req, res) => {

  console.log(`at the url ${req.url}`)
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }



    const parsedUrl = new URL(req.url, `${req.protocol}://${req.headers.host}`);
    console.log("parsedUrl", parsedUrl)

    const isPostRoute = parsedUrl.pathname.startsWith('/post') || (parsedUrl.pathname === '/' && parsedUrl.searchParams.has('postId'));

    const postId = parsedUrl.searchParams.get('postId');



    let ogMetaTags;
    if (isPostRoute && postId) {
      const post = getPostById(postId);
      if (post) {
        ogMetaTags = `
          <meta property="og:title" content="${post.title}">
          <meta property="og:description" content="${post.description || 'Read this blog post'}">
          <meta property="og:image" content="${req.protocol}://${req.get("host")}${base}og-image/post.png?postId=${postId}">
          <meta property="og:image:width" content="960">
          <meta property="og:image:height" content="700">
          <meta property="og:type" content="article">
          <meta property="og:url" content="${req.protocol}://${req.get("host")}${req.originalUrl}">
          <meta property="article:published_time" content="${post.date}">
          <meta property="article:author" content="${post.author}">
        `;
      }
    }

    if (!ogMetaTags) {
      ogMetaTags = `
        <meta property="og:title" content="Listless's Blog">
        <meta property="og:description" content="Welcome to my Blog">
        <meta property="og:image" content="${req.protocol}://${req.get("host")}${base}og-image/default.png">
        <meta property="og:image:width" content="960">
        <meta property="og:image:height" content="700">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${req.protocol}://${req.get("host")}${req.originalUrl}">
      `;
    }


    const rendered = await render(url, ssrManifest);

    // const html = template
    //   .replace(`<!--app-head-->`, rendered.head + defaultOgMetaTags)
    //   .replace(`<!--app-html-->`, rendered.html ?? "");
    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`</head>`, `${ogMetaTags}</head>`)
      .replace(`<!--app-html-->`, rendered.html ?? "");
      
    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

async function generateDefaultOgImage() {
  const svg = await getOg({
    title: "Listless's Blog",
    description: "Welcome to my Blog",
  });
  const png = await sharp(Buffer.from(svg))
    .png()
    // .resize(960, 700, {
    //   kernel: sharp.kernel.nearest,
    //   withoutEnlargement: true,
    //   withoutReduction: true,
    //   fit: "cover",
    //   // position: "left top",
    // })
    .toBuffer();
  return png;
}

app.listen(port, async () => {
  console.log(`Server started at http://localhost:${port}`);
  try {
    await generateDefaultOgImage();
    console.log("OG image generated successfully");
  } catch (error) {
    console.error("Error generating OG image:", error);
  }
});
