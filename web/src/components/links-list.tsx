import { exportLinks } from '@/http/export-links'
import { getLinks } from '@/http/get-links'
import { DownloadSimple, Link, Spinner } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { LinkItem } from './link-item'

export function LinksList() {
  const { data: urls, isLoading } = useQuery({
    queryKey: ['urls'],
    queryFn: getLinks,
    refetchInterval: 5000,
  })

  const { mutateAsync: exportLinksMutation, isPending: isExporting } =
    useMutation({
      mutationFn: exportLinks,
      onSuccess: data => {
        window.open(data.reportUrl, '_blank')
        toast.success('Relatório gerado com sucesso!')
      },
      onError: error => {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message || 'Erro ao gerar relatório')
          return
        }
        toast.error('Erro ao gerar relatório')
      },
    })

  async function handleExportLinks() {
    await exportLinksMutation()
  }

  return (
    <section className="w-full p-8 bg-white rounded-lg ">
      {isLoading && (
        <div className="absolute top-0 left-0 right-0">
          <div className="w-full h-1 bg-gray-200">
            <div className="h-1 w-[30%] bg-blue-base absolute animate-[var(--animate-loading)]" />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Meus links</h2>
        <Button.Root
          variant="secondary"
          className="max-h-8"
          onClick={handleExportLinks}
          disabled={isExporting || urls?.length === 0}
        >
          <Button.Icon>
            {isExporting ? (
              <Spinner size={16} className="animate-spin" />
            ) : (
              <DownloadSimple size={16} />
            )}
          </Button.Icon>
          Baixar CSV
        </Button.Root>
      </div>

      <ul className="mt-5 overflow-y-auto max-h-100">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4 pt-5 mt-5 text-sm border-t border-gray-200">
            <Spinner className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        ) : urls?.length === 0 ? (
          <p className="flex flex-col items-center gap-4 pt-5 mt-5 text-xs text-gray-400 uppercase border-t border-gray-200">
            <Link className="w-8 h-8" />
            <span>AINDA NÃO EXISTEM LINKS CADASTRADOS</span>
          </p>
        ) : (
          urls?.map(link => <LinkItem key={link.shortUrl} Url={link} />)
        )}
      </ul>
    </section>
  )
}
