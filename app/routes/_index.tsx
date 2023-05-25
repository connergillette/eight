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
  console.log(copy)
  return copy
}

export default function Index() {
  const actionData = useActionData()

  const dummyDoneForTheDay = !!actionData

  return (
    <div className="w-8/12 mx-auto">
      <div className="p-24 text-center text-white/70">
        <h1 className="text-8xl mb-4">It's <span className="text-white font-bold">Eight</span> o'clock.</h1>
        <h2 className="text-2xl">A great time to reflect.</h2>
        <div className="absolute left-0 text-left">
          <img src={HeroImage} className="w-screen block -z-10" alt="A sketch of the night sky with a yellow crescent moon, white clouds, and white stars" />
          <div className="flex flex-col w-8/12 mx-auto my-10">
            <div className="flex gap-20">
              <div className="flex flex-col grow w-min text-xl">
                <h3 className="text-2xl font-bold mb-10">Dead-simple daily reflection that takes 10 seconds.</h3>
                <div className="grow">
                  <p className="pb-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis at tellus at urna condimentum mattis. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Lacinia at quis risus sed vulputate odio ut. Congue quisque egestas diam in arcu. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Tortor consequat id porta nibh venenatis. Risus commodo viverra maecenas accumsan lacus vel facilisis. Aenean et tortor at risus. Aliquam sem fringilla ut morbi tincidunt. Eu turpis egestas pretium aenean pharetra magna ac placerat.
                  </p>
                  <p>
                    Bibendum enim facilisis gravida neque convallis. Vitae elementum curabitur vitae nunc sed velit dignissim sodales. Non arcu risus quis varius. Ultrices in iaculis nunc sed augue lacus viverra. Quis eleifend quam adipiscing vitae. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Non sodales neque sodales ut etiam sit amet. Mauris in aliquam sem fringilla. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Adipiscing enim eu turpis egestas. Laoreet suspendisse interdum consectetur libero id faucibus. Fringilla ut morbi tincidunt augue interdum velit euismod in. Leo a diam sollicitudin tempor id eu nisl nunc mi. Nec nam aliquam sem et tortor consequat id porta nibh.
                  </p>
                </div>
                <div className="w-full text-5xl bg-white/10 rounded-lg p-10">
                  <div className="text-center text-green-500">Done for the day! See you tomorrow.</div>
                </div>
              </div>
              <div className="w-1/3 rounded-lg bg-white/10 p-10">
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