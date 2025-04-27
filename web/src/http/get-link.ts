import { axio } from '@/lib/axios'

interface GetLinkResponse {
  originalUrl: string
}

export async function getLink(shortUrl: string) {
  const response = await axio.get<GetLinkResponse>(`visit/${shortUrl}`)
  return response.data
}
