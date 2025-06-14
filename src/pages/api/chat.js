export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key missing" });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // free model
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.choices?.[0]?.message?.content || "No response";
    res.status(200).json({ result: text });
  } catch (err) {
    console.error("OpenRouter error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
}
