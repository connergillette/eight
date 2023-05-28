import { useActionData } from '@remix-run/react'
import HeroImage from '~/assets/hero_image.png'
import Entry from '~/components/Entry'
import NewEntryForm from '~/components/NewEntryForm'
import Timeline from '~/components/Timeline'

const now = new Date()
const entries = [
  {
    id: 17,
    created_at: new Date().setDate(now.getDate() - 1),
    body: 'Went on a great first date, went to the gym, got ice cream',
    day_rating: 10
  },
  {
    id: 16,
    created_at: new Date().setDate(now.getDate() - 2),
    body: 'Got breakfast out, rode my bike, slept in',
    day_rating: 6
  },
  {
    id: 15,
    created_at: new Date().setDate(now.getDate() - 3),
    body: "Slow day at work, didn't sleep much",
    day_rating: 2
  },
  {
    id: 14,
    created_at: new Date().setDate(now.getDate() - 4),
    body: 'Walked the dog, had lunch with Brian, interviewed',
    day_rating: 8
  },
  {
    id: 9,
    created_at: new Date().setDate(now.getDate() - 5),
    body: 'Freelance work, went on run, worked in lobby, took nap',
    day_rating: 6
  },
  {
    id: 6,
    created_at: new Date().setDate(now.getDate() - 6),
    body: 'Set up the new cat feeder, did some freelance work, built this little app',
    day_rating: 5
  }
]

export const action = async ({ request }) => {
  const data = await request.formData()

  const copy = entries.slice()
  copy.unshift({ body: data.get('body'), day_rating: data.get('day_rating'), created_at: new Date(), id: 11 })
  return copy
}

export default function Index() {
  const actionData = useActionData()

  const dummyDoneForTheDay = !!actionData

  return (
    <div className="max-md:w-10/12 w-8/12 mx-auto">
      <div className="max-md:p-0 p-24 text-center text-white/70">
        <h1 className="max-md:text-4xl text-8xl max-md:mt-8 mb-4 z-10">It's <span className="text-white font-bold">Eight</span> o'clock.</h1>
        <h2 className="max-md:text-xl text-2xl z-10">A great time to reflect.</h2>
        <div className="absolute left-0 text-left align-center">
          <img src={HeroImage} className="w-screen block -z-10 max-md:m-0 -mt-48" alt="A sketch of the night sky with a yellow crescent moon, white clouds, and white stars" />
          <div className="flex flex-col max-md:w-10/12 w-8/12 mx-auto my-10">
            <div className="gap-20 max-xl:flex-col flex">
              <div className="flex flex-col grow max-xl:w-full w-min text-xl mt-24">
                <h3 className="text-2xl font-bold max-md:mb-4 mb-10">Dead-simple daily reflection that takes 10 seconds.</h3>
                <div className="grow">
                  <p className="pb-10">
                    A little bit of self-reflection every day doesn't have to be a tedius exercise in long-form journaling and / or meditation. A quick, once-per-day option to help you remember to pause and reflect on the positives and negatives of the day is all that is needed to identify how to make improvements on how you spend your time.
                  </p>
                  <p>
                    <span className="text-white font-bold">Eight</span> is a tool that I built after setting a daily iOS reminder to ask myself "What did you do today?" every day at 8pm, which I could answer to myself in my head even while I was doing something else. Having a lightweight tool to track these reflections over time felt like a great way to help people reflect on their own day, and to make daily reflection an easy habit to adopt.
                  </p>
                  <div className="flex w-full align-middle justify-center mt-24">
                    <div className="text-center bg-white/10 rounded-lg py-3 px-6 w-[300px">Made by <a href="https://github.com/connergillette" className="text-yellow-300 hover:brightness-110 brightness-100 transition">Conner Gillette.</a></div>
                  </div>
                </div>
                
              </div>
              <div className="max-xl:w-full w-1/3 rounded-lg bg-white/10 p-10 max-md:p-4 min-w-[350px]">
                {dummyDoneForTheDay && (
                  <div className="text-center text-green-500 w-full text-xl">Done for the day! See you tomorrow.</div>
                )}
                {!dummyDoneForTheDay && (
                  <NewEntryForm disabled={false} />
                )}
                <div className="border-b-[1px] border-solid border-white border-opacity-20 w-full mt-4 mb-2"></div>
                <Timeline entries={actionData || entries} entrySubmittedToday={dummyDoneForTheDay} />
                <div className="flex flex-col gap-3">
                  {
                    (actionData || entries).map((item) => <Entry data={item} key={item.id} />)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}