import { type FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

interface UseFormStateProps {
  action: (data: FormData) => Promise<FormState>
  initialState?: FormState
  onSuccess: () => Promise<void> | void
}

const defaultInitialState = {
  success: false,
  message: null,
  errors: null,
} as FormState

export function useFormState({
  action,
  initialState,
  onSuccess,
}: UseFormStateProps) {
  const [formState, setFormState] = useState<FormState>(
    initialState ?? defaultInitialState,
  )
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success && onSuccess) {
        await onSuccess()
      }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
