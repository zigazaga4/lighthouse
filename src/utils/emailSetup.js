/**
 * EmailJS Setup Helper
 * Use this file to generate obfuscated environment variables
 * Run in browser console to generate the values for Netlify
 */

import securityUtils from './securityUtils.js'

class EmailSetupHelper {
  /**
   * Generate obfuscated environment variables for Netlify
   * Call this method with your actual EmailJS credentials
   */
  generateEnvironmentVariables(credentials) {
    const {
      serviceId,
      publicKey,
      templateStandard,
      templateUrgent,
      templateAutoReply
    } = credentials

    console.log('🔐 Generating obfuscated environment variables for Netlify...\n')

    // Split service ID into parts
    const serviceIdParts = this.splitString(serviceId, 3)
    const publicKeyParts = this.splitString(publicKey, 2)

    // Generate obfuscated values
    const envVars = {
      // Service ID parts (reversed and encoded)
      VITE_EMAIL_SERVICE_PART1: securityUtils.obfuscateString(serviceIdParts[2]),
      VITE_EMAIL_SERVICE_PART2: securityUtils.obfuscateString(serviceIdParts[1]),
      VITE_EMAIL_SERVICE_PART3: securityUtils.obfuscateString(serviceIdParts[0]),

      // Template IDs (encoded)
      VITE_EMAIL_TEMPLATE_STANDARD: securityUtils.obfuscateString(templateStandard),
      VITE_EMAIL_TEMPLATE_URGENT: securityUtils.obfuscateString(templateUrgent || templateStandard),
      VITE_EMAIL_TEMPLATE_AUTOREPLY: securityUtils.obfuscateString(templateAutoReply || ''),

      // Public key parts
      VITE_EMAIL_PUBLIC_HASH: securityUtils.obfuscateString(publicKeyParts[0]),
      VITE_EMAIL_KEY_SALT: securityUtils.obfuscateString(publicKeyParts[1]),

      // Security salt
      VITE_EMAIL_PUBLIC_SALT: 'lighthouse_church_2024'
    }

    // Display results
    console.log('📋 Copy these environment variables to your Netlify dashboard:\n')
    console.log('Site Settings > Environment Variables > Add Variable\n')
    
    Object.entries(envVars).forEach(([key, value]) => {
      console.log(`${key}=${value}`)
    })

    console.log('\n✅ Environment variables generated successfully!')
    console.log('\n🔍 Verification:')
    this.verifyConfiguration(envVars, credentials)

    return envVars
  }

  /**
   * Split string into parts for obfuscation
   */
  splitString(str, parts) {
    const length = Math.ceil(str.length / parts)
    const result = []
    
    for (let i = 0; i < parts; i++) {
      const start = i * length
      const end = start + length
      result.push(str.slice(start, end))
    }
    
    return result
  }

  /**
   * Verify that the configuration can be reconstructed
   */
  verifyConfiguration(envVars, originalCredentials) {
    // Temporarily set environment variables for testing
    const originalEnv = {}
    Object.keys(envVars).forEach(key => {
      originalEnv[key] = import.meta.env[key]
      import.meta.env[key] = envVars[key]
    })

    try {
      // Test reconstruction
      const reconstructedServiceId = securityUtils.reconstructServiceId()
      const reconstructedPublicKey = securityUtils.reconstructPublicKey()
      const reconstructedTemplate = securityUtils.reconstructTemplateId('standard')

      console.log('Original Service ID:', originalCredentials.serviceId)
      console.log('Reconstructed Service ID:', reconstructedServiceId)
      console.log('Match:', originalCredentials.serviceId === reconstructedServiceId ? '✅' : '❌')

      console.log('\nOriginal Public Key:', originalCredentials.publicKey)
      console.log('Reconstructed Public Key:', reconstructedPublicKey)
      console.log('Match:', originalCredentials.publicKey === reconstructedPublicKey ? '✅' : '❌')

      console.log('\nOriginal Template:', originalCredentials.templateStandard)
      console.log('Reconstructed Template:', reconstructedTemplate)
      console.log('Match:', originalCredentials.templateStandard === reconstructedTemplate ? '✅' : '❌')

    } catch (error) {
      console.error('❌ Verification failed:', error)
    } finally {
      // Restore original environment
      Object.keys(originalEnv).forEach(key => {
        import.meta.env[key] = originalEnv[key]
      })
    }
  }

  /**
   * Test email service with current configuration
   */
  async testCurrentConfiguration() {
    try {
      console.log('🧪 Testing current email configuration...')
      
      const emailService = (await import('../services/emailService.js')).default
      const result = await emailService.testConfiguration()
      
      if (result.success) {
        console.log('✅ Email service test successful!')
        console.log('Message ID:', result.messageId)
      } else {
        console.log('❌ Email service test failed:', result.error)
      }
      
      return result
    } catch (error) {
      console.error('❌ Test failed:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Generate sample EmailJS template configurations
   */
  generateTemplateConfigurations() {
    console.log('📧 EmailJS Template Configurations:\n')
    
    console.log('1. STANDARD CONTACT TEMPLATE')
    console.log('Template ID: template_standard_contact')
    console.log('Subject: Nouă cerere de contact - Lighthouse Church')
    console.log('To Email: herdean12@yahoo.com')
    console.log('From Name: {{name}} via Lighthouse Church')
    console.log('Reply To: noreply@lighthousechurch.ro\n')

    console.log('2. AUTO-REPLY TEMPLATE')
    console.log('Template ID: template_auto_reply')
    console.log('Subject: Am primit mesajul tău - Lighthouse Church')
    console.log('To Email: {{to_email}}')
    console.log('From Name: Lighthouse Church')
    console.log('Reply To: herdean12@yahoo.com\n')

    console.log('📋 Use the HTML templates from emailTemplates.js for the template content.')
  }

  /**
   * Quick setup guide
   */
  displaySetupGuide() {
    console.log(`
🚀 LIGHTHOUSE CHURCH EMAIL SETUP GUIDE

1. CREATE EMAILJS ACCOUNT
   - Go to https://www.emailjs.com/
   - Sign up with herdean12@yahoo.com
   - Verify email address

2. ADD EMAIL SERVICE
   - Go to Email Services
   - Add Gmail service
   - Connect herdean12@yahoo.com account
   - Note the Service ID

3. CREATE EMAIL TEMPLATES
   - Go to Email Templates
   - Create "Standard Contact" template
   - Create "Auto Reply" template
   - Use HTML from emailTemplates.js
   - Note the Template IDs

4. GET PUBLIC KEY
   - Go to Account > API Keys
   - Copy the Public Key

5. GENERATE ENVIRONMENT VARIABLES
   - Use this helper: emailSetupHelper.generateEnvironmentVariables({
       serviceId: 'your_service_id',
       publicKey: 'your_public_key',
       templateStandard: 'template_standard_contact',
       templateAutoReply: 'template_auto_reply'
     })

6. ADD TO NETLIFY
   - Go to Site Settings > Environment Variables
   - Add all generated variables
   - Deploy site

7. TEST
   - Use emailSetupHelper.testCurrentConfiguration()
   - Submit test form on website

✅ Done! Your church contact form is now secure and functional.
    `)
  }
}

// Export singleton instance
const emailSetupHelper = new EmailSetupHelper()

// Make available in browser console for setup
if (typeof window !== 'undefined') {
  window.emailSetupHelper = emailSetupHelper
}

// Quick setup for Lighthouse Church with provided credentials
emailSetupHelper.quickSetupLighthouse = function() {
  console.log('🏛️ Quick Setup for Lighthouse Church\n')

  const credentials = {
    serviceId: 'service_6b8r7qk',
    publicKey: 'KZI5pLAhVv-kwuDdP',
    templateStandard: 'template_standard_contact',
    templateAutoReply: 'template_auto_reply'
  }

  return this.generateEnvironmentVariables(credentials)
}

export default emailSetupHelper
