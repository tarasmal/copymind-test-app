type Props = {
  error: string | null | undefined;
};

export default function ErrorMessage({ error }: Props) {
  if (!error) return null;

  let userMessage = 'Сталася помилка. Спробуйте ще раз.';

  try {
    let msg = error;
    if (msg.startsWith('Error: ')) msg = msg.slice(7);
    const parsed = JSON.parse(msg);
    if (typeof parsed === 'object' && parsed.error) {
      userMessage = parsed.error;
    }
  } catch {}

  return <div className="bg-red-100 text-red-700 px-4 py-2 rounded mt-2">{userMessage}</div>;
}
