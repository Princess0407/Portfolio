import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    const message = data.get('message')?.toString();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    // You need to set these in your .env file
    // Example:
    // SMTP_HOST=smtp.gmail.com
    // SMTP_PORT=465
    // SMTP_USER=your-email@gmail.com
    // SMTP_PASS=your-app-password
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST || 'smtp.gmail.com',
      port: import.meta.env.SMTP_PORT ? parseInt(import.meta.env.SMTP_PORT) : 465,
      secure: true,
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${import.meta.env.SMTP_USER}>`,
      replyTo: email,
      to: import.meta.env.SMTP_USER, // Sends the email to yourself
      subject: `New Portfolio Message from ${name}`,
      text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
};
