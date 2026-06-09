/**
 * create-admin-accounts.mjs
 * Creates Supabase Auth accounts for all team members in team_members table.
 * Run once: node scripts/create-admin-accounts.mjs
 *
 * Requires: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
 */

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

// Load .env.local manually
const env = {}
try {
  const raw = readFileSync('.env.local', 'utf8')
  raw.split('\n').forEach(line => {
    const [k, ...v] = line.split('=')
    if (k && v.length) env[k.trim()] = v.join('=').trim()
  })
} catch { /* .env.local not found — values must be passed as env vars */ }

const SUPABASE_URL  = process.env.VITE_SUPABASE_URL  || env['VITE_SUPABASE_URL']
const SUPABASE_KEY  = process.env.VITE_SUPABASE_ANON_KEY || env['VITE_SUPABASE_ANON_KEY']

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

// Team members and their temporary passwords
// Change passwords after first login!
const TEAM_ACCOUNTS = [
  { email: 'gabriel@seenlabs.com',   password: 'SeenLabs2025!', name: 'Gabriel' },
  { email: 'david@seenlabs.com',     password: 'SeenLabs2025!', name: 'David'   },
  { email: 'luis@seenlabs.com',      password: 'SeenLabs2025!', name: 'Luis'    },
  { email: 'alejandro@seenlabs.com', password: 'SeenLabs2025!', name: 'Alejandro' },
]

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function createAccount({ email, password, name }) {
  console.log(`\n→ Creating account for ${name} (${email})...`)

  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    if (error.message.toLowerCase().includes('already registered') ||
        error.message.toLowerCase().includes('user already registered')) {
      console.log(`  ✓ Already exists — skip (can log in with default password or reset it)`)
    } else {
      console.log(`  ✗ Error: ${error.message}`)
    }
    return
  }

  if (!data.session) {
    // Email confirmation required
    console.log(`  ✓ Account created — check ${email} inbox for confirmation link`)
  } else {
    // Auto-confirmed
    console.log(`  ✓ Account created & confirmed — ready to log in`)
    await supabase.auth.signOut()
  }
}

console.log('🚀 Creating Seen Labs team accounts...')
console.log(`   Supabase project: ${SUPABASE_URL}`)

for (const account of TEAM_ACCOUNTS) {
  await createAccount(account)
}

console.log('\n✅ Done!')
console.log('\n📋 Credentials (change after first login):')
console.log('   Password: SeenLabs2025!')
console.log('   URL: https://seen-labs-web.vercel.app/acceso')
console.log('\n⚠️  If email confirmation is required:')
console.log('   1. Check inbox for confirmation link')
console.log('   2. Click the link to activate')
console.log('   3. Then log in at /acceso')
