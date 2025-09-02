/**
 * EmailJS Template Setup Script
 * Run this script to automatically create email templates
 */

const EMAILJS_CONFIG = {
  serviceId: 'service_6b8r7qk',
  publicKey: 'KZI5pLAhVv-kwuDdP',
  privateKey: 'FelabN3f6UpIbTtanvpJj'
}

// Template configurations
const templates = {
  standard: {
    template_id: 'template_standard_contact',
    template_name: 'Lighthouse Church - Standard Contact',
    subject: 'Nouă cerere de contact - Lighthouse Church',
    content_html: `
<div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #faf8f5; padding: 30px; border-radius: 10px;">
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); border-radius: 8px;">
    <h1 style="color: white; margin: 0; font-size: 24px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
      ⛪ Lighthouse Church
    </h1>
    <p style="color: #F4E4BC; margin: 5px 0 0 0; font-size: 14px;">
      Nouă cerere de contact de pe website
    </p>
  </div>

  <!-- Content -->
  <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(139, 69, 19, 0.1);">
    <h2 style="color: #8B4513; margin-top: 0; font-size: 20px; border-bottom: 2px solid #DAA520; padding-bottom: 10px;">
      Detalii Contact
    </h2>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E6D3A3; font-weight: 600; color: #8B4513; width: 30%;">
          Nume:
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E6D3A3; color: #4A5568;">
          {{name}}
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E6D3A3; font-weight: 600; color: #8B4513;">
          Contact:
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E6D3A3; color: #4A5568;">
          {{contact}}
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E6D3A3; font-weight: 600; color: #8B4513;">
          Prioritate:
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E6D3A3;">
          <span style="{{#if isUrgent}}background: #CD5C5C; color: white; padding: 4px 12px; border-radius: 20px; font-weight: 600;{{else}}background: #9CAF88; color: white; padding: 4px 12px; border-radius: 20px;{{/if}}">
            {{urgencyText}}
          </span>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; font-weight: 600; color: #8B4513;">
          Data/Ora:
        </td>
        <td style="padding: 12px 0; color: #4A5568;">
          {{timestamp}}
        </td>
      </tr>
    </table>

    <div style="margin: 25px 0;">
      <h3 style="color: #8B4513; margin-bottom: 15px; font-size: 18px;">Mesajul:</h3>
      <div style="background: #f5f2ed; padding: 20px; border-radius: 8px; border-left: 4px solid #DAA520; font-style: italic; line-height: 1.6; color: #4A5568;">
        "{{message}}"
      </div>
    </div>

    {{#if isUrgent}}
    <div style="background: #FEE2E2; border: 2px solid #CD5C5C; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #CD5C5C; margin: 0 0 10px 0; font-size: 16px;">
        ⚠️ ATENȚIE: Cerere Urgentă
      </h3>
      <p style="margin: 0; color: #991B1B; font-weight: 500;">
        Această persoană a marcat cererea ca fiind urgentă. Te rugăm să răspunzi cât mai curând posibil cu compasiune și înțelegere.
      </p>
    </div>
    {{/if}}
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 30px; padding: 20px; color: #8a7968; font-size: 14px;">
    <p style="margin: 0 0 10px 0;">
      <strong>Răspunde cu dragoste și compasiune</strong>
    </p>
    <p style="margin: 0; font-style: italic;">
      "Veniți la Mine, toți cei osteniți și împovărați, și Eu vă voi da odihnă." - Matei 11:28
    </p>
    <hr style="border: none; border-top: 1px solid #E6D3A3; margin: 15px 0;">
    <p style="margin: 0; font-size: 12px;">
      Trimis de pe website-ul Lighthouse Church | ID: {{submissionId}}
    </p>
  </div>
</div>
    `,
    content_text: `
Lighthouse Church - Nouă cerere de contact

Nume: {{name}}
Contact: {{contact}}
Prioritate: {{urgencyText}}
Data/Ora: {{timestamp}}

Mesajul:
"{{message}}"

{{#if isUrgent}}
⚠️ ATENȚIE: Cerere Urgentă
Această persoană a marcat cererea ca fiind urgentă. Te rugăm să răspunzi cât mai curând posibil.
{{/if}}

Răspunde cu dragoste și compasiune.
"Veniți la Mine, toți cei osteniți și împovărați, și Eu vă voi da odihnă." - Matei 11:28

Trimis de pe website-ul Lighthouse Church
    `,
    settings: {
      to_email: 'herdean12@yahoo.com',
      from_name: '{{name}} via Lighthouse Church',
      reply_to: 'herdean12@yahoo.com'
    }
  },

  autoReply: {
    template_id: 'template_auto_reply',
    template_name: 'Lighthouse Church - Auto Reply',
    subject: 'Am primit mesajul tău - Lighthouse Church',
    content_html: `
<div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #faf8f5; padding: 30px; border-radius: 10px;">
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); border-radius: 8px;">
    <h1 style="color: white; margin: 0; font-size: 24px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
      ⛪ Lighthouse Church
    </h1>
    <p style="color: #F4E4BC; margin: 5px 0 0 0; font-size: 14px;">
      Mulțumim că ne-ai contactat
    </p>
  </div>

  <!-- Content -->
  <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(139, 69, 19, 0.1);">
    <h2 style="color: #8B4513; margin-top: 0; font-size: 20px;">
      Dragă {{to_name}},
    </h2>
    
    <p style="color: #4A5568; line-height: 1.6; font-size: 16px; margin: 20px 0;">
      Mulțumim că ai ales să ne contactezi. Am primit mesajul tău și cineva din echipa noastră pastorală îți va răspunde în următoarele <strong>24 de ore</strong>.
    </p>

    {{#if isUrgent}}
    <div style="background: #FEE2E2; border: 2px solid #CD5C5C; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #CD5C5C; margin: 0 0 10px 0; font-size: 16px;">
        ⚠️ Situație Urgentă
      </h3>
      <p style="margin: 0; color: #991B1B; font-weight: 500;">
        Înțelegem că aceasta este o situație urgentă. Dacă este o urgență medicală sau de siguranță, te rugăm să suni imediat la <strong>112</strong>.
      </p>
    </div>
    {{/if}}

    <div style="background: #f5f2ed; padding: 20px; border-radius: 8px; border-left: 4px solid #DAA520; margin: 25px 0;">
      <h3 style="color: #8B4513; margin: 0 0 15px 0; font-size: 18px;">
        Nu ești singur în această călătorie
      </h3>
      <p style="margin: 0; color: #4A5568; line-height: 1.6; font-style: italic;">
        "Veniți la Mine, toți cei osteniți și împovărați, și Eu vă voi da odihnă." - Matei 11:28
      </p>
    </div>

    <p style="color: #4A5568; line-height: 1.6; font-size: 16px; margin: 20px 0;">
      Ești prețios în ochii lui Dumnezeu și nu ești singur în această luptă. Echipa noastră este aici să te sprijine cu dragoste, compasiune și fără judecată.
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 30px; padding: 20px; color: #8a7968; font-size: 14px;">
    <p style="margin: 0 0 10px 0; font-weight: 600;">
      Cu dragoste și rugăciuni,
    </p>
    <p style="margin: 0 0 15px 0;">
      Echipa Lighthouse Church
    </p>
    <hr style="border: none; border-top: 1px solid #E6D3A3; margin: 15px 0;">
    <p style="margin: 0; font-size: 12px;">
      Trimis automat la {{timestamp}} | Lighthouse Church
    </p>
  </div>
</div>
    `,
    content_text: `
Lighthouse Church

Dragă {{to_name}},

Mulțumim că ai ales să ne contactezi. Am primit mesajul tău și cineva din echipa noastră pastorală îți va răspunde în următoarele 24 de ore.

{{#if isUrgent}}
⚠️ Situație Urgentă
Înțelegem că aceasta este o situație urgentă. Dacă este o urgență medicală, te rugăm să suni imediat la 112.
{{/if}}

Nu ești singur în această călătorie
"Veniți la Mine, toți cei osteniți și împovărați, și Eu vă voi da odihnă." - Matei 11:28

Ești prețios în ochii lui Dumnezeu și nu ești singur în această luptă. Echipa noastră este aici să te sprijine cu dragoste, compasiune și fără judecată.

Cu dragoste și rugăciuni,
Echipa Lighthouse Church
    `,
    settings: {
      to_email: '{{to_email}}',
      from_name: 'Lighthouse Church',
      reply_to: 'herdean12@yahoo.com'
    }
  }
}

// Function to create templates via EmailJS API
async function createTemplates() {
  console.log('🚀 Creating EmailJS templates...')
  
  for (const [key, template] of Object.entries(templates)) {
    try {
      console.log(`Creating ${template.template_name}...`)
      
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${EMAILJS_CONFIG.privateKey}`
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.serviceId,
          template_id: template.template_id,
          template_name: template.template_name,
          subject: template.subject,
          content_html: template.content_html,
          content_text: template.content_text,
          settings: template.settings
        })
      })
      
      if (response.ok) {
        console.log(`✅ ${template.template_name} created successfully`)
      } else {
        const error = await response.text()
        console.log(`❌ Failed to create ${template.template_name}:`, error)
      }
    } catch (error) {
      console.error(`❌ Error creating ${template.template_name}:`, error)
    }
  }
}

// Generate environment variables
function generateEnvVars() {
  console.log('\n🔐 Generating secure environment variables...')
  
  // Note: This is a simplified version - the actual obfuscation happens in the browser
  const envVars = {
    VITE_EMAIL_SERVICE_PART1: btoa('service_6b8r7qk'.slice(0, 5)),
    VITE_EMAIL_SERVICE_PART2: btoa('service_6b8r7qk'.slice(5, 10)),
    VITE_EMAIL_SERVICE_PART3: btoa('service_6b8r7qk'.slice(10)),
    VITE_EMAIL_TEMPLATE_STANDARD: btoa('template_standard_contact'),
    VITE_EMAIL_TEMPLATE_URGENT: btoa('template_standard_contact'),
    VITE_EMAIL_TEMPLATE_AUTOREPLY: btoa('template_auto_reply'),
    VITE_EMAIL_PUBLIC_HASH: btoa('KZI5pLAhVv-kwuDdP'.slice(0, 10)),
    VITE_EMAIL_KEY_SALT: btoa('KZI5pLAhVv-kwuDdP'.slice(10)),
    VITE_EMAIL_PUBLIC_SALT: 'lighthouse_church_2024'
  }
  
  console.log('\n📋 Add these to your Netlify environment variables:')
  Object.entries(envVars).forEach(([key, value]) => {
    console.log(`${key}=${value}`)
  })
  
  return envVars
}

// Main setup function
async function setupEmailJS() {
  console.log('🏛️ Setting up EmailJS for Lighthouse Church...\n')
  
  // Create templates
  await createTemplates()
  
  // Generate environment variables
  generateEnvVars()
  
  console.log('\n✅ Setup complete!')
  console.log('\nNext steps:')
  console.log('1. Copy the environment variables to Netlify')
  console.log('2. Deploy your site')
  console.log('3. Test the contact form')
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { setupEmailJS, createTemplates, generateEnvVars, EMAILJS_CONFIG }
} else {
  // Make available in browser
  window.setupEmailJS = setupEmailJS
  window.createTemplates = createTemplates
  window.generateEnvVars = generateEnvVars
}

console.log('📧 EmailJS Setup Script Loaded')
console.log('Run setupEmailJS() to begin setup')
