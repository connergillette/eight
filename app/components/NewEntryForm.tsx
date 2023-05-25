import { Form } from '@remix-run/react';
import { useState } from 'react';
import { getColorsFromRating } from '~/colors';

export default function NewEntryForm({ disabled, dummySubmit }: { disabled: boolean, dummySubmit?: Function }) {
  const [body, setBody] = useState('')
  const [dayRating, setDayRating] = useState(null)

  const { bg, border } = getColorsFromRating(dayRating)
  const dayRatingColor = dayRating ? `${bg} ${border}` : 'bg-transparent border-transparent'
  const injectedStyles = `${dayRatingColor} ${dayRating ? 'text-black' : 'text-white'}`

  return (
    <Form method="post" className="w-full" aria-disabled={disabled}>
      <div className="self-center opacity-30 text-xs tracking-widest mb-2">{new Date().toLocaleDateString()}</div>
      <div className="flex flex-col gap-5">
        <div>
          <input
            name="body"
            placeholder="What did you do today?"
            className="bg-transparent grow p-2 rounded-lg border-none w-full focus:outline-gray-400"
            required={true}
            onChange={(e) => setBody(e.target.value)}
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
          {
            !disabled && <button type="submit">Submit</button>
          }
          {
            disabled && (
              <div
                onClick={() => dummySubmit({ body, dayRating })}
              >
                Submit
              </div>
            )
          }
          
        </div>
      </div>
    </Form>
  )
}