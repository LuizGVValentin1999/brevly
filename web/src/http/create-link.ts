import { axio } from '@/lib/axios'

interface CreateLinkBody {
  originalUrl: string
  shortUrl: string
}

export async function createLink({ originalUrl, shortUrl }: CreateLinkBody) {
  await axio.post('/links', {
    originalUrl,
    shortUrl,
  })
}
