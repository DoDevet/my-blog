export interface IFormEmail {
  subject: string;
  message: string;
}
export async function sendContextMail(formData: IFormEmail) {
  const res = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("문제 있음");
  } else return res.json();
}
