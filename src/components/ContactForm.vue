<template>
  <div class="contact-form-wrapper">
    <div class="form-header">
      <h3 id="contact-heading" class="form-title">Fă primul pas către speranță</h3>
      <p class="form-subtitle">
        Completează formularul de mai jos și cineva din echipa noastră te va contacta în cel mai scurt timp.
        Credem că fiecare persoană este prețioasă și că există un plan de dragoste pentru viața ta.
      </p>
    </div>

    <form 
      @submit.prevent="handleSubmit" 
      class="contact-form"
      novalidate
      aria-labelledby="contact-heading"
    >
      <!-- Name Field (Optional) -->
      <div class="form-group">
        <label for="name" class="form-label">
          Nume <span class="optional-text">(opțional)</span>
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="form-input"
          :class="{ 'error': errors.name }"
          placeholder="Cum vrei să te numim?"
          autocomplete="given-name"
          :aria-describedby="errors.name ? 'name-error' : null"
        />
        <p v-if="errors.name" id="name-error" class="error-message" role="alert">
          {{ errors.name }}
        </p>
      </div>

      <!-- Contact Method -->
      <div class="form-group">
        <label for="contact" class="form-label required">
          Telefon sau Email
        </label>
        <input
          id="contact"
          v-model="form.contact"
          type="text"
          class="form-input"
          :class="{ 'error': errors.contact }"
          placeholder="Numărul tău de telefon sau adresa de email"
          autocomplete="tel email"
          required
          :aria-describedby="errors.contact ? 'contact-error' : 'contact-help'"
        />
        <p id="contact-help" class="help-text">
          Vom folosi aceste informații doar pentru a te contacta în privat.
        </p>
        <p v-if="errors.contact" id="contact-error" class="error-message" role="alert">
          {{ errors.contact }}
        </p>
      </div>

      <!-- Message Field -->
      <div class="form-group">
        <label for="message" class="form-label">
          Mesajul tău <span class="optional-text">(opțional)</span>
        </label>
        <textarea
          id="message"
          v-model="form.message"
          class="form-textarea"
          :class="{ 'error': errors.message }"
          placeholder="Poți să ne spui pe scurt cum te simți sau ce tip de ajutor cauți. Suntem aici să te ascultăm cu dragoste și să ne rugăm pentru tine. Nu ești obligat să împărtășești detalii dacă nu te simți confortabil."
          rows="4"
          :aria-describedby="errors.message ? 'message-error' : 'message-help'"
        ></textarea>
        <p id="message-help" class="help-text">
          Orice informație pe care o împărtășești rămâne confidențială. Ne vom ruga pentru tine și situația ta.
        </p>
        <p v-if="errors.message" id="message-error" class="error-message" role="alert">
          {{ errors.message }}
        </p>
      </div>


      <!-- Privacy Notice -->
      <div class="privacy-notice">
        <p class="privacy-text">
          <strong>Confidențialitate garantată:</strong> Informațiile tale sunt protejate și nu vor fi
          împărtășite cu nimeni în afara echipei noastre de consiliere creștină. Poți să ne contactezi în
          siguranță și fără teamă de judecată. Dumnezeu te iubește necondiționat.
        </p>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="submit-button"
        :disabled="isSubmitting"
        :aria-describedby="submitStatus ? 'submit-status' : null"
      >
        <span v-if="!isSubmitting" class="button-text">
          Trimite mesajul
        </span>
        <span v-else class="button-text">
          Se trimite...
        </span>
      </button>

      <!-- Submit Status -->
      <div v-if="submitStatus" id="submit-status" class="submit-status" :class="submitStatus.type" role="alert">
        <p>{{ submitStatus.message }}</p>
      </div>
    </form>

    <!-- Alternative Contact Methods -->
    <div class="alternative-contact">
      <h4 class="alt-title">Alte modalități de contact și rugăciune:</h4>
      <div class="contact-methods">
        <a href="tel:+40123456789" class="contact-method">
          <div class="contact-icon">
            <PhoneIcon />
          </div>
          <span class="contact-text">Sună pentru consiliere și rugăciune: +40 123 456 789</span>
        </a>
        <a href="mailto:ajutor@lighthousechurch.ro" class="contact-method">
          <div class="contact-icon">
            <EnvelopeIcon />
          </div>
          <span class="contact-text">Email pentru sprijin creștin: ajutor@lighthousechurch.ro</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import emailService from '../services/emailService.js'

export default {
  name: 'ContactForm',
  components: {
    PhoneIcon,
    EnvelopeIcon
  },
  data() {
    return {
      form: {
        name: '',
        contact: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      submitStatus: null
    }
  },
  mounted() {
    // Initialize email service
    this.initializeEmailService()
  },
  methods: {
    async initializeEmailService() {
      try {
        await emailService.initialize()
        console.log('Email service ready')
      } catch (error) {
        console.error('Email service initialization failed:', error)
      }
    },

    validateForm() {
      this.errors = {}

      // Validate contact field (required)
      if (!this.form.contact.trim()) {
        this.errors.contact = 'Te rugăm să ne lași un număr de telefon sau o adresă de email.'
      } else {
        // Basic validation for email or phone
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/

        if (!emailRegex.test(this.form.contact) && !phoneRegex.test(this.form.contact)) {
          this.errors.contact = 'Te rugăm să introduci o adresă de email validă sau un număr de telefon.'
        }
      }

      // Validate name if provided (basic length check)
      if (this.form.name && this.form.name.length > 100) {
        this.errors.name = 'Numele este prea lung.'
      }

      // Validate message if provided (basic length check)
      if (this.form.message && this.form.message.length > 1000) {
        this.errors.message = 'Mesajul este prea lung. Te rugăm să îl scurtezi.'
      }



      return Object.keys(this.errors).length === 0
    },
    
    async handleSubmit() {
      if (!this.validateForm()) {
        // Focus on first error field
        const firstErrorField = Object.keys(this.errors)[0]
        if (firstErrorField !== 'general') {
          const element = this.$el.querySelector(`#${firstErrorField}`)
          if (element) {
            element.focus()
          }
        }
        return
      }

      this.isSubmitting = true
      this.submitStatus = null

      try {
        // Prepare form data for email service
        const formData = {
          name: this.form.name.trim(),
          contact: this.form.contact.trim(),
          message: this.form.message.trim()
        }

        // Send email using EmailJS
        const result = await emailService.sendContactEmail(formData)

        if (result.success) {
          this.submitStatus = {
            type: 'success',
            message: 'Mulțumim! Mesajul tău a fost trimis cu succes. Te vom contacta în cel mai scurt timp. Dumnezeu are un plan minunat pentru viața ta.'
          }

          // Reset form after successful submission
          this.resetForm()
        } else {
          throw new Error(result.error || 'Email sending failed')
        }

      } catch (error) {
        console.error('Form submission error:', error)

        this.submitStatus = {
          type: 'error',
          message: 'A apărut o problemă la trimiterea mesajului. Te rugăm să încerci din nou sau să ne contactezi direct la telefon.'
        }
      } finally {
        this.isSubmitting = false
      }
    },
    
    resetForm() {
      this.form = {
        name: '',
        contact: '',
        message: ''
      }
      this.errors = {}
    },

    // Test email service (for development)
    async testEmailService() {
      try {
        const result = await emailService.testConfiguration()
        console.log('Email service test:', result)
        return result
      } catch (error) {
        console.error('Email service test failed:', error)
        return { success: false, error: error.message }
      }
    }
  }
}
</script>

<style scoped>
/* Contact Form Styles */
.contact-form-wrapper {
  background: var(--pure-white);
  border-radius: var(--radius-3xl);
  padding: var(--space-12);
  box-shadow: 0 25px 80px rgba(139, 69, 19, 0.15);
  max-width: 100%;
  border: 2px solid var(--medium-beige);
  position: relative;
  overflow: hidden;
}

.contact-form-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--gold) 0%, var(--deep-gold) 50%, var(--gold) 100%);
}

.contact-form-wrapper::after {
  content: '';
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(218, 165, 32, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.form-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.form-title {
  font-size: var(--font-size-3xl);
  font-weight: 600;
  color: var(--primary-brown);
  margin-bottom: var(--space-4);
  font-family: var(--font-family-display);
  text-align: center;
  position: relative;
}

.form-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--gold);
  border-radius: 2px;
}

.form-subtitle {
  font-size: var(--font-size-lg);
  color: var(--warm-gray);
  line-height: 1.6;
  font-weight: 400;
  text-align: center;
}

/* Form Groups */
.form-group {
  margin-bottom: var(--space-8);
  position: relative;
}

.form-label {
  display: block;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--primary-brown);
  margin-bottom: var(--space-3);
  font-family: var(--font-family-display);
}

.form-label.required::after {
  content: ' *';
  color: var(--warning-orange);
}

.optional-text {
  font-weight: 400;
  color: var(--text-light);
  font-size: var(--font-size-xs);
}

/* Form Inputs */
.form-input,
.form-textarea {
  width: 100%;
  padding: var(--space-4) var(--space-5);
  border: 3px solid var(--medium-beige);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-base);
  font-family: inherit;
  transition: all 0.3s ease;
  background: var(--pure-white);
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
  position: relative;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--warm-gray);
  font-weight: 400;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 4px rgba(218, 165, 32, 0.15), 0 4px 12px rgba(139, 69, 19, 0.12);
  background: var(--pure-white);
  transform: translateY(-2px);
}

.form-input:hover:not(:focus),
.form-textarea:hover:not(:focus) {
  border-color: var(--golden-brown);
  box-shadow: 0 3px 10px rgba(139, 69, 19, 0.1);
  transform: translateY(-1px);
}

.form-input.error,
.form-textarea.error {
  border-color: var(--error);
  box-shadow: 0 0 0 4px rgba(205, 92, 92, 0.15);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Checkbox */
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--soft-cream);
  border-radius: var(--radius-xl);
  border: 2px solid var(--medium-beige);
  transition: all 0.3s ease;
}

.checkbox-wrapper:hover {
  background: var(--pure-white);
  border-color: var(--golden-brown);
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
}

.form-checkbox {
  width: 20px;
  height: 20px;
  margin-top: 2px;
  accent-color: var(--gold);
  cursor: pointer;
}

.checkbox-label {
  font-size: var(--font-size-base);
  color: var(--charcoal);
  line-height: 1.5;
  cursor: pointer;
  font-weight: 500;
}

/* Help and Error Messages */
.help-text {
  font-size: var(--font-size-xs);
  color: var(--text-light);
  margin-top: var(--space-1);
  line-height: 1.4;
}

.error-message {
  font-size: var(--font-size-xs);
  color: #EF4444;
  margin-top: var(--space-1);
  line-height: 1.4;
}

/* Privacy Notice */
.privacy-notice {
  background: var(--light-blue);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-6);
  border-left: 4px solid var(--primary-blue);
}

.privacy-text {
  font-size: var(--font-size-sm);
  color: var(--text-dark);
  line-height: 1.5;
  margin: 0;
}

/* Submit Button */
.submit-button {
  width: 100%;
  background: linear-gradient(135deg, var(--gold) 0%, var(--deep-gold) 100%);
  color: var(--pure-white);
  border: none;
  border-radius: var(--radius-2xl);
  padding: var(--space-5) var(--space-6);
  font-size: var(--font-size-lg);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: var(--space-6);
  box-shadow: 0 8px 25px rgba(218, 165, 32, 0.4);
  position: relative;
  overflow: hidden;
  font-family: var(--font-family-display);
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(218, 165, 32, 0.5);
  background: linear-gradient(135deg, var(--deep-gold) 0%, var(--gold) 100%);
}

.submit-button:hover:not(:disabled)::before {
  left: 100%;
}

.submit-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.submit-button:disabled {
  background: var(--warm-gray);
  cursor: not-allowed;
  transform: none;
  box-shadow: var(--shadow-sm);
}

.button-text {
  display: inline-block;
}

/* Submit Status */
.submit-status {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
}

.submit-status.success {
  background: #D1FAE5;
  color: #065F46;
  border: 1px solid #10B981;
}

.submit-status.error {
  background: #FEE2E2;
  color: #991B1B;
  border: 1px solid #EF4444;
}

/* Alternative Contact */
.alternative-contact {
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid #E5E7EB;
}

.alt-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: var(--space-4);
  text-align: center;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: var(--light-gray);
  border-radius: var(--radius-xl);
  text-decoration: none;
  color: var(--charcoal);
  transition: all 0.3s ease;
  border: 2px solid var(--medium-gray);
  box-shadow: var(--shadow-sm);
  width: 100%;
  min-width: 0;
}

.contact-method:hover,
.contact-method:focus {
  background: var(--pure-white);
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-purple);
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--accent-gradient);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.contact-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

.contact-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  flex: 1;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
  white-space: normal;
}

/* Responsive Design */
@media (min-width: 768px) {
  .contact-methods {
    flex-direction: column;
    gap: var(--space-4);
  }

  .contact-method {
    width: 100%;
    max-width: none;
  }
}

@media (min-width: 1024px) {
  .contact-methods {
    flex-direction: row;
    justify-content: center;
    gap: var(--space-4);
  }

  .contact-method {
    flex: 1;
    max-width: 400px;
    min-width: 300px;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .form-input,
  .form-textarea {
    border-width: 3px;
  }
  
  .submit-button {
    border: 2px solid var(--text-dark);
  }
}
</style>
