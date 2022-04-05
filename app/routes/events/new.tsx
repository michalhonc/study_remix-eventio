import * as React from 'react'
import { Form } from '@remix-run/react'
import { redirect } from '@remix-run/node'

import { requireUserId } from '~/session.server'
import { createEvent } from '~/models/event.server'

async function action({ request }) {
  const userId = await requireUserId(request)
  const formData = await request.formData()
  const formFields = Object.fromEntries(formData)

  const event = await createEvent({
    ...formFields,
    capacity: Number(formFields.capacity),
    date: new Date(formFields.date),
    userId,
  })

  return redirect(`/events/${event.id}`)
}

function EventNewPage() {
  return (
    <Form method="post">
      <input type="text" name="title" />
      <input type="text" name="body" />
      <input type="number" name="capacity" />
      <input type="datetime-local" name="date" />
      <button type="submit">Create</button>
    </Form>
  )
}

export { EventNewPage as default, action }
