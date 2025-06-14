const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/your-webhook-url";

export const logVisitor = async (info: {
  ip: string;
  userAgent: string;
  timestamp: string;
}) => {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `🧑‍💻 New visitor\nIP: ${info.ip}\nUser-Agent: ${info.userAgent}\nTime: ${info.timestamp}`,
      }),
    });
  } catch (err) {
    console.error("❌ Failed to log visitor to Discord:", err);
  }
};
