import { CreateLinkForm } from '@/components/create-link-form'
import { LinksList } from '@/components/links-list'

export function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4 py-10 ">
      <div className="w-full max-w-5xl">
        <img src="/logo.svg" alt="Logo" className="w-24 pl-1 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 items-start">
          <CreateLinkForm />
          <LinksList />
        </div>
      </div>
    </main>
  )
}
