import { redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import YellowButton from '~/components/YellowButton';
import { supabase } from '~/server/supabase.server';

export const action = async ({ request }) => {
  const data = await request.formData()

  const password = data.get('password')
  const confirmPassword = data.get('confirmPassword')

  if (password !== confirmPassword) {
    return { error: 'Password confirmation does not match.' }
  }

  const loginResponse = supabase.auth.signUp({ email: data.get('email'), password: data.get('password') })
  if ((await loginResponse).data.user) {
    return { success: true }
  }

  return { error: 'Something went wrong.' }
}

export default function Register() {
  const data = useActionData()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {    
    if (data) {
      setSuccess(data.success || '')
      setError(data.error || '')
    }
  }, [data])

  return (
    <div className="flex flex-col w-8/12 mx-auto my-10">
      <Form method="post">
        <div className="w-1/2 mx-auto flex flex-col gap-10">
          <div className={`text-green-400 text-center ${success ? 'opacity-100 h-full' : 'opacity-0 h-0 pointer-events-none'} transition bg-red-500`}>
            <h2 className="text-5xl my-10">Success!</h2>
            <span className="text-xl">Please click on the link that was just sent to your email to finish signing up.</span>
          </div>
          {
            !success && (
              <>
                <span className={`text-red-400 text-center ${error ? 'opacity-100' : 'opacity-0'} transition`}>{error}</span>
                <h1 className="text-4xl">Sign up</h1>
                <div className="flex flex-col gap-2">
                  <span>Email</span>
                  <input name="email" className="h-10 px-5 text-black" required></input>
                </div>
                <div className="flex flex-col gap-2">
                  <span>Password</span>
                  <input name="password" type="password" className="h-10 px-5 text-black" required></input>
                </div>
                <div className="flex flex-col gap-2">
                  <span>Confirm Password</span>
                  <input name="confirmPassword" type="password" className="h-10 px-5 text-black" required></input>
                </div>
                <div className="max-w-4xl">
                  <YellowButton content="Sign up" />
                </div>
              </>
            )
          }
        </div>
      </Form>
    </div>
  )
}
