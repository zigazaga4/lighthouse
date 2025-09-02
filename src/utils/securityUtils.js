/**
 * Security utilities for API key protection and request validation
 * Multi-layer obfuscation for EmailJS integration
 */

class SecurityUtils {
  constructor() {
    this.salt = this.generateSalt()
    this.decoyKeys = this.generateDecoyKeys()
    this.sessionId = this.generateSessionId()
  }

  /**
   * Generate dynamic salt for key obfuscation
   */
  generateSalt() {
    const baseSalt = import.meta.env.VITE_EMAIL_PUBLIC_SALT || 'lighthouse_church_2024'
    const timeSalt = Math.floor(Date.now() / (1000 * 60 * 10)) // Changes every 10 minutes
    return btoa(baseSalt + timeSalt).slice(0, 16)
  }

  /**
   * Generate decoy keys to confuse scrapers
   */
  generateDecoyKeys() {
    return [
      'service_fake_' + Math.random().toString(36).substr(2, 9),
      'template_decoy_' + Math.random().toString(36).substr(2, 9),
      'user_honeypot_' + Math.random().toString(36).substr(2, 9)
    ]
  }

  /**
   * Generate session ID for request validation
   */
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  /**
   * Reconstruct EmailJS service ID from environment variables
   */
  reconstructServiceId() {
    try {
      const part1 = import.meta.env.VITE_EMAIL_SERVICE_PART1 || ''
      const part2 = import.meta.env.VITE_EMAIL_SERVICE_PART2 || ''
      const part3 = import.meta.env.VITE_EMAIL_SERVICE_PART3 || ''
      
      if (!part1 || !part2) {
        throw new Error('Service configuration incomplete')
      }

      // Reverse the parts and decode
      const combined = part3 + part2 + part1
      return this.deobfuscateString(combined)
    } catch (error) {
      console.error('Service reconstruction failed:', error)
      return null
    }
  }

  /**
   * Reconstruct template ID from encoded environment variable
   */
  reconstructTemplateId(templateType = 'standard') {
    try {
      const encodedTemplate = templateType === 'urgent' 
        ? import.meta.env.VITE_EMAIL_TEMPLATE_URGENT
        : import.meta.env.VITE_EMAIL_TEMPLATE_STANDARD
      
      if (!encodedTemplate) {
        throw new Error('Template configuration missing')
      }

      return this.deobfuscateString(encodedTemplate)
    } catch (error) {
      console.error('Template reconstruction failed:', error)
      return null
    }
  }

  /**
   * Reconstruct public key from environment variables
   */
  reconstructPublicKey() {
    try {
      const keyHash = import.meta.env.VITE_EMAIL_PUBLIC_HASH || ''
      const keySalt = import.meta.env.VITE_EMAIL_KEY_SALT || ''
      
      if (!keyHash || !keySalt) {
        throw new Error('Public key configuration incomplete')
      }

      // Combine and decode
      const combined = keyHash + keySalt
      return this.deobfuscateString(combined)
    } catch (error) {
      console.error('Public key reconstruction failed:', error)
      return null
    }
  }

  /**
   * Deobfuscate string using custom algorithm
   */
  deobfuscateString(obfuscated) {
    try {
      // Step 1: Base64 decode
      const decoded = atob(obfuscated)
      
      // Step 2: Remove salt
      const saltLength = this.salt.length
      const withoutSalt = decoded.slice(saltLength)
      
      // Step 3: Reverse character order (simple obfuscation)
      return withoutSalt.split('').reverse().join('')
    } catch (error) {
      console.error('Deobfuscation failed:', error)
      return null
    }
  }

  /**
   * Obfuscate string for storage (used during setup)
   */
  obfuscateString(original) {
    try {
      // Step 1: Reverse character order
      const reversed = original.split('').reverse().join('')
      
      // Step 2: Add salt
      const withSalt = this.salt + reversed
      
      // Step 3: Base64 encode
      return btoa(withSalt)
    } catch (error) {
      console.error('Obfuscation failed:', error)
      return null
    }
  }

  /**
   * Validate request timestamp to prevent replay attacks
   */
  validateRequestTimestamp(timestamp) {
    const now = Date.now()
    const requestTime = parseInt(timestamp)
    const maxAge = 5 * 60 * 1000 // 5 minutes

    return (now - requestTime) <= maxAge
  }

  /**
   * Generate request signature for validation
   */
  generateRequestSignature(formData) {
    const timestamp = Date.now()
    const dataString = JSON.stringify(formData) + timestamp + this.sessionId
    const signature = btoa(dataString).slice(0, 32)
    
    return {
      signature,
      timestamp,
      sessionId: this.sessionId
    }
  }

  /**
   * Validate form data for honeypot and bot detection
   */
  validateFormData(formData) {
    const validationResults = {
      isValid: true,
      errors: [],
      warnings: []
    }

    // Check for honeypot fields (should be empty)
    if (formData.website || formData.phone_number || formData.company) {
      validationResults.isValid = false
      validationResults.errors.push('Bot detection triggered')
    }

    // Check submission speed (too fast = bot)
    const submissionTime = Date.now() - (formData._startTime || Date.now())
    if (submissionTime < 3000) { // Less than 3 seconds
      validationResults.isValid = false
      validationResults.errors.push('Submission too fast')
    }

    // Check for suspicious patterns
    if (formData.message && formData.message.includes('http')) {
      validationResults.warnings.push('URL detected in message')
    }

    return validationResults
  }

  /**
   * Rate limiting check
   */
  checkRateLimit() {
    const storageKey = 'lighthouse_submissions'
    const now = Date.now()
    const oneHour = 60 * 60 * 1000
    
    try {
      const submissions = JSON.parse(localStorage.getItem(storageKey) || '[]')
      
      // Remove old submissions
      const recentSubmissions = submissions.filter(time => (now - time) < oneHour)
      
      // Check if under limit (max 3 per hour)
      if (recentSubmissions.length >= 3) {
        return {
          allowed: false,
          message: 'Prea multe încercări. Te rugăm să aștepți o oră înainte să încerci din nou.'
        }
      }

      // Add current submission
      recentSubmissions.push(now)
      localStorage.setItem(storageKey, JSON.stringify(recentSubmissions))
      
      return { allowed: true }
    } catch (error) {
      console.error('Rate limit check failed:', error)
      return { allowed: true } // Allow on error
    }
  }

  /**
   * Browser fingerprinting for additional validation
   */
  generateBrowserFingerprint() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillText('Lighthouse Church', 2, 2)
    
    return {
      userAgent: navigator.userAgent.slice(0, 100),
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${screen.width}x${screen.height}`,
      canvas: canvas.toDataURL().slice(0, 100),
      timestamp: Date.now()
    }
  }
}

// Export singleton instance
export default new SecurityUtils()
