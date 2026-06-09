/**
 * create-admin-accounts.mjs
 * Creates Supabase Auth accounts for all team members in team_members table.
 * Run once: node scripts/create-admin-accounts.mjs
 *
 * Pass the initial password as an env var — do NOT hardcode it:
 *   ADMIN_INIT_PASSWORD="YourSecurePass!" node scripts/create-admin-accounts.mjs
 *
 * Requires: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
 */

import { readFileSync, randomBytes } from 'fs'
import { createClient } from '@supabase/supabase-js'

// Load .env.local manually
const env = {}
try {
  const raw = readFileSync('.env.local', 'utf8')
  raw.split('\n').forEach(line => {
    const [k, ...v] = line.split('=')
    if (k && v.length) env[k.trim()] = v.join('=').trim()
  })
} catch { /* .env.local not found */ }

const SUPABASE_URL = process.env.VITE_SUPABASE_URL  || env['VITE_SUPABASE_URL']
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || env['VITE_SUPABASE_ANON_KEY']

// Password must be passed via env var — never hardcoded
const INIT_PASSWORD = process.env.ADMIN_INIT_PASSWORD

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

if (!INIT_PASSWORD) {
  // Generate a random secure password for this run and display it once
  const generated = randomBytes(16).toString('base64url')
  console.error(`❌ ADMIN_INIT_PASSWORD not set. Run with:`)
  console.error(`   ADMIN_INIT_PASSWORD="${generated}" node scripts/create-admin-accounts.mjs`)
  process.exit(1)
}

const TEAM_EMAILS = [
  { email: 'gabriel@seenlabs.com',   name: 'Gabriel' },
  { email: 'david@seenlabs.com',     name: 'David'   },
  { email: 'luis@seenlabs.com',      name: 'Luis'    },
  { email: 'alejandro@seenlabs.com', name: 'Alejandro' },
]

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function createAccount({ email, name }) {
  console.log(`\n→ Creating account for ${name} (${email})...`)

  const { data, error } = await supabase.auth.signUp({ email, password: INIT_PASSWORD })

  if (error) {
    if (error.message.toLowerCase().includes('already registered') ||
        error.message.toLowerCase().includes('user already registered')) {
      console.log(`  ✓ Already exists — skip`)
    } else {
      console.log(`  ✗ Error: ${error.message}`)
    }
    return
  }

  if (!data.session) {
    console.log(`  ✓ Account created — email confirmation required`)
  } else {
    console.log(`  ✓ Account created & confirmed — ready to log in`)
    await supabase.auth.signOut()
  }
}

console.log('🚀 Creating Seen Labs team accounts...')
for (const account of TEAM_EMAILS) {
  await createAccount(account)
}

console.log('\n✅ Done! Change passwords after first login.')
console.log('   URL: https://seen-labs-web.vercel.app/acceso')
