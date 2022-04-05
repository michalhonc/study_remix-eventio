import * as React from 'react'
import type { LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Form,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useTransition,
} from '@remix-run/react'

import { requireUserId } from '~/session.server'
import { useUser } from '~/lib/utils'
import {
  getEvent,
  secureDeleteEvent,
  leaveEvent,
  joinEvent,
} from '~/models/event.server'

type LoaderData = {
  event: Awaited<ReturnType<typeof getEvent>>
  isAttendee: boolean
  isAuthor: boolean
}

export const handle = {
  breadcrumbs: () => <Link to="/events">Go back</Link>,
}

export async function action({ request }) {
  const userId = await requireUserId(request)
  const formData = await request.formData()
  const { action, ...values } = Object.fromEntries(formData)

  let event

  if (action === 'join') {
    event = await joinEvent({ id: values.id, userId })
  } else if (action === 'leave') {
    event = await leaveEvent({ id: values.id, userId })
  } else if (action === 'delete') {
    await secureDeleteEvent({ id: values.id, userId })
    return redirect('/events')
  }

  return event
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  const event = await getEvent({ id: params.eventId })

  return json<LoaderData>({
    event,
    isAuthor: userId === event.user.id,
    isAttendee: event.attendees.some((attendee) => attendee.id === userId),
  })
}

function EventIdPage() {
  const data = useLoaderData() as LoaderData
  const transition = useTransition()

  return (
    <dl>
      <dt>Title</dt>
      <dd>{data.event.title}</dd>
      <dt>Start date</dt>
      <dd>{data.event.date}</dd>
      <dt>Capacity</dt>
      <dd>{data.event.capacity}</dd>
      <dt>author</dt>
      <dd>{data.event.user.email}</dd>
      <dt>Body</dt>
      <dd>{data.event.body}</dd>
      <dt>Attendees</dt>
      <dd>
        <ul>
          {data.event.attendees.map((attendee) => (
            <li key={attendee.id}>{attendee.email}</li>
          ))}
        </ul>
      </dd>
      <dt>Join</dt>
      <dd>
        {transition.state === 'submitting' ? (
          'Loading..'
        ) : (
          <Form method="post">
            <input type="hidden" name="id" value={data.event.id} />
            {data.isAuthor ? (
              <button type="submit" name="action" value="delete">
                Delete
              </button>
            ) : data.isAttendee ? (
              <button type="submit" name="action" value="leave">
                Leave
              </button>
            ) : (
              <button type="submit" name="action" value="join">
                Join
              </button>
            )}
          </Form>
        )}
      </dd>
    </dl>
  )
}

export { EventIdPage as default }
