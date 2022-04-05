import * as React from 'react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { requireUserId } from '~/session.server'
import { getUserById } from '~/models/user.server'
import { getEventListItems } from '~/models/event.server'
import { useUser } from '~/lib/utils'
import { Nav } from '~/ui'

type LoaderData = {
  eventListItems: Awaited<ReturnType<typeof getEventListItems>>
}

async function loader({ request, params }) {
	const user = await getUserById(params.userId)
  const eventListItems = await getEventListItems({ userId: params.userId })

  return json<LoaderData>({ eventListItems, user })
}

function ProfileDetailPage() {
  const data = useLoaderData() as LoaderData
	const loggedInUser = useUser()

  return (
    <>
      <Nav>
        <span>Logo</span>
        <span>{loggedInUser.email}</span>
      </Nav>

      <div>
        <div>{data.user.email}</div>
        <div>{data.user.id}</div>
      </div>

      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  )
}

export { ProfileDetailPage as default, loader }
