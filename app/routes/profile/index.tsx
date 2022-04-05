import * as React from 'react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { requireUserId } from '~/session.server'
import { getEventListItems } from '~/models/event.server'
import { useUser } from '~/lib/utils'
import { Nav } from '~/ui'

type LoaderData = {
  eventListItems: Awaited<ReturnType<typeof getEventListItems>>
}

async function loader({ request }) {
  const userId = await requireUserId(request)
  const eventListItems = await getEventListItems({ userId })

  return json<LoaderData>({ eventListItems })
}

function ProfilePage() {
  const data = useLoaderData() as LoaderData
  const user = useUser()

  return (
    <>
      <Nav>
        <span>Logo</span>
        <span>{user.email}</span>
      </Nav>

      <div>
        <div>{user.email}</div>
        <div>{user.id}</div>
      </div>

      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  )
}

export { ProfilePage as default, loader }
