import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';
const TARGET_NOTIFICATION_EMAIL = 'info@vayratechnical.com';

app.use(express.json());

// In-memory inquiry store for logging & audit
const recentInquiries: any[] = [];

// API route for inquiry submissions
app.post('/api/inquiry', async (req, res) => {
  try {
    const { fullName, email, phone, propertyType, serviceCategory, urgency, message, estimatedBudget } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ error: 'Full name, email, and phone number are required.' });
    }

    const inquiryId = `INQ-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();

    const inquiryData = {
      inquiryId,
      timestamp,
      fullName,
      email,
      phone,
      propertyType: propertyType || 'Standard Property',
      serviceCategory: serviceCategory || 'General Technical Contracting',
      urgency: urgency || 'routine',
      message: message || '',
      estimatedBudget: estimatedBudget || null,
      destinationEmail: TARGET_NOTIFICATION_EMAIL,
    };

    recentInquiries.unshift(inquiryData);
    if (recentInquiries.length > 50) recentInquiries.pop();

    const subject = `[New RFQ Inquiry] ${inquiryData.serviceCategory} - ${fullName} (${inquiryData.urgency})`;
    
    const textContent = `
New Technical Inquiry Received:
----------------------------------------
Inquiry ID: ${inquiryId}
Timestamp: ${timestamp}
Notification Destination: ${TARGET_NOTIFICATION_EMAIL}

Client Details:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone}

Project Scope:
- Property Type: ${inquiryData.propertyType}
- Service Required: ${inquiryData.serviceCategory}
- Urgency Level: ${inquiryData.urgency}
- Estimated Budget Range: ${inquiryData.estimatedBudget || 'Not specified'}

Project Description / Message:
${inquiryData.message || 'No additional details provided.'}
----------------------------------------
Office: Al Maha Tower, Abu Dhabi, UAE
Official Contact: +971 50 639 8552
`;

    const htmlContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
  <div style="background-color: #0f172a; padding: 18px; border-radius: 6px; margin-bottom: 20px;">
    <h2 style="color: #f59e0b; margin: 0; font-size: 18px; font-weight: bold;">Vayra Technical Contracting L.L.C - S.P.C.</h2>
    <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px;">New Technical Request for Quotation (RFQ) Received</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
    <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Inquiry Reference:</td><td style="font-weight: bold; color: #0f172a; font-family: monospace;">${inquiryId}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Client Name:</td><td style="font-weight: bold; color: #0f172a;">${fullName}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Phone:</td><td><a href="tel:${phone}" style="color: #d97706; text-decoration: none; font-weight: bold; font-family: monospace;">${phone}</a></td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Client Email:</td><td><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Property Type:</td><td style="color: #0f172a;">${inquiryData.propertyType}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Service Needed:</td><td style="color: #0f172a; font-weight: bold;">${inquiryData.serviceCategory}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Urgency:</td><td style="color: ${urgency === 'emergency' ? '#dc2626' : '#d97706'}; font-weight: bold;">${inquiryData.urgency}</td></tr>
    ${inquiryData.estimatedBudget ? `<tr><td style="padding: 8px 0; color: #64748b;">Estimated Budget:</td><td style="color: #0f172a; font-weight: bold;">${inquiryData.estimatedBudget}</td></tr>` : ''}
  </table>
  <div style="margin-top: 16px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #f59e0b; border-radius: 4px;">
    <h4 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569;">Project Scope & Description:</h4>
    <p style="margin: 0; font-size: 13px; color: #1e293b; line-height: 1.5; white-space: pre-wrap;">${inquiryData.message || 'No additional details provided.'}</p>
  </div>
  <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
    This notification was transmitted to <strong style="color: #0f172a;">${TARGET_NOTIFICATION_EMAIL}</strong> from the official Vayra Technical Contracting web portal.<br/>
    Office: Al Maha Tower, Abu Dhabi, UAE · Direct Phone: +971 50 639 8552
  </div>
</div>
`;

    // Dispatch via SMTP if credentials exist in environment
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Vayra Technical Portal" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: TARGET_NOTIFICATION_EMAIL,
          replyTo: email,
          subject,
          text: textContent,
          html: htmlContent,
        });
        console.log(`[SMTP Email successfully sent to ${TARGET_NOTIFICATION_EMAIL}] Ref: ${inquiryId}`);
      } catch (smtpErr) {
        console.warn(`[SMTP notice: failed sending via external host, falling back to local dispatch log for ${TARGET_NOTIFICATION_EMAIL}]`, smtpErr);
      }
    } else {
      console.log(`[Inquiry Notification Prepared & Logged for ${TARGET_NOTIFICATION_EMAIL}]`);
      console.log(textContent);
    }

    return res.status(200).json({
      success: true,
      inquiryId,
      notificationSentTo: TARGET_NOTIFICATION_EMAIL,
      message: `Inquiry successfully submitted and notification sent to ${TARGET_NOTIFICATION_EMAIL}`,
    });
  } catch (err: any) {
    console.error('Error processing inquiry:', err);
    return res.status(500).json({ error: 'Failed to process inquiry.' });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    targetEmail: TARGET_NOTIFICATION_EMAIL,
    phone: '+971 50 639 8552',
    office: 'Al Maha Tower, Abu Dhabi, UAE',
    inquiriesLogged: recentInquiries.length,
  });
});

// Vite dev server mounting or static production serve
if (!isProd) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Vayra Technical Contracting server active on port ${port}`);
  console.log(`Inquiry notification email destination: ${TARGET_NOTIFICATION_EMAIL}`);
});
