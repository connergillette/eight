import { ActionFunction, LoaderArgs, LoaderFunction, V2_MetaFunction, json, redirect } from "@remix-run/node"
import { supabase } from '../server/supabase.server'
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import Entry from '~/components/Entry';
import { useState } from 'react';
import Timeline from '~/components/Timeline';
import { getColorsFromRating } from '~/colors';

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
  const [dayRating, setDayRating] = useState(null)
  const { entries } = useLoaderData<typeof loader>()
  const error = useActionData<typeof action>()

  const { bg, border } = getColorsFromRating(dayRating)
  const dayRatingColor = dayRating ? `${bg} ${border}` : 'bg-transparent border-transparent'
  const injectedStyles = `${dayRatingColor} ${dayRating ? 'text-black' : 'text-white'}`

  const entrySubmittedToday: boolean = new Date(entries[0].created_at).toLocaleDateString() === new Date().toLocaleDateString()

  return (
    <div className="w-full">
      {error ? <span className="text-red-500">{error.error}</span> : null}
      <div className={`flex mt-10`}>
        {entrySubmittedToday && (<span className="text-center text-green-500 w-full text-xl">Done for the day!</span>)}
        {!entrySubmittedToday && (
          <Form method="post">
            <div className="self-center opacity-30 text-xs tracking-widest mb-2">{new Date().toLocaleDateString()}</div>
            <div className="flex flex-col gap-5">
              <div>
                <input
                  name="body"
                  placeholder="What did you do today?"
                  className="bg-transparent grow p-2 rounded-lg border-none w-full focus:outline-gray-400"
                  required={true}
                  />
              </div>
              <div className="flex gap-5">
                <div className={`${dayRating === 10 ? 'animate-ping' : ''} grow`}>
                  <input
                    name="day_rating"
                    placeholder="How would you rate today?"
                    type="number"
                    min="1"
                    max="10"
                    className={`transition rounded-lg p-2 grow border-2 border-solid ${injectedStyles} w-full`}
                    onChange={(e) => setDayRating(e.target.value)} 
                    required={true}
                  />
                </div>
                <button type="submit">Submit</button>
              </div>
            </div>
          </Form>
        )}
      </div>
      <div className="border-b-[1px] border-solid border-white border-opacity-20 w-full mt-4 mb-2"></div>
      <Timeline entries={entries} entrySubmittedToday={entrySubmittedToday} />
      <div className="flex flex-col gap-3">
        {
          entries.map((item) => <Entry data={item} key={item.id} />)
        }
      </div>
    </div>
  )
}
