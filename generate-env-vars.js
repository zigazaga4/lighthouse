/**
 * Generate Environment Variables for Lighthouse Church EmailJS
 * Your credentials: service_6b8r7qk, KZI5pLAhVv-kwuDdP
 */

// Simple obfuscation function
function obfuscateString(str) {
  // Reverse and encode
  const reversed = str.split('').reverse().join('')
  const salt = 'lighthouse_church_2024'
  return btoa(salt + reversed)
}

// Split string into parts
function splitString(str, parts) {
  const length = Math.ceil(str.length / parts)
  const result = []
  for (let i = 0; i < parts; i++) {
    const start = i * length
    const end = start + length
    result.push(str.slice(start, end))
  }
  return result
}

// Your actual credentials
const credentials = {
  serviceId: 'service_6b8r7qk',
  publicKey: 'KZI5pLAhVv-kwuDdP',
  templateStandard: 'template_standard_contact',
  templateAutoReply: 'template_auto_reply'
}

console.log('🔐 Generating Environment Variables for Lighthouse Church\n')

// Split service ID into 3 parts (reversed)
const serviceIdParts = splitString(credentials.serviceId, 3)
const publicKeyParts = splitString(credentials.publicKey, 2)

// Generate obfuscated environment variables
const envVars = {
  // Service ID parts (reversed order for security)
  VITE_EMAIL_SERVICE_PART1: obfuscateString(serviceIdParts[2]),
  VITE_EMAIL_SERVICE_PART2: obfuscateString(serviceIdParts[1]),
  VITE_EMAIL_SERVICE_PART3: obfuscateString(serviceIdParts[0]),

  // Template IDs
  VITE_EMAIL_TEMPLATE_STANDARD: obfuscateString(credentials.templateStandard),
  VITE_EMAIL_TEMPLATE_URGENT: obfuscateString(credentials.templateStandard), // Same as standard for now
  VITE_EMAIL_TEMPLATE_AUTOREPLY: obfuscateString(credentials.templateAutoReply),

  // Public key parts
  VITE_EMAIL_PUBLIC_HASH: obfuscateString(publicKeyParts[0]),
  VITE_EMAIL_KEY_SALT: obfuscateString(publicKeyParts[1]),

  // Security salt
  VITE_EMAIL_PUBLIC_SALT: 'lighthouse_church_2024'
}

console.log('📋 COPY THESE TO YOUR NETLIFY ENVIRONMENT VARIABLES:')
console.log('=' .repeat(60))
console.log('')

Object.entries(envVars).forEach(([key, value]) => {
  console.log(`${key}=${value}`)
})

console.log('')
console.log('=' .repeat(60))
console.log('')
console.log('✅ Instructions:')
console.log('1. Go to Netlify Dashboard → Your Site → Site Settings')
console.log('2. Click "Environment variables" in the left menu')
console.log('3. Click "Add variable" for each line above')
console.log('4. Copy the variable name and value exactly')
console.log('5. Click "Save" after adding all variables')
console.log('6. Go to "Deploys" and click "Trigger deploy"')
console.log('')
console.log('🧪 After deployment, test with:')
console.log('emailSetupHelper.testCurrentConfiguration()')

// Verification
console.log('\n🔍 VERIFICATION:')
console.log('Original Service ID:', credentials.serviceId)
console.log('Original Public Key:', credentials.publicKey)
console.log('Template Standard:', credentials.templateStandard)
console.log('Template Auto-Reply:', credentials.templateAutoReply)

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { envVars, credentials }
}
