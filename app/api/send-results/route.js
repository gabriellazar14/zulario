import { Resend } from "resend";

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { email, results } = await request.json();

    // your email sending code here
  } catch (error) {
    return Response.json(
      { error: error.message || "Email failed" },
      { status: 500 }
    );
  }
}