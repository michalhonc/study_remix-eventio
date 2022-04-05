import * as React from 'react'
import { RemixBrowser } from '@remix-run/react'
import { hydrate } from 'react-dom'
import { getCssText, ClientStyleContext } from '~/ui'

interface ClientCacheProviderProps {
  children: React.ReactNode
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [sheet, setSheet] = React.useState(getCssText())

  const reset = React.useCallback(() => {
    setSheet(getCssText())
  }, [])

  return (
    <ClientStyleContext.Provider value={{ reset, sheet }}>
      {children}
    </ClientStyleContext.Provider>
  )
}

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
)
