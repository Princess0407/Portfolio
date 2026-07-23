import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    let name, email, message;
    try {
      const data = await request.json();
      name = data.name;
      email = data.email;
      message = data.message;
    } catch (parseError) {
      console.error("Parse error:", parseError);
      return new Response(JSON.stringify({ error: "Invalid JSON payload", details: parseError.message }), { status: 400 });
    }
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "465" ? parseInt("465") : 465,
      secure: true,
      auth: {
        user: "priyankatiwari140419@gmail.com",
        pass: "lpzehfyecvqtlhmu"
      }
    });
    await transporter.sendMail({
      from: `"${name}" <${"priyankatiwari140419@gmail.com"}>`,
      replyTo: email,
      to: "priyankatiwari140419@gmail.com",
      // Sends the email to yourself
      subject: `New Portfolio Message from ${name}`,
      text: `You received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}

Message:
${message}`
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email", details: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
