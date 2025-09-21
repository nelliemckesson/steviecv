export async function fetchContactData(userId, supabase) {
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

export async function setContactData(userId, fields, supabase) {
  let { error } = await supabase.from('Contact').upsert({
    fields: fields
  });

  if (error) {
    console.error('Error setting contact data:', error);
    return null;
  }

  return true;
}
