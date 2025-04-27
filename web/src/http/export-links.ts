import { axio } from '@/lib/axios'

interface ExportLinksResponse {
  reportUrl: string
}

export async function exportLinks() {
  const response = await axio.post<ExportLinksResponse>('/urls/exports')
  return response.data
}
