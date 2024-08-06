import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
export function render(url: string) {
  const helmetContext = {};

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );

  // @ts-expect-error
  const { helmet } = helmetContext;

  return {
    html,
    head:
      helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
  };
}
