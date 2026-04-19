const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf-8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1];
const key = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1];

const supabase = createClient(url, key);

async function test() {
  const { data: tables, error } = await supabase.from('information_schema.tables').select('*');
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Tables:", JSON.stringify(tables, null, 2));
  }
}
test();
