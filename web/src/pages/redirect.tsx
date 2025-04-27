import { getLink } from '@/http/get-link'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NotFound } from './not-found'

export function Redirect() {
  const { shortUrl } = useParams<{ shortUrl: string }>()

  if (!shortUrl) return <NotFound />

  const { data, isLoading, isError } = useQuery({
    queryKey: ['redirect', shortUrl],
    queryFn: () => getLink(shortUrl),
    retry: false,
    enabled: !!shortUrl,
  })

  useEffect(() => {
    if (data?.originalUrl) {
      const timeout = setTimeout(() => {
        window.location.href = data.originalUrl
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [data])

  if (isError) {
    return <NotFound />
  }

  if (isLoading) {
    return (
      <main className="flex items-center justify-center px-3 bg-gray-200 h-dvh">
        <div className="w-full max-w-[480px] bg-white rounded-lg p-8 text-center">
          <div className="flex justify-center">
            <img src="/logo_Icon.svg" alt="Logo" className="w-10" />
          </div>
          <h2 className="mt-8 text-2xl font-bold text-gray-600">
            Redirecionando...
          </h2>
          <p className="mt-4 text-gray-500">
            O link será aberto automaticamente em alguns instantes.
          </p>
          <p className="mt-1 text-gray-500">
            Não foi redirecionado?{' '}
            <Link to="/" className="text-blue-600 hover:underline">
              Acesse aqui
            </Link>
          </p>
        </div>
      </main>
    )
  }

  return null 
}