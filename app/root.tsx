import { useContext, useEffect } from 'react'
import type {
  LoaderFunction,
  MetaFunction,
  ErrorBoundaryComponent,
  CatchBoundaryComponent,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  useCatch,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import { ClientStyleContext } from '~/ui'
import { getUser } from './session.server'

type LoaderData = {
user: Awaited<ReturnType<typeof getUser>>
}

const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Eventio',
  viewport: 'width=device-width,initial-scale=1',
})

const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  })
}

const App = () => {
  const clientStyleData = useContext(ClientStyleContext)

  // Only executed on client
  useEffect(() => {
    // reset cache to re-apply global styles
    clientStyleData.reset()
  }, [clientStyleData])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: clientStyleData.sheet }}
          suppressHydrationWarning
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch()

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  )
}

const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  )
}

export { meta, loader, App as default, CatchBoundary, ErrorBoundary }
