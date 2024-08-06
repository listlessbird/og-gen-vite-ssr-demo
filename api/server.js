import { createServer as createViteServer } from 'vite';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs/promises';
import compression from 'compression';
import serveStatic from 'serve-static';
import { getPostById, getAllPosts } from '../server/posts.js';
import { getOg, generateDefaultOgImage } from '../server/og.jsx'; 
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const root = resolve(__dirname, '..');

async function createServer() {
  const app = express();

  let vite;
  if (!isProduction) {
    vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    app.use(compression());
    app.use(serveStatic(resolve(root, 'dist/client'), { index: false }));
  }

  app.get('/api/posts', (req, res) => {
    const posts = getAllPosts();
    return res.json(posts);
  });

  app.get('/api/post', (req, res) => {
    const postId = req.query['postId'];
    const post = getPostById(postId);
    return res.json(post);
  });

  app.get("/og-image/default.png", async (req, res) => {
    try {
      const imageBuffer = await generateDefaultOgImage();
      res.set("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating OG image:", error);
      res.status(500).send("Error generating OG image");
    }
  });

  app.get("/og-image/post.png", async (req, res) => {
    const postId = req.query['postId'];
    const post = getPostById(postId);
    
    if (!post) {
      res.status(404).send("Post not found");
      return;
    }

    try {
      const svg = await getOg({
        title: post.title,
        description: post.description || "Read this blog post",
      });

      const img = await sharp(Buffer.from(svg))
        .png()
        .resize(1200, 630, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .toBuffer();

      res.set("Content-Type", "image/png");
      res.send(img);
    } catch (error) {
      console.error("Error generating post OG image:", error);
      res.status(500).send("Error generating post OG image");
    }
  });

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProduction) {
        template = await fs.readFile(resolve(root, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = await fs.readFile(resolve(root, 'dist/client/index.html'), 'utf-8');
        render = (await import('../dist/server/entry-server.js')).render;
      }

      const parsedUrl = new URL(url, `http://${req.headers.host}`);
      const isPostRoute = parsedUrl.pathname.startsWith('/post') || (parsedUrl.pathname === '/' && parsedUrl.searchParams.has('postId'));
      const postId = parsedUrl.searchParams.get('postId');

      let ogMetaTags = '';
      if (isPostRoute && postId) {
        const post = getPostById(postId);
        if (post) {
          ogMetaTags = `
            <meta property="og:title" content="${post.title}">
            <meta property="og:description" content="${post.description || 'Read this blog post'}">
            <meta property="og:image" content="${req.protocol}://${req.get('host')}/og-image/post.png?postId=${postId}">
            <meta property="og:image:width" content="1200">
            <meta property="og:image:height" content="630">
            <meta property="og:type" content="article">
            <meta property="og:url" content="${req.protocol}://${req.get('host')}${req.originalUrl}">
            <meta property="article:published_time" content="${post.date}">
            <meta property="article:author" content="${post.author}">
          `;
        }
      } else {
        ogMetaTags = `
          <meta property="og:title" content="Listless's Blog">
          <meta property="og:description" content="Welcome to my Blog">
          <meta property="og:image" content="${req.protocol}://${req.get('host')}/og-image/default.png">
          <meta property="og:image:width" content="1200">
          <meta property="og:image:height" content="630">
          <meta property="og:type" content="website">
          <meta property="og:url" content="${req.protocol}://${req.get('host')}${req.originalUrl}">
        `;
      }

      const rendered = await render(url);
      const html = template
        .replace(`<!--app-head-->`, ogMetaTags + (rendered.head ?? ""))
        .replace(`<!--app-html-->`, rendered.html ?? "");

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return app;
}

export default async (req, res) => {
  const app = await createServer();
  return app(req, res);
};