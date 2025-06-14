import type { Elysia } from "elysia";

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/your-webhook-url";

export function register(app: Elysia) {
  app.onRequest(async ({ request }) => {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("cf-connecting-ip") ||
      "unknown";

    const userAgent = request.headers.get("user-agent") || "unknown";
    const timestamp = new Date().toISOString();

    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🧑‍💻 New visitor\nIP: ${ip}\nUser-Agent: ${userAgent}\nTime: ${timestamp}`,
        }),
      });
    } catch (err) {
      console.error("❌ Failed to log visitor to Discord:", err);
    }
  });
}
