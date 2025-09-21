import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // Initialize the default user data:
      // Contact record
      if (data?.user?.id) {
        const { error: contactError } = await supabase
          .from('Contact')
          .insert([
            { user: data.user.id }
          ]);

        if (contactError) {
          console.error('Error creating contact record:', contactError);
        }
      }

      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error');
}