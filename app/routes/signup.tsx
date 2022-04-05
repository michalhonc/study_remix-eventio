import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react'
import * as React from 'react'

import { getUserId, createUserSession } from '~/session.server'

import { createUser, getUserByEmail } from '~/models/user.server'
import { validateEmail } from '~/lib/utils'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/')
  return json({})
}

interface ActionData {
  errors: {
		firstName?: string
		lastName?: string
    email?: string
    password?: string
		repeatPassword?: string
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const email = formData.get('email')
  const password = formData.get('password')
  const repeatPassword = formData.get('repeatPassword')
  const redirectTo = formData.get('redirectTo')

  if (typeof firstName !== 'string') {
    return json<ActionData>(
      { errors: { firstName: 'First name is required' } },
      { status: 400 }
    )
  }

  if (typeof lastName !== 'string') {
    return json<ActionData>(
      { errors: { lastName: 'Last name is required' } },
      { status: 400 }
    )
  }

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: 'Email is invalid' } },
      { status: 400 }
    )
  }

  if (typeof password !== 'string') {
    return json<ActionData>(
      { errors: { password: 'Password is required' } },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: 'Password is too short' } },
      { status: 400 }
    )
  }

	if (password !== repeatPassword) {
    return json<ActionData>(
      { errors: { repeatPassword: 'Password and Repeat passwort must match' } },
      { status: 400 }
    )
  }

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: 'A user already exists with this email' } },
      { status: 400 }
    )
  }

  const user = await createUser(email, password)

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo: typeof redirectTo === 'string' ? redirectTo : '/',
  })
}

export const meta: MetaFunction = () => {
  return {
    title: 'Sign Up',
  }
}

function SignUpPage() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? undefined
  const actionData = useActionData() as ActionData
  const firstNameRef = React.useRef<HTMLInputElement>(null)
  const lastNameRef = React.useRef<HTMLInputElement>(null)
	const emailRef = React.useRef<HTMLInputElement>(null)
	const passwordRef = React.useRef<HTMLInputElement>(null)
  const repeatPasswordRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (actionData?.errors?.firstName) {
      firstNameRef.current?.focus()
    } else if (actionData?.errors?.lastName) {
      lastNameRef.current?.focus()
    } else if (actionData?.errors?.email) {
      emailRef.current?.focus()
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus()
    } else if (actionData?.errors?.repeatPassword) {
      repeatPasswordRef.current?.focus()
    }
  }, [actionData])

  return (
    <Form method="post">
      <div>
        <label htmlFor="firstName">First name</label>
        <div>
          <input
            ref={firstNameRef}
            id="firstName"
            required
            autoFocus={true}
            name="firstName"
            type="text"
						autoComplete="given-name"
            aria-invalid={actionData?.errors?.firstName ? true : undefined}
            aria-describedby="first-name-error"
          />
          {actionData?.errors?.firstName && <div>{actionData.errors.firstName}</div>}
        </div>
      </div>

      <div>
        <label htmlFor="lastName">Last name</label>
        <div>
          <input
            ref={lastNameRef}
            id="lastName"
            required
            name="lastName"
            type="text"
						autoComplete="family-name"
            aria-invalid={actionData?.errors?.lastName ? true : undefined}
            aria-describedby="last-name-error"
          />
          {actionData?.errors?.lastName && <div>{actionData.errors.lastName}</div>}
        </div>
      </div>

      <div>
        <label htmlFor="email">Email address</label>
        <div>
          <input
            ref={emailRef}
            id="email"
            required
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="email-error"
          />
          {actionData?.errors?.email && <div>{actionData.errors.email}</div>}
        </div>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div>
          <input
            id="password"
            ref={repeatPasswordRef}
            name="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={actionData?.errors?.password ? true : undefined}
            aria-describedby="password-error"
          />
          {actionData?.errors?.password && (
            <div>{actionData.errors.password}</div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="repeatPassword">Repeat password</label>
        <div>
          <input
            id="repeatPassword"
            ref={passwordRef}
            name="repeatPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={actionData?.errors?.repeatPassword ? true : undefined}
            aria-describedby="repeat-password-error"
          />
          {actionData?.errors?.repeatPassword && (
            <div>{actionData.errors.repeatPassword}</div>
          )}
        </div>
      </div>

      <input type="hidden" name="redirectTo" value={redirectTo} />
      <button type="submit">Create Account</button>
      <div>
        <div>
          Already have an account?{' '}
          <Link
            to={{
              pathname: '/login',
              search: searchParams.toString(),
            }}
          >
            Log in
          </Link>
        </div>
      </div>
    </Form>
  )
}

export { SignUpPage as default }
