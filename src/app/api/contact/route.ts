import sendEmail from "@/service/email";

export async function POST(req: Request) {
  const { subject, message } = await req.json();
  return sendEmail({ subject, message }).then(
    () =>
      new Response(JSON.stringify({ message: "메일을 성공적으로 보냈음" }), {
        status: 200,
      })
  );
}
