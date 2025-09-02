<template>
  <main class="landing-page" role="main">
    <!-- Logo Section -->
    <header class="logo-section" role="banner">
      <div class="container">
        <div class="logo-placeholder">
          <div class="logo-container">
            <img src="/logo/logo.svg" alt="Lighthouse Church Logo" class="church-logo" />
          </div>
          <h1 class="logo-text">Lighthouse Church</h1>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <section class="hero-section" role="region" aria-labelledby="main-heading">
      <div class="container">
        <div class="hero-content fade-in">
          <!-- Main Headline -->
          <h2 id="main-heading" class="hero-title">
            Nu ești singur<br>
            <span class="title-emphasis">în această călătorie</span>
          </h2>

          <!-- Empathetic Message -->
          <div class="hero-message">
            <p class="message-primary">
              Știm că viața poate fi copleșitoare și că uneori pare că nu există o ieșire.
              Dar există speranță și există Cineva care te iubește necondiționat.
            </p>

            <p class="message-secondary">
              La Lighthouse Church, oferim un spațiu sigur, fără judecată, unde poți găsi
              sprijin, înțelegere și un nou început prin dragostea lui Hristos.
            </p>
          </div>

          <!-- Value Proposition -->
          <div class="value-proposition">
            <h3 class="value-title">
              <PlusIcon class="cross-icon" />
              Ce oferim prin dragostea lui Hristos:
            </h3>
            <ul class="value-list">
              <li class="value-item">
                <div class="value-icon">
                  <UserGroupIcon />
                </div>
                <span class="value-text">Consiliere creștină confidențială și gratuită</span>
              </li>
              <li class="value-item">
                <div class="value-icon">
                  <HeartIcon />
                </div>
                <span class="value-text">Comunitate de credință, sprijin și înțelegere</span>
              </li>
              <li class="value-item">
                <div class="value-icon">
                  <SparklesIcon />
                </div>
                <span class="value-text">Programe de recuperare bazate pe speranța în Isus</span>
              </li>
              <li class="value-item">
                <div class="value-icon">
                  <PhoneIcon />
                </div>
                <span class="value-text">Rugăciune și sprijin 24/7 pentru situații de urgență</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-section" role="region" aria-labelledby="contact-heading">
      <div class="container">
        <ContactForm />
      </div>
    </section>

    <!-- Privacy and Trust Section -->
    <section class="trust-section" role="region" aria-labelledby="privacy-heading">
      <div class="container">
        <div class="trust-content">
          <h3 id="privacy-heading" class="trust-title">Confidențialitatea ta este prioritatea noastră</h3>
          <p class="trust-message">
            Toate conversațiile și informațiile pe care le împărtășești cu noi rămân
            strict confidențiale. Nu judecăm, doar oferim sprijin și înțelegere,
            așa cum ne-a învățat Isus să facem.
          </p>

          <div class="bible-verse">
            <p class="verse-text">
              "Veniţi la Mine, toţi cei trudiţi şi împovăraţi, şi Eu vă voi da odihnă!"
              <span class="verse-reference">- Matei 11:28</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ContactForm from './ContactForm.vue'
import {
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  PhoneIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'LandingPage',
  components: {
    ContactForm,
    UserGroupIcon,
    HeartIcon,
    SparklesIcon,
    PhoneIcon,
    PlusIcon
  },
  mounted() {
    // Add fade-in animation to elements when page loads
    this.animateElements()
  },
  methods: {
    animateElements() {
      // Simple intersection observer for animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in')
          }
        })
      }, {
        threshold: 0.1
      })

      // Observe all sections for animation
      const sections = this.$el.querySelectorAll('section')
      sections.forEach(section => observer.observe(section))
    }
  }
}
</script>

<style scoped>
/* Landing Page Specific Styles */
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Logo Section */
.logo-section {
  padding: var(--space-8) 0 var(--space-6) 0;
  background: rgba(244, 228, 188, 0.15);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(244, 228, 188, 0.3);
  position: relative;
}

.logo-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(218, 165, 32, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.logo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 220px;
  background: var(--pure-white);
  border-radius: var(--radius-3xl);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  padding: var(--space-5);
  margin: 0 auto;
}

.church-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: translateX(-5px);
}

.logo-text {
  color: var(--pure-white);
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

/* Hero Section */
.hero-section {
  flex: 1;
  padding: var(--space-12) 0;
  display: flex;
  align-items: center;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  text-align: center;
  color: var(--pure-white);
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: var(--space-8);
  color: var(--pure-white);
  font-family: var(--font-family-display);
  letter-spacing: -0.02em;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.title-emphasis {
  font-weight: 400;
  opacity: 0.95;
  font-style: italic;
  font-family: var(--font-family-script);
  color: var(--cream);
}

.hero-message {
  margin-bottom: var(--space-10);
}

.message-primary {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-5);
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.message-secondary {
  font-size: var(--font-size-lg);
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Value Proposition */
.value-proposition {
  background: var(--pure-white);
  border-radius: var(--radius-3xl);
  padding: var(--space-10);
  border: 2px solid var(--medium-beige);
  box-shadow: 0 20px 60px rgba(139, 69, 19, 0.15);
  position: relative;
  overflow: hidden;
}

.value-proposition::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(244, 228, 188, 0.1) 0%, rgba(230, 211, 163, 0.05) 100%);
  pointer-events: none;
}

.value-proposition::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(218, 165, 32, 0.03) 0%, transparent 70%);
  pointer-events: none;
}

.value-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  margin-bottom: var(--space-6);
  text-align: center;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  color: var(--primary-brown);
  font-family: var(--font-family-display);
}

.cross-icon {
  width: 28px;
  height: 28px;
  color: var(--gold);
  opacity: 0.9;
  transform: rotate(45deg);
  filter: drop-shadow(0 2px 4px rgba(218, 165, 32, 0.3));
}

.value-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  position: relative;
  z-index: 1;
}

.value-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  text-align: left;
  padding: var(--space-5);
  background: var(--soft-cream);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--medium-beige);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.value-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent-gradient);
}

.value-item:hover {
  background: var(--pure-white);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(139, 69, 19, 0.15);
  border-color: var(--gold);
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--gold) 0%, var(--deep-gold) 100%);
  border-radius: var(--radius-xl);
  flex-shrink: 0;
  box-shadow: 0 6px 20px rgba(218, 165, 32, 0.3);
}

.value-icon svg {
  width: 28px;
  height: 28px;
  color: white;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.value-text {
  font-size: var(--font-size-base);
  line-height: 1.6;
  font-weight: 500;
  margin-top: var(--space-2);
  color: var(--charcoal);
}

/* Contact Section */
.contact-section {
  padding: var(--space-8) 0;
  background: rgba(255, 255, 255, 0.05);
}

/* Trust Section */
.trust-section {
  padding: var(--space-6) 0 var(--space-8) 0;
  background: rgba(255, 255, 255, 0.1);
}

.trust-content {
  text-align: center;
  color: var(--warm-white);
}

.trust-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--space-4);
}

.trust-message {
  font-size: var(--font-size-base);
  line-height: 1.6;
  margin-bottom: var(--space-6);
  opacity: 0.9;
}

/* Bible Verse Section */
.bible-verse {
  background: var(--pure-white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  margin-bottom: var(--space-6);
  border: 2px solid var(--gold);
  box-shadow: 0 12px 40px rgba(218, 165, 32, 0.2);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.bible-verse::before {
  content: '"';
  position: absolute;
  top: -15px;
  left: 30px;
  font-size: 5rem;
  color: rgba(218, 165, 32, 0.2);
  font-family: var(--font-family-display);
  line-height: 1;
  font-weight: 700;
}

.bible-verse::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);
}

.verse-text {
  font-size: var(--font-size-xl);
  font-style: italic;
  line-height: 1.6;
  margin: 0;
  color: var(--primary-brown);
  font-family: var(--font-family-display);
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.verse-reference {
  display: block;
  font-size: var(--font-size-base);
  font-style: normal;
  font-weight: 600;
  margin-top: var(--space-4);
  color: var(--warm-gray);
  font-family: var(--font-family);
}



/* Responsive Design */
@media (min-width: 640px) {
  .hero-title {
    font-size: var(--font-size-5xl);
    line-height: 1.1;
  }

  .message-primary {
    font-size: var(--font-size-2xl);
  }

  .message-secondary {
    font-size: var(--font-size-xl);
  }

  .logo-container {
    width: 260px;
    height: 260px;
    padding: var(--space-6);
  }

  .logo-text {
    font-size: var(--font-size-3xl);
  }
}

@media (min-width: 768px) {
  .hero-title {
    font-size: var(--font-size-6xl);
    line-height: 1.05;
  }

  .value-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }

  .value-item {
    padding: var(--space-6);
  }

  .hero-section {
    padding: var(--space-16) 0;
  }

  .value-proposition {
    padding: var(--space-10);
  }

  .logo-container {
    width: 300px;
    height: 300px;
    padding: var(--space-7);
  }
}

@media (min-width: 1024px) {
  .hero-section {
    padding: var(--space-20) 0;
  }

  .value-proposition {
    padding: var(--space-12);
  }

  .container {
    max-width: 42rem;
  }
}

/* Touch targets for mobile */
@media (max-width: 767px) {
  .value-item,
  .contact-method,
  .submit-button {
    min-height: 48px;
  }

  .logo-container {
    width: 180px;
    height: 180px;
    padding: var(--space-4);
  }

  /* Improve touch spacing */
  .value-list {
    gap: var(--space-4);
  }
}

/* Animation classes */
.fade-in {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* High contrast mode adjustments */
@media (prefers-contrast: high) {
  .logo-icon,
  .value-proposition,
  .trust-section,
  .emergency-info {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid var(--warm-white);
  }
}
</style>
