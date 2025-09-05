import { useState } from "react";

export default function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch("/api/contacts/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Ошибка отправки");
      }
      setStatus("Сообщение отправлено!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus(err.message || "Не удалось отправить");
    }
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Связаться с нами</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded border p-2"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full rounded border p-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          className="w-full rounded border p-2"
          placeholder="Сообщение"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button className="rounded bg-black px-4 py-2 text-white">
          Отправить
        </button>
      </form>
      {status && <p className="mt-3 text-sm opacity-80">{status}</p>}
    </div>
  );
}
