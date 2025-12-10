import OpenAI from "https://cdn.jsdelivr.net/npm/openai@4.57.0/dist/openai.browser.mjs";

const client = new OpenAI({
  apiKey: "ВСТАВЬ_СВОЙ_API_КЛЮЧ",
  dangerouslyAllowBrowser: true
});

async function askGPT(prompt) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "Ошибка: нейросеть недоступна или ключ неверный.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");

  btn.addEventListener("click", async () => {
    const query = input.value.trim();
    if (!query) return alert("Введите вопрос!");

    const answer = await askGPT(query);

    alert("Ответ GPT:\n\n" + answer);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btn.click();
  });
});

