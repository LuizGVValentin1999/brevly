import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { router } from './routes'

export function App() {
  return (
    <QueryClientProvider client={(new QueryClient())}>
      <Toaster richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
