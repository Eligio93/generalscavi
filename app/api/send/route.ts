import { ContactFormSchema } from "@/validation/ContactForm.schema";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();

    // Valida i dati con Zod
    const result = ContactFormSchema.safeParse(body);
    if (!result.success) {
      return Response.json({ error: "Dati non validi" }, { status: 400 });
    }
    const { name, lastName, email, message } = result.data;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: `Nuovo messaggio da ${name} ${lastName}`,
      html: `
        <div>
          <h1>Nuovo messaggio da ${name} ${lastName}</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Messaggio:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
