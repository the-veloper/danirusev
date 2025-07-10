'use client'

import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../providers/supabase-auth-provider' // Adjust path if needed

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Името е задължително.' }),
  email: z
    .string()
    .min(1, { message: 'Имейлът е задължителен.' })
    .email({ message: 'Въведеният имейл е невалиден.' }),
  message: z.string().min(1, { message: 'Съобщението е задължително.' }),
  hiddenspam: z
    .string()
    .max(0, { message: 'This field must be empty.' })
    .optional(),
})

type ContactFormInputs = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const { user, isLoading } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  })

  useEffect(() => {
    if (user) {
      setValue('name', user.user_metadata.name || '')
      setValue('email', user.email || '')
    }
  }, [user, setValue])

  const onValid: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('access_key', process.env.NEXT_PUBLIC_WEB3_FORMS_KEY!)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setResult('Съобщението Ви е изпратено успешно!')
        toast.success('Успех!', {
          description: 'Съобщението Ви е изпратено успешно!',
        })
        // Only reset the message field if the user is logged in
        if (user) {
          setValue('message', '')
        } else {
          reset()
        }
      } else {
        console.error('Error submitting form:', result)
        setResult(result.message || 'Възникна грешка при изпращането.')
        toast.error('Грешка', {
          description: result.message || 'Възникна грешка при изпращането.',
        })
      }
    } catch (error) {
      console.error('An error occurred:', error)
      setResult('Възникна грешка при изпращането.')
      toast.error('Грешка', {
        description: 'Възникна грешка при изпращането.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onInvalid: SubmitErrorHandler<ContactFormInputs> = (errors) => {
    console.error('Validation Errors:', errors)
    Object.values(errors).forEach((error) => {
      if (error.message) {
        toast.error('Грешка при валидация', {
          description: error.message,
        })
      }
    })
  }

  useEffect(() => {
    if (isSubmitSuccessful && !user) {
      reset()
    } else if (isSubmitSuccessful && user) {
        setValue('message', '')
    }
  }, [isSubmitSuccessful, reset, user, setValue])

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} className='space-y-6'>
      <input
        type='text'
        autoComplete='off'
        tabIndex={-1}
        className='hidden'
        style={{ display: 'none' }}
        {...register('hiddenspam')}
      />

      <div className='space-y-2'>
        <Label htmlFor='name'>Име</Label>
        <Input
          id='name'
          placeholder='Вашето име'
          {...register('name')}
          disabled={isLoading || !!user}
        />
        {errors.name && (
          <p className='text-sm text-destructive'>{errors.name.message}</p>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='email'>Имейл</Label>
        <Input
          id='email'
          type='email'
          placeholder='danirusev@gmail.com'
          {...register('email')}
          disabled={isLoading || !!user}
        />
        {errors.email && (
          <p className='text-sm text-destructive'>{errors.email.message}</p>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='message'>Съобщение</Label>
        <Textarea
          id='message'
          placeholder='Напишете Вашето съобщение тук...'
          rows={6}
          {...register('message')}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className='text-sm text-destructive'>{errors.message.message}</p>
        )}
      </div>
      <div className='flex justify-center'>
        <Button
          type='submit'
          className='w-full sm:w-auto bg-main text-alt hover:bg-main/80'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'Изпращане...'
          ) : (
            <>
              <Send className='mr-2 h-4 w-4' />
              Изпрати съобщението
            </>
          )}
        </Button>
      </div>
      {result && <p className='mt-4 text-center text-sm'>{result}</p>}
    </form>
  )
}


