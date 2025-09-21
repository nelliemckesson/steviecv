import { createClient } from '@/utils/supabase/client';

export async function fetchContactData(userId) {
  const supabase = createClient();

  console.log(userId);

  let { data: Contact, error } = await supabase
    .from('Contact')
    .select('fields')
    .eq('user', userId)
    .single();

  if (error && status !== 406) {
    console.error('Error fetching contact data:', error);
    return null;
  }

  if (Contact) {
    console.log(Contact);
    return Contact;
  }

  return null;
}