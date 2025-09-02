/**
 * Email template configurations for EmailJS
 * Professional templates for church pastoral care context
 */

export const emailTemplates = {
  /**
   * Standard contact template for EmailJS dashboard
   * Template ID: template_standard_contact
   */
  standardContact: {
    name: 'Lighthouse Church - Standard Contact',
    subject: 'Nouă cerere de contact - Lighthouse Church',
    html: `
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
    variables: [
      'name', 'contact', 'message', 'isUrgent', 'urgencyText', 
      'timestamp', 'submissionId', 'browserInfo'
    ]
  },

  /**
   * Auto-reply template for users
   * Template ID: template_auto_reply
   */
  autoReply: {
    name: 'Lighthouse Church - Auto Reply',
    subject: 'Am primit mesajul tău - Lighthouse Church',
    html: `
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

          <div style="background: #E8F4FD; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h4 style="color: #8B4513; margin: 0 0 10px 0;">Ce urmează:</h4>
            <ul style="color: #4A5568; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Un membru al echipei pastorale îți va răspunde personal</li>
              <li style="margin-bottom: 8px;">Toate conversațiile rămân strict confidențiale</li>
              <li style="margin-bottom: 8px;">Suntem aici să te ascultăm și să te sprijinim</li>
              <li>Poți să ne contactezi oricând ai nevoie</li>
            </ul>
          </div>
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
    variables: [
      'to_name', 'to_email', 'isUrgent', 'timestamp', 'churchName'
    ]
  }
}

/**
 * Template setup instructions for EmailJS dashboard
 */
export const setupInstructions = {
  emailjsSetup: `
    1. Create EmailJS account at https://www.emailjs.com/
    2. Add Gmail service (connect herdean12@yahoo.com)
    3. Create templates with these IDs:
       - template_standard_contact
       - template_auto_reply
    4. Copy the HTML from emailTemplates above
    5. Set up environment variables in Netlify
  `,
  
  environmentVariables: `
    Required Netlify Environment Variables:
    
    # Split service ID into parts (example: service_abc123)
    VITE_EMAIL_SERVICE_PART1=base64_encoded_part1
    VITE_EMAIL_SERVICE_PART2=base64_encoded_part2
    VITE_EMAIL_SERVICE_PART3=base64_encoded_part3
    
    # Encoded template IDs
    VITE_EMAIL_TEMPLATE_STANDARD=base64_encoded_template_id
    VITE_EMAIL_TEMPLATE_URGENT=base64_encoded_template_id
    VITE_EMAIL_TEMPLATE_AUTOREPLY=base64_encoded_template_id
    
    # Encoded public key
    VITE_EMAIL_PUBLIC_HASH=base64_encoded_public_key_part1
    VITE_EMAIL_KEY_SALT=base64_encoded_public_key_part2
    
    # Security
    VITE_EMAIL_PUBLIC_SALT=lighthouse_church_2024
  `
}

export default emailTemplates
