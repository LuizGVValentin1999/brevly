import { axio } from '@/lib/axios'

export async function deleteLink(shortUrl: string) {
  await axio.delete(`/urls/${shortUrl}`)
}
