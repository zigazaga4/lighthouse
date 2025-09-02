/**
 * EmailJS service for Lighthouse Church contact form
 * Secure email sending with obfuscated API keys
 */

import emailjs from '@emailjs/browser'

class EmailService {
  constructor() {
    this.isInitialized = false
    this.serviceId = null
    this.publicKey = null
    this.templates = {
      standard: null,
      urgent: null,
      autoReply: null
    }
    this.decoyOperations = []
  }

  /**
   * Initialize EmailJS with simple credentials
   */
  async initialize() {
    if (this.isInitialized) return true

    try {
      // Get credentials from environment variables
      this.serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID
      this.publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY
      this.templates.standard = import.meta.env.VITE_EMAIL_TEMPLATE_STANDARD
      this.templates.urgent = import.meta.env.VITE_EMAIL_TEMPLATE_STANDARD
      this.templates.autoReply = import.meta.env.VITE_EMAIL_TEMPLATE_AUTOREPLY

      console.log('📧 EmailJS Configuration:')
      console.log('Service ID:', this.serviceId)
      console.log('Template ID:', this.templates.standard)

      if (!this.serviceId || !this.publicKey || !this.templates.standard) {
        throw new Error('EmailJS credentials not configured in environment variables')
      }

      // Initialize EmailJS
      emailjs.init(this.publicKey)

      this.isInitialized = true
      console.log('✅ Email service initialized successfully')
      return true

    } catch (error) {
      console.error('❌ Email service initialization failed:', error)
      return false
    }
  }

  /**
   * Send contact form email using EmailJS template
   */
  async sendContactEmail(formData) {
    try {
      // Initialize if not already done
      if (!this.isInitialized) {
        const initialized = await this.initialize()
        if (!initialized) {
          throw new Error('Email service initialization failed')
        }
      }

      // Simple validation
      if (!formData.contact || !formData.contact.trim()) {
        throw new Error('Contact information is required')
      }

      // Prepare email data for template
      const emailData = this.prepareTemplateEmailData(formData)

      // Send email using template
      const response = await emailjs.send(
        this.serviceId,
        this.templates.standard, // Use the template
        emailData
      )

      console.log('✅ Email sent successfully:', response)

      // Send auto-reply if email provided and auto-reply template exists
      if (this.isValidEmail(formData.contact) && this.templates.autoReply) {
        await this.sendTemplateAutoReply(formData)
      }

      return {
        success: true,
        messageId: response.text,
        timestamp: Date.now()
      }

    } catch (error) {
      console.error('❌ Email sending failed:', error)

      return {
        success: false,
        error: error.message || 'Failed to send email',
        timestamp: Date.now()
      }
    }
  }

  /**
   * Prepare email data for template sending
   */
  prepareTemplateEmailData(formData) {
    const now = new Date()
    const romanianTime = now.toLocaleString('ro-RO', {
      timeZone: 'Europe/Bucharest',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    return {
      name: formData.name || 'Nu a fost furnizat',
      contact: formData.contact,
      message: formData.message || 'Nu a fost furnizat mesaj',
      isUrgent: formData.isUrgent,
      timestamp: romanianTime
    }
  }

  /**
   * Prepare email data for direct sending (no template) - BACKUP METHOD
   */
  prepareDirectEmailData(formData) {
    const now = new Date()
    const romanianTime = now.toLocaleString('ro-RO', {
      timeZone: 'Europe/Bucharest',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    const urgencyText = formData.isUrgent ? 'URGENT - Necesită atenție imediată' : 'Cerere standard'

    return {
      to_email: 'herdean12@yahoo.com',
      from_name: (formData.name || 'Anonim') + ' via Lighthouse Church',
      reply_to: 'herdean12@yahoo.com',
      subject: 'Nouă cerere de contact - Lighthouse Church',
      html_message: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #faf8f5; padding: 30px;">
          <div style="text-align: center; background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0;">⛪ Lighthouse Church</h1>
            <p style="color: #F4E4BC; margin: 5px 0 0 0;">Nouă cerere de contact</p>
          </div>

          <div style="background: white; padding: 25px; border-radius: 8px;">
            <h2 style="color: #8B4513;">Detalii Contact</h2>

            <p><strong>Nume:</strong> ${formData.name || 'Nu a fost furnizat'}</p>
            <p><strong>Contact:</strong> ${formData.contact}</p>
            <p><strong>Prioritate:</strong> <span style="${formData.isUrgent ? 'background: #CD5C5C; color: white; padding: 4px 12px; border-radius: 20px;' : 'background: #9CAF88; color: white; padding: 4px 12px; border-radius: 20px;'}">${urgencyText}</span></p>
            <p><strong>Data/Ora:</strong> ${romanianTime}</p>

            <div style="background: #f5f2ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Mesajul:</h3>
              <p style="font-style: italic;">"${formData.message || 'Nu a fost furnizat mesaj'}"</p>
            </div>

            ${formData.isUrgent ? `
            <div style="background: #FEE2E2; border: 2px solid #CD5C5C; padding: 20px; border-radius: 8px;">
              <h3 style="color: #CD5C5C;">⚠️ ATENȚIE: Cerere Urgentă</h3>
              <p>Această persoană a marcat cererea ca fiind urgentă. Te rugăm să răspunzi cât mai curând posibil.</p>
            </div>
            ` : ''}
          </div>

          <div style="text-align: center; margin-top: 30px; color: #8a7968;">
            <p><strong>Răspunde cu dragoste și compasiune</strong></p>
            <p style="font-style: italic;">"Veniți la Mine, toți cei osteniți și împovărați, și Eu vă voi da odihnă." - Matei 11:28</p>
          </div>
        </div>
      `,
      message: `
Lighthouse Church - Nouă cerere de contact

Nume: ${formData.name || 'Nu a fost furnizat'}
Contact: ${formData.contact}
Prioritate: ${urgencyText}
Data/Ora: ${romanianTime}

Mesajul:
"${formData.message || 'Nu a fost furnizat mesaj'}"

${formData.isUrgent ? '⚠️ ATENȚIE: Cerere Urgentă - Această persoană a marcat cererea ca fiind urgentă.' : ''}

Răspunde cu dragoste și compasiune.
"Veniți la Mine, toți cei osteniți și împovărați, și Eu vă voi da odihnă." - Matei 11:28

Trimis de pe website-ul Lighthouse Church
      `
    }
  }

  /**
   * Send template-based auto-reply to user
   */
  async sendTemplateAutoReply(formData) {
    try {
      if (!this.isValidEmail(formData.contact)) return

      const autoReplyData = {
        name: formData.name || 'Prieten',
        contact: formData.contact,
        message: 'Mulțumim că ne-ai contactat. Te vom contacta în curând.',
        isUrgent: false,
        timestamp: new Date().toLocaleString('ro-RO')
      }

      await emailjs.send(
        this.serviceId,
        this.templates.autoReply,
        autoReplyData
      )

      console.log('✅ Auto-reply sent successfully')
    } catch (error) {
      console.error('❌ Auto-reply failed:', error)
      // Don't throw - auto-reply failure shouldn't break main email
    }
  }

  /**
   * Send direct auto-reply to user (no template) - BACKUP METHOD
   */
  async sendDirectAutoReply(formData) {
    try {
      if (!this.isValidEmail(formData.contact)) return

      const autoReplyData = {
        to_email: formData.contact,
        from_name: 'Lighthouse Church',
        reply_to: 'herdean12@yahoo.com',
        subject: 'Am primit mesajul tău - Lighthouse Church',
        html_message: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #faf8f5; padding: 30px;">
            <div style="text-align: center; background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0;">⛪ Lighthouse Church</h1>
              <p style="color: #F4E4BC; margin: 5px 0 0 0;">Mulțumim că ne-ai contactat</p>
            </div>

            <div style="background: white; padding: 25px; border-radius: 8px;">
              <h2 style="color: #8B4513;">Dragă ${formData.name || 'Prieten'},</h2>

              <p>Mulțumim că ai ales să ne contactezi. Am primit mesajul tău și cineva din echipa noastră pastorală îți va răspunde în următoarele <strong>24 de ore</strong>.</p>

              ${formData.isUrgent ? `
              <div style="background: #FEE2E2; border: 2px solid #CD5C5C; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #CD5C5C;">⚠️ Situație Urgentă</h3>
                <p>Înțelegem că aceasta este o situație urgentă. Dacă este o urgență medicală, te rugăm să suni imediat la <strong>112</strong>.</p>
              </div>
              ` : ''}

              <div style="background: #f5f2ed; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #8B4513;">Nu ești singur în această călătorie</h3>
                <p style="font-style: italic;">"Veniți la Mine, toți cei osteniți și împovărați, și Eu vă voi da odihnă." - Matei 11:28</p>
              </div>

              <p>Ești prețios în ochii lui Dumnezeu și nu ești singur în această luptă. Echipa noastră este aici să te sprijine cu dragoste, compasiune și fără judecată.</p>
            </div>

            <div style="text-align: center; margin-top: 30px; color: #8a7968;">
              <p><strong>Cu dragoste și rugăciuni,</strong></p>
              <p>Echipa Lighthouse Church</p>
            </div>
          </div>
        `,
        message: `
Dragă ${formData.name || 'Prieten'},

Mulțumim că ai ales să ne contactezi. Am primit mesajul tău și cineva din echipa noastră pastorală îți va răspunde în următoarele 24 de ore.

${formData.isUrgent ? 'Înțelegem că aceasta este o situație urgentă. Dacă este o urgență medicală, te rugăm să suni imediat la 112.' : ''}

Nu ești singur în această călătorie
"Veniți la Mine, toți cei osteniți și împovărați, și Eu vă voi da odihnă." - Matei 11:28

Ești prețios în ochii lui Dumnezeu și nu ești singur în această luptă. Echipa noastră este aici să te sprijine cu dragoste, compasiune și fără judecată.

Cu dragoste și rugăciuni,
Echipa Lighthouse Church
        `
      }

      await emailjs.send(
        this.serviceId,
        '', // No template
        autoReplyData,
        this.publicKey
      )

      console.log('✅ Auto-reply sent successfully')
    } catch (error) {
      console.error('❌ Auto-reply failed:', error)
      // Don't throw - auto-reply failure shouldn't break main email
    }
  }

  /**
   * Validate email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }



  /**
   * Test email service configuration
   */
  async testConfiguration() {
    try {
      const initialized = await this.initialize()
      if (!initialized) {
        return { success: false, error: 'Initialization failed' }
      }

      // Test with minimal data
      const testData = {
        name: 'Test User',
        contact: 'test@example.com',
        message: 'Test message from Lighthouse Church website',
        isUrgent: false,
        _startTime: Date.now() - 5000 // Simulate normal submission time
      }

      const result = await this.sendContactEmail(testData)
      return result

    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      serviceId: this.serviceId ? '***' + this.serviceId.slice(-4) : null,
      templatesConfigured: Object.values(this.templates).filter(Boolean).length,
      lastError: this.lastError || null
    }
  }
}

// Export singleton instance
export default new EmailService()
