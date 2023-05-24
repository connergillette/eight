import { ActionFunction, LoaderArgs, LoaderFunction, V2_MetaFunction, json, redirect } from "@remix-run/node"
import { supabase } from '../server/supabase.server'
import { Form, useActionData, useLoaderData } from '@remix-run/react';

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
  const entries = (await supabase.from('entries').select()).data

  console.log(entries)

  return json({ entries })
}

export default function Index() {
  const { entries } = useLoaderData<typeof loader>()
  const error = useActionData<typeof action>()

  return (
    <div>
      <h1>Eight</h1>
      {error ? <span className="text-red-500">{error.error}</span> : null}
      <Form method="post">
        <div className="flex flex-col">
          <input name="body" placeholder="What did you do today?" />
          <input name="day_rating" placeholder="How would you rate today?" type="number" min="1" max="10" />
          <button type="submit">Submit</button>
        </div>
      </Form>
      {
        entries.map((item) => <div>{item.body}</div>)
      }
    </div>
  );
}
