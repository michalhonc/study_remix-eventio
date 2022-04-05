import * as React from 'react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Link, NavLink, Outlet, useLoaderData } from '@remix-run/react'

import { requireUserId } from '~/session.server'
import { useUser } from '~/lib/utils'
import { getEvents } from '~/models/event.server'

type LoaderData = {
  eventListItems: Awaited<ReturnType<typeof getEvents>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const eventListItems = await getEvents()
  return json<LoaderData>({ eventListItems })
}

function EventIndexPage() {
  const data = useLoaderData() as LoaderData

  return (
		<>
			<Link to="/events/new">New event</Link>
			<ul>
				{data.eventListItems.map((item) => (
					<li key={item.id}>
						<Link to={item.id}>{item.title}</Link>
					</li>
				))}
			</ul>
		</>
  )
}

export { EventIndexPage as default }
