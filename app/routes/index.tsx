import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'

import { getUserId } from '~/session.server'

const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)

	if (userId === undefined) {
		return redirect('/login')
	} else {
		return redirect('/events')
	}
}

export { loader }
