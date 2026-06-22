import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, results } = await request.json();

    if (!email || !results?.length) {
      return Response.json(
        { error: "Missing email or results" },
        { status: 400 }
      );
    }

    const html = `
      <h1>Your Zulario Travel Matches</h1>
      ${results
        .map(
          (r) => `
          <div style="margin-bottom:24px;">
            <h2>${r.percentage}% match — ${r.city}, ${r.country}</h2>
            <p>${r.emotional_hook || ""}</p>
          </div>
        `
        )
        .join("")}
    `;

    const data = await resend.emails.send({
      from: "Zulario <onboarding@resend.dev>",
      to: email,
      subject: "Your Zulario Travel Matches",
      html,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Send results email error:", error);

    return Response.json(
      { error: error.message || "Email failed" },
      { status: 500 }
    );
  }
}