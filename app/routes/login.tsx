import { ActionFunction, redirect } from '@remix-run/node';
import { Form, useActionData, useOutletContext } from '@remix-run/react';
import { useEffect, useState } from 'react';
import YellowButton from '~/components/YellowButton';
// import { supabase } from '~/server/supabase.server';

export const action : ActionFunction = async ({ request }) => {
  const data = await request.formData()

  return { email: data.get('email'), password: data.get('password') }
}

export default function Login() {
  const data = useActionData()
  const { supabase } = useOutletContext()
  const [error, setError] = useState('')

  useEffect(() => {
    (async() => {
      const response = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (response.error) {
        setError('Invalid email or password.')
      } else {
        window.location.href = '/entries'
      }
    })()
  }, [data, supabase])

  return (
    <div className="flex flex-col w-8/12 mx-auto my-10">
      <Form method="post">
        <div className="w-1/2 mx-auto flex flex-col gap-10">
          <span className={`text-red-400 text-center ${error ? 'opacity-100' : 'opacity-0'} transition`}>{error}</span>
          <h1 className="text-4xl">Log in</h1>
          <div className="flex flex-col gap-2">
            <span>Email</span>
            <input name="email" className="h-10 px-5 text-black" required></input>
          </div>
          <div className="flex flex-col gap-2">
            <span>Password</span>
            <input name="password" type="password" className="h-10 px-5 text-black" required></input>
          </div>
          <div className="max-w-4xl">
            <YellowButton content="Log in" />
          </div>
        </div>
      </Form>
    </div>
  )
}
