import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { logout } from '~/session.server'

export const action: ActionFunction = async ({ request }) => {
  return logout(request)
}

export const loader: LoaderFunction = async ({ request }) => {
	// force logout
  return logout(request)
  // return redirect('/')
}
