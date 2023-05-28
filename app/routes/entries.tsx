import { ActionFunction, LoaderArgs, LoaderFunction, V2_MetaFunction, json, redirect } from "@remix-run/node"
import { useActionData, useLoaderData, useOutletContext } from '@remix-run/react';
import Entry, { EntryData } from '~/components/Entry';
import Timeline from '~/components/Timeline';
import NewEntryForm from '~/components/NewEntryForm';
import { useState } from 'react';
import { createServerClient } from '@supabase/auth-helpers-remix';

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Eight" },
    { name: "description", content: "Once-per-day, no-frills daily reflection journal." },
  ];
};

export const action: ActionFunction = async ({ request }: LoaderArgs) => {
  const response = new Response()

  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || '',
    { request, response }
  )

  const data = await request.formData()
  const body = data.get('body')
  const dayRating = data.get('day_rating')

  const { data: { session }} = await supabase.auth.getSession()

  if (session) {
    try {
      const response = await supabase.from('entries').insert({ body, day_rating: dayRating, user_id: session.user.id })
      if (response.status !== 201) {
        return { error: 'Entry could not be saved.'}
      }
    } catch (e) {
      return { error: 'Something went wrong.' }
    }
    
    return redirect('/entries')
  }

  return { error: 'Something went wrong.' }
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const response = new Response()
  // an empty response is required for the auth helpers
  // to set cookies to manage auth

  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || '',
    { request, response }
  )
  const { data: { session }} = await supabase.auth.getSession()

  if (!session) {
    return redirect('/login')
  }

  const entries = (await supabase.from('entries').select().eq('user_id', session.user.id).order('created_at', { ascending: false })).data

  return json({ entries }, { headers: response.headers })
}

export default function Entries() {
  const { entries } = useLoaderData<typeof loader>()
  const error = useActionData<typeof action>()

  const entrySubmittedToday: boolean = entries.length > 0 ? new Date(entries[0].created_at).toLocaleDateString() === new Date().toLocaleDateString() : false

  return (
    <div className="container w-8/12 mx-auto">
      {error ? <span className="text-red-500">{error.error}</span> : null}
      <div className={`flex mt-10`}>
        {entrySubmittedToday && (
          <span className="text-center text-green-500 w-full text-xl">Done for the day! See you tomorrow.</span>
        )}
        {!entrySubmittedToday && (
          <NewEntryForm disabled={false} />
        )}
      </div>
      <div className="border-b-[1px] border-solid border-white border-opacity-20 w-full mt-4 mb-2"></div>
      <Timeline entries={entries} entrySubmittedToday={entrySubmittedToday} />
      <div className="flex flex-col gap-3">
        {
          entries.length === 0 && (
            <div className="text-green-400 text-center my-32">
              <h2 className="text-5xl my-10">Welcome to Eight!</h2>
              <span className="text-xl">Write your first entry above to get started.</span>
            </div>
          )
        }
        {
          entries.length > 0 && entries.map((item: EntryData) => <Entry data={item} key={item.id} />)
        }
      </div>
    </div>
  )
}
