import { deleteLink } from '@/http/delete-link'
import type { Url } from '@/http/get-links'
import { Copy, Trash } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { Button } from './ui/button'

interface LinkItemProps {
  Url: Url
}

export function LinkItem({ Url }: LinkItemProps) {
  const queryClient = useQueryClient()
  const { shortUrl, originalUrl, visitCount } = Url

  const { mutateAsync: deleteLinkMutation } = useMutation({
    mutationFn: deleteLink,
    onMutate: async deletedShortUrl => {
      await queryClient.cancelQueries({ queryKey: ['links'] })
      const previousLinks = queryClient.getQueryData(['links'])
      queryClient.setQueryData(['links'], (old: Url[] = []) => {
        return old.filter(link => link.shortUrl !== deletedShortUrl)
      })
      return { previousLinks }
    },
    onError: (_err, _deletedShortUrl, context) => {
      queryClient.setQueryData(['links'], context?.previousLinks)
      toast.error('Erro ao excluir link!')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
    onSuccess: () => {
      toast.success('Link excluído com sucesso!')
    },
  })

  async function handleCopyLink() {
    const fullUrl = `${window.location.origin}/${shortUrl}`
    await navigator.clipboard.writeText(fullUrl)
    toast.info('Link copiado com sucesso!', {
      description: 'O link foi copiado para a área de transferência.'
    })
  }

  async function handleDeleteLink() {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este link?')
  
    if (!confirmDelete) {
      return
    }
  
    try {
      await deleteLinkMutation(shortUrl)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message)
        return
      }
      console.error(error)
    }
  }

  return (
    <li className="flex items-center gap-3 py-4 border-t border-gray-200">
      <a
        href={`${window.location.origin}/${shortUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-w-0"
      >
        <p className="text-sm font-medium text-blue-base line-clamp-1">
          brev.ly/{shortUrl}
        </p>
        <p className="text-xs text-gray-500 line-clamp-1">{originalUrl}</p>
      </a>

      <span className="mr-5 text-xs text-gray-500">{visitCount} acessos</span>

      <div className="flex gap-2">
        <Button.Root
          variant="secondary"
          title="Copiar link"
          onClick={handleCopyLink}
        >
          <Button.Icon>
            <Copy size={16} />
          </Button.Icon>
        </Button.Root>

        <Button.Root
          variant="secondary"
          title="Excluir link"
          className="hover:border-danger"
          onClick={handleDeleteLink}
        >
          <Button.Icon>
            <Trash size={16} />
          </Button.Icon>
        </Button.Root>
      </div>
    </li>
  )
}
