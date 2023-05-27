import { cssBundleHref } from "@remix-run/css-bundle";
import styles from './tailwind.css'
import { LinksFunction, json } from "@remix-run/node";
import { createBrowserClient } from "@supabase/auth-helpers-remix"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import YellowButton from './components/YellowButton';
import { useState } from 'react';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"},
  
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = () => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  }

  return json({ env })
}

export default function App() {
  const { env } = useLoaderData()
  const [supabase] = useState(() => createBrowserClient(env.SUPABASE_URL, env.SUPABASE_KEY))

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={`bg-gray-900 text-white`}>
        <div className="flex container w-8/12 mx-auto">
          <a href="/" className="text-3xl mt-5 tracking-wide font-bold grow">
            <span>Eight</span>
          </a>
          <a href="/login">
            <button className="h-10 m-4">Log In</button>
          </a>
          <a href="/register">
            <YellowButton content="Sign Up" />
          </a>
        </div>
        <Outlet context={{ supabase }}/>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
