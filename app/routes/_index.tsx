import { ActionFunction, LoaderArgs, LoaderFunction, V2_MetaFunction, json, redirect } from "@remix-run/node"
import { supabase } from '../server/supabase.server'
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import Entry from '~/components/Entry';
import { useState } from 'react';
import Timeline from '~/components/Timeline';

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Eight" },
    { name: "description", content: "Once-per-day, no-frills daily reflection journal." },
  ];
};

export const action: ActionFunction = async ({ request }: LoaderArgs) => {
  const data = await request.formData()
  const body = data.get('body')
  const dayRating = data.get('day_rating')
  try {
    const response = await supabase.from('entries').insert({ body, day_rating: dayRating })
    if (response.status !== 201) {
      return { error: 'Entry could not be saved.'}
    }
  } catch (e) {
    return { error: 'Something went wrong.'}
  }
  
  return redirect('/')
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const entries = (await supabase.from('entries').select().order('created_at', { ascending: false })).data

  return json({ entries })
}

export default function Index() {
  const { entries } = useLoaderData<typeof loader>()
  const error = useActionData<typeof action>()
  const [dayRating, setDayRating] = useState(null)

  const dayRatingColor = dayRating ? `bg-yellow-${dayRating * 100 - 100} border-2 border-solid border-orange-${dayRating * 100 - 100} ` : 'bg-transparent border-none'
  const injectedStyles = `${dayRatingColor} ${dayRating ? 'text-black' : 'text-white'}`

  return (
    <>
      {error ? <span className="text-red-500">{error.error}</span> : null}
      <div className={`mt-10`}>
        <Form method="post">
          <div className="flex gap-5">
            <input
              name="body"
              placeholder="What did you do today?"
              className="bg-transparent grow p-2 rounded-lg border-none focus:outline-gray-400"
              required={true}
            />
            <input 
              name="day_rating"
              placeholder="How would you rate today?"
              type="number"
              min="1"
              max="10"
              className={`transition rounded-lg w-1/4 p-2 ${injectedStyles}`}
              onChange={(e) => setDayRating(e.target.value)} 
              required={true}
            />
            <button type="submit">Submit</button>
          </div>
        </Form>
      </div>
      <Timeline entries={entries} />
      <div className="flex flex-col gap-3">
        {
          entries.map((item) => <Entry data={item} key={item.id} />)
        }
      </div>
    </>
  )
}
