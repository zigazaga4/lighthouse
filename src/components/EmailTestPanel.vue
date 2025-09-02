<template>
  <div class="email-test-panel" v-if="showPanel">
    <div class="test-header">
      <h3>🧪 Email Service Test Panel</h3>
      <button @click="showPanel = false" class="close-btn">×</button>
    </div>
    
    <div class="test-content">
      <div class="status-section">
        <h4>Service Status</h4>
        <div class="status-item">
          <span class="label">Initialized:</span>
          <span :class="status.initialized ? 'success' : 'error'">
            {{ status.initialized ? '✅' : '❌' }}
          </span>
        </div>
        <div class="status-item">
          <span class="label">Service ID:</span>
          <span>{{ status.serviceId || 'Not configured' }}</span>
        </div>
        <div class="status-item">
          <span class="label">Templates:</span>
          <span>{{ status.templatesConfigured }}/3</span>
        </div>
      </div>

      <div class="test-actions">
        <h4>Test Actions</h4>
        <button @click="testConfiguration" :disabled="testing" class="test-btn">
          {{ testing ? 'Testing...' : 'Test Configuration' }}
        </button>
        <button @click="testRateLimit" class="test-btn">
          Test Rate Limiting
        </button>
        <button @click="showSetupGuide" class="test-btn">
          Show Setup Guide
        </button>
      </div>

      <div class="test-results" v-if="testResult">
        <h4>Test Results</h4>
        <div :class="['result', testResult.success ? 'success' : 'error']">
          <strong>{{ testResult.success ? 'Success' : 'Error' }}:</strong>
          {{ testResult.message || testResult.error }}
        </div>
        <div v-if="testResult.messageId" class="message-id">
          Message ID: {{ testResult.messageId }}
        </div>
      </div>

      <div class="security-info">
        <h4>Security Info</h4>
        <div class="info-item">
          <span class="label">Rate Limit:</span>
          <span>{{ rateLimitInfo }}</span>
        </div>
        <div class="info-item">
          <span class="label">Session ID:</span>
          <span>{{ sessionId }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Toggle Button -->
  <button 
    v-if="!showPanel && isDevelopment" 
    @click="showPanel = true" 
    class="toggle-btn"
    title="Open Email Test Panel"
  >
    📧
  </button>
</template>

<script>
import emailService from '../services/emailService.js'
import securityUtils from '../utils/securityUtils.js'
import emailSetupHelper from '../utils/emailSetup.js'

export default {
  name: 'EmailTestPanel',
  data() {
    return {
      showPanel: false,
      testing: false,
      testResult: null,
      status: {
        initialized: false,
        serviceId: null,
        templatesConfigured: 0
      },
      rateLimitInfo: 'Unknown',
      sessionId: 'Unknown'
    }
  },
  computed: {
    isDevelopment() {
      return import.meta.env.DEV || import.meta.env.MODE === 'development'
    }
  },
  mounted() {
    this.updateStatus()
    this.updateSecurityInfo()
  },
  methods: {
    async updateStatus() {
      this.status = emailService.getStatus()
    },

    updateSecurityInfo() {
      const rateLimit = securityUtils.checkRateLimit()
      this.rateLimitInfo = rateLimit.allowed ? 'OK' : 'Limited'
      this.sessionId = securityUtils.sessionId.slice(-8)
    },

    async testConfiguration() {
      this.testing = true
      this.testResult = null

      try {
        const result = await emailService.testConfiguration()
        this.testResult = result
        this.updateStatus()
      } catch (error) {
        this.testResult = {
          success: false,
          error: error.message
        }
      } finally {
        this.testing = false
      }
    },

    testRateLimit() {
      const result = securityUtils.checkRateLimit()
      this.testResult = {
        success: result.allowed,
        message: result.allowed ? 'Rate limit OK' : result.message
      }
      this.updateSecurityInfo()
    },

    showSetupGuide() {
      emailSetupHelper.displaySetupGuide()
      console.log('📋 Setup guide displayed in console')
      this.testResult = {
        success: true,
        message: 'Setup guide displayed in browser console'
      }
    }
  }
}
</script>

<style scoped>
.email-test-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 350px;
  background: white;
  border: 2px solid var(--gold);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  z-index: 9999;
  font-family: var(--font-family);
  font-size: 14px;
}

.test-header {
  background: var(--primary-gradient);
  color: white;
  padding: var(--space-4);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.test-header h3 {
  margin: 0;
  font-size: 16px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.test-content {
  padding: var(--space-4);
  max-height: 400px;
  overflow-y: auto;
}

.status-section,
.test-actions,
.test-results,
.security-info {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--medium-beige);
}

.status-section:last-child,
.test-actions:last-child,
.test-results:last-child,
.security-info:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

h4 {
  margin: 0 0 var(--space-2) 0;
  color: var(--primary-brown);
  font-size: 14px;
  font-weight: 600;
}

.status-item,
.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-1);
}

.label {
  font-weight: 500;
  color: var(--warm-gray);
}

.success {
  color: var(--success);
}

.error {
  color: var(--error);
}

.test-btn {
  background: var(--gold);
  color: white;
  border: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 12px;
  margin-right: var(--space-2);
  margin-bottom: var(--space-2);
  transition: all 0.2s ease;
}

.test-btn:hover:not(:disabled) {
  background: var(--deep-gold);
  transform: translateY(-1px);
}

.test-btn:disabled {
  background: var(--warm-gray);
  cursor: not-allowed;
  transform: none;
}

.result {
  padding: var(--space-3);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
}

.result.success {
  background: #D1FAE5;
  color: #065F46;
  border: 1px solid var(--success);
}

.result.error {
  background: #FEE2E2;
  color: #991B1B;
  border: 1px solid var(--error);
}

.message-id {
  font-size: 11px;
  color: var(--warm-gray);
  font-family: monospace;
}

.toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gold);
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  z-index: 9998;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: var(--deep-gold);
  transform: scale(1.1);
}

/* Hide in production */
@media (max-width: 768px) {
  .email-test-panel {
    width: 300px;
    right: 10px;
    top: 10px;
  }
}
</style>
