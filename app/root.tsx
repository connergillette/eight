import { cssBundleHref } from "@remix-run/css-bundle";
import styles from './tailwind.css'
import { LinksFunction, json, redirect } from "@remix-run/node";
import { createBrowserClient, createServerClient } from "@supabase/auth-helpers-remix"
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import YellowButton from './components/YellowButton';
import { useEffect, useState } from 'react';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"},
  
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }) => {
  const response = new Response()

  const supabase = createServerClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    request,
    response,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  }

  return json({ env, session }, { headers: response.headers })
}

export default function App() {
  const { env, session } = useLoaderData()
  const { revalidate } = useRevalidator()
  const [supabase] = useState(() => createBrowserClient(env.SUPABASE_URL, env.SUPABASE_KEY))

  const serverAccessToken = session?.access_token

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        // server and client are out of sync.
        revalidate()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, supabase, revalidate])

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
          {
            !session && (
              <>
                <a href="/login">
                  <button className="h-10 m-4">Log In</button>
                </a>
                <a href="/register">
                  <YellowButton content="Sign Up" />
                </a>
              </>
            )
          }
          {
            session && (
              <Form method="post" action="/logout">
                <button className="h-10 m-4" onClick={() => supabase.auth.signOut()}>Log Out</button>
              </Form>
            )
          }
        </div>
        <Outlet context={{ supabase, session }}/>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
