import * as React from 'react'
import type { LoaderFunction } from '@remix-run/node'
import {
  Outlet,
  useLoaderData,
  useMatches,
} from '@remix-run/react'

import { requireUser } from '~/session.server'
import { useUser } from '~/lib/utils'
import { getEventListItems } from '~/models/event.server'
import { Nav } from '~/ui'

type LoaderData = {
  eventListItems: Awaited<ReturnType<typeof getEventListItems>>
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request)
	return null
}

function EventsPage() {
  const matches = useMatches()
  const user = useUser()

  const matchWithBreadcrumb = matches.find((match) => !!match.handle)

  return (
    <div>
      <Nav>
    		<span>Logo</span>
        {matchWithBreadcrumb?.handle.breadcrumbs()}

        {user.email}
      </Nav>
      <Outlet />
    </div>
  )
}

export { EventsPage as default }
