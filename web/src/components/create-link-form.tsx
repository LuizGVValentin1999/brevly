import { createLink } from '@/http/create-link'
import type { Url } from '@/http/get-links'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'

const createLinkFormSchema = z.object({
  originalUrl: z.string().url({ message: 'Informe uma URL válida.' }),
  shortUrl: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message: 'Informe uma URL minúscula e sem espaço/caracter especial.',
    }),
})

type CreateLinkFormSchema = z.infer<typeof createLinkFormSchema>

export function CreateLinkForm() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkFormSchema>({
    resolver: zodResolver(createLinkFormSchema),
    defaultValues: {
      originalUrl: '',
      shortUrl: '',
    },
  })

  const originalUrl = useWatch({ control, name: 'originalUrl' })
  const shortUrl = useWatch({ control, name: 'shortUrl' })

  const isFormValid = originalUrl.trim() !== '' && shortUrl.trim() !== ''

  const { mutateAsync: createLinkMutation } = useMutation({
    mutationFn: createLink,
    onMutate: async newLink => {
      await queryClient.cancelQueries({ queryKey: ['links'] })
      const previousLinks = queryClient.getQueryData(['links'])
      queryClient.setQueryData(['links'], (oldLinks: Url[] = []) => [
        ...oldLinks,
        { ...newLink, visit_count: 0 },
      ])
      return { previousLinks }
    },
    onError: (_err, _newItem, context) => {
      if (context?.previousLinks) {
        queryClient.setQueryData(['links'], context.previousLinks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  async function handleCreateLink(data: CreateLinkFormSchema) {
    try {
      await createLinkMutation({
        originalUrl: data.originalUrl,
        shortUrl: data.shortUrl,
      })
      toast.success('Link encurtado com sucesso!', {
        description: 'O link foi criado e adicionado à lista!',
      })
      reset()
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          description: 'Verifique o link informado.',
        })
        reset()
        return
      }
      console.error(error)
      toast.error('Erro ao encurtar link!')
    }
  }

  return (
    <form
      className="p-8 bg-white rounded-lg"
      onSubmit={handleSubmit(handleCreateLink)}
    >
      <fieldset>
        <h2 className="mb-6 text-lg font-bold">Novo link</h2>

        <div className="mt-5">
          <Input.Label error={!!errors.originalUrl}>
            LINK ORIGINAL
            <Input.Root
              error={!!errors.originalUrl}
              aria-errormessage={errors.originalUrl?.message}
            >
              <Input.Control
                type="text"
                placeholder="www.exemplo.com.br"
                {...register('originalUrl')}
              />
            </Input.Root>
          </Input.Label>
        </div>

        <div className="mt-5">
          <Input.Label error={!!errors.shortUrl}>
            LINK ENCURTADO
            <Input.Root
              error={!!errors.shortUrl}
              aria-errormessage={errors.shortUrl?.message}
              className="flex items-center gap-[1px]"
            >
              <Input.Prefix>brev.ly/</Input.Prefix>
              <Input.Control
                type="text"
                placeholder=""
                {...register('shortUrl')}
              />
            </Input.Root>
          </Input.Label>
        </div>
      </fieldset>

      <Button.Root
        type="submit"
        className="w-full mt-6"
        disabled={isSubmitting || !isFormValid}
      >
        {isSubmitting ? 'Salvando...' : 'Salvar link'}
      </Button.Root>
    </form>
  )
}