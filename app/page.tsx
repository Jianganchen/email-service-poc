"use client";

export default function HomePage() {
  const sendEmail = async () => {
    const res = await fetch("/api/send", {
      method: "POST",
    });

    const data = await res.json();
    console.log("Email response:", data);

    if (!res.ok) {
      alert("Failed to send email");
      return;
    }

    alert("Email sent! Check your inbox 👀");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Resend Email Test</h1>
      <button
        onClick={sendEmail}
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        Send Test Email
      </button>
    </main>
  );
}
