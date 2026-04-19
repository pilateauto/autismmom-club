const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('http://127.0.0.1:54321', 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH');
async function test() {
  const { data, error } = await supabase.from('resources').select('*');
  console.log("Error:", error);
  console.log("Data:", data);
}
test();
