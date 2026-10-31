// Vercel Serverless Function: menyajikan konfigurasi Supabase (publishable)
// ke frontend tanpa menaruh key di repo GitHub maupun di chat.
// Set di dashboard Vercel (Project > Settings > Environment Variables):
//   SUPABASE_URL      = Project URL dari Supabase (Settings > API)
//   SUPABASE_ANON_KEY = anon / publishable key dari Supabase (Settings > API)
// JANGAN PERNAH isi service_role key di sini: itu kunci master yang bisa
// melewati Row Level Security dan membaca/menghapus data semua user.
module.exports = async function handler(req, res) {
  var url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  var anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !anonKey) {
    res.status(503).json({ error: "supabase_not_configured" });
    return;
  }
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ url: url, anonKey: anonKey });
};
