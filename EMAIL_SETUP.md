# 📧 EmailJS Setup Guide for Lighthouse Church

This guide will help you set up the secure EmailJS integration for the Lighthouse Church contact form.

## 🎯 Overview

The contact form uses EmailJS with multiple layers of security:
- ✅ **Multi-part API key obfuscation**
- ✅ **Runtime key assembly**
- ✅ **Bot detection with honeypots**
- ✅ **Rate limiting**
- ✅ **Request validation**
- ✅ **Professional email templates**

## 🚀 Quick Setup

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up with **herdean12@yahoo.com**
3. Verify your email address

### Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail**
4. Connect your **herdean12@yahoo.com** account
5. **Save the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates

#### Template 1: Standard Contact
- **Template ID**: `template_standard_contact`
- **Subject**: `Nouă cerere de contact - Lighthouse Church`
- **To Email**: `herdean12@yahoo.com`
- **From Name**: `{{name}} via Lighthouse Church`
- **HTML Content**: Copy from `src/services/emailTemplates.js` → `standardContact.html`

#### Template 2: Auto Reply
- **Template ID**: `template_auto_reply`
- **Subject**: `Am primit mesajul tău - Lighthouse Church`
- **To Email**: `{{to_email}}`
- **From Name**: `Lighthouse Church`
- **HTML Content**: Copy from `src/services/emailTemplates.js` → `autoReply.html`

### Step 4: Get API Keys

1. In EmailJS dashboard, go to **Account** → **API Keys**
2. **Copy the Public Key** (e.g., `user_abc123xyz`)

### Step 5: Generate Environment Variables

1. Open your browser console on the website
2. Run this command with your actual credentials:

```javascript
emailSetupHelper.generateEnvironmentVariables({
  serviceId: 'service_abc123',           // Your EmailJS Service ID
  publicKey: 'user_abc123xyz',           // Your EmailJS Public Key
  templateStandard: 'template_standard_contact',
  templateAutoReply: 'template_auto_reply'
})
```

3. **Copy the generated environment variables**

### Step 6: Add to Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site Settings** → **Environment Variables**
3. Add each variable from Step 5:

```bash
VITE_EMAIL_SERVICE_PART1=generated_value_1
VITE_EMAIL_SERVICE_PART2=generated_value_2
VITE_EMAIL_SERVICE_PART3=generated_value_3
VITE_EMAIL_TEMPLATE_STANDARD=generated_value_4
VITE_EMAIL_TEMPLATE_URGENT=generated_value_5
VITE_EMAIL_TEMPLATE_AUTOREPLY=generated_value_6
VITE_EMAIL_PUBLIC_HASH=generated_value_7
VITE_EMAIL_KEY_SALT=generated_value_8
VITE_EMAIL_PUBLIC_SALT=lighthouse_church_2024
```

### Step 7: Deploy and Test

1. **Deploy your site** to Netlify
2. **Test the configuration** in browser console:

```javascript
emailSetupHelper.testCurrentConfiguration()
```

3. **Submit a test form** on your website
4. **Check herdean12@yahoo.com** for the email

## 🔐 Security Features

### API Key Protection
- **Split Keys**: Service ID split into 3 parts
- **Obfuscation**: Base64 + salt encoding
- **Runtime Assembly**: Keys reconstructed dynamically
- **Decoy Operations**: Fake API calls to confuse scrapers

### Bot Protection
- **Honeypot Fields**: Hidden fields detect bots
- **Rate Limiting**: Max 3 submissions per hour
- **Timestamp Validation**: Prevents replay attacks
- **Browser Fingerprinting**: Additional validation

### Email Security
- **Professional Templates**: Church-appropriate formatting
- **Auto-Reply**: Confirmation emails to users
- **Urgency Handling**: Special treatment for urgent requests
- **Delivery Confirmation**: Success/error handling

## 📧 Email Templates

### Standard Contact Email
```
Subject: Nouă cerere de contact - Lighthouse Church

Dear Pastor,

A new contact has been submitted:
- Name: [Name or "Not provided"]
- Contact: [Email/Phone]
- Message: [User message]
- Priority: [Standard/URGENT]
- Time: [Romanian timestamp]

[If urgent: Special urgent notice]

Please respond with care and compassion.

Blessings,
Lighthouse Church Website System
```

### Auto-Reply Email
```
Subject: Am primit mesajul tău - Lighthouse Church

Dear [Name],

Thank you for contacting us. Someone from our pastoral team 
will respond within 24 hours.

[If urgent: Emergency notice with 112 reference]

You are loved and not alone in this journey.

Bible verse: Matthew 11:28

With love and prayers,
Lighthouse Church Team
```

## 🧪 Testing

### Test Email Service
```javascript
// In browser console
emailSetupHelper.testCurrentConfiguration()
```

### Test Form Submission
1. Fill out the contact form
2. Check browser console for logs
3. Verify email delivery to herdean12@yahoo.com
4. Test both standard and urgent submissions

### Verify Security
```javascript
// Check rate limiting
// Submit form 4 times quickly - should block 4th attempt

// Check honeypot detection
// Manually fill honeypot fields - should block submission
```

## 🚨 Troubleshooting

### Common Issues

**"Service configuration incomplete"**
- Check all environment variables are set
- Verify variable names match exactly
- Redeploy after adding variables

**"Email sending failed"**
- Check EmailJS service is connected
- Verify template IDs match
- Check browser console for detailed errors

**"Rate limit exceeded"**
- Wait 1 hour or clear localStorage
- Normal behavior for security

**"Bot detection triggered"**
- Check honeypot fields aren't visible
- Verify form submission timing

### Debug Commands

```javascript
// Check service status
emailService.getStatus()

// View security utils
securityUtils.generateBrowserFingerprint()

// Test key reconstruction
securityUtils.reconstructServiceId()
```

## 📞 Support

For technical issues:
1. Check browser console for errors
2. Verify all environment variables
3. Test EmailJS dashboard directly
4. Contact EmailJS support if needed

## 🎯 Success Criteria

✅ **Form submits successfully**  
✅ **Email arrives at herdean12@yahoo.com**  
✅ **Auto-reply sent to user (if email provided)**  
✅ **Urgent submissions marked clearly**  
✅ **Bot protection working**  
✅ **Rate limiting functional**  
✅ **Professional email formatting**  

Your Lighthouse Church contact form is now secure, professional, and ready to help teenagers in crisis! 🙏
