const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function sendWeeklyDigest() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(5);

  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('email')
    .eq('confirmed', true);

  console.log(`Weekly digest: ${posts.length} posts to ${subscribers.length} subscribers`);
  // TODO: Send via Resend batch in Worker
}

sendWeeklyDigest().catch(console.error);
