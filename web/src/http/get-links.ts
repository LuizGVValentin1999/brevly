import { axio } from '@/lib/axios'

export interface Url {
  originalUrl: string
  shortUrl: string
  visitCount: number
}

interface GetLinksResponse {
  total: number
  urls: Url[]
}

export async function getLinks(): Promise<Url[]> {
  const response = await axio.get<GetLinksResponse>('/links')

  const urls = response.data.urls
  
  return Array.isArray(urls) ? urls : []
}
