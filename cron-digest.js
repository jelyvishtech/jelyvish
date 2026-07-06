// cron-digest.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function sendWeeklyDigest() {
  // Get latest posts
  const { data: posts } = await supabase.from('posts').select('*').eq('is_published', true).order('published_at', { ascending: false }).limit(5);

  // Get subscribers
  const { data: subscribers } = await supabase.from('newsletter_subscribers').select('email').eq('confirmed', true);

  // TODO: Send via Resend (loop or batch)
  console.log('Weekly digest sent to', subscribers.length, 'subscribers with', posts.length, 'posts');
}

sendWeeklyDigest();
