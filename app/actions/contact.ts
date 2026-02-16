'use server'

import { createClient } from '@/lib/supabaseServer'

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!name || !email || !subject || !message) {
    return { error: 'Please fill all required fields.' }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    phone,
    subject,
    message,
    role: user?.user_metadata?.role || null,
    user_id: user?.id || null,
  })

  if (error) {
    console.error(error)
    return { error: 'Something went wrong. Please try again.' }
  }

  return { success: 'Your message has been sent successfully.' }
}
