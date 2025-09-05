const OpenAI = require('openai');

// Initialize OpenAI client with Fireworks AI
const client = new OpenAI({
    baseURL: "https://api.fireworks.ai/inference/v1",
    apiKey: process.env.FIREWORKS_API_KEY,
});

/**
 * Get AI response from the chat completion API
 * @param {Array} messages - Array of message objects with role and content
 * @returns {Promise<string>} AI response content
 */
async function getAIResponse(messages) {
    try {
        const completion = await client.chat.completions.create({
            model: "accounts/fireworks/models/deepseek-v3",
            messages,
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error getting AI response:", error);
        return "Sorry, I'm having trouble thinking right now. Try again in a bit!";
    }
}

/**
 * Generate a chat title based on the first message
 * @param {string} firstMessage - The first message in the conversation
 * @returns {Promise<string>} Generated title
 */
async function getChatTitle(firstMessage) {
    try {
        const completion = await client.chat.completions.create({
            model: "accounts/fireworks/models/deepseek-v3",
            messages: [
                {
                    role: "system",
                    content: `You're a witty chat titler. Your job is to generate a short, punchy, creative title (max 6 words, no punctuation, no quotes) based ONLY on the user's first message. Make it a lil fun, a lil smart, but not cringe.`
                },
                {
                    role: "user",
                    content: firstMessage
                }
            ]
        });
        return completion.choices[0].message.content?.trim() || "Untitled";
    } catch (error) {
        console.error("Error generating chat title:", error);
        return "Untitled";
    }
}

/**
 * Generate context summary from conversation messages
 * @param {Array} messages - Array of message objects
 * @returns {Promise<string>} Context summary
 */
async function generateContext(messages) {
    try {
        const lastTenMessages = messages.slice(-10);
        const completion = await client.chat.completions.create({
            model: "accounts/fireworks/models/deepseek-v3",
            messages: [
                {
                    role: "system",
                    content: "You are a context analyzer. Your job is to summarize the key points and themes from the conversation so far in 2-3 concise sentences. Focus on the main topics and any important details that would help continue the conversation naturally."
                },
                ...lastTenMessages,
                {
                    role: "user", 
                    content: "Please summarize our conversation so far."
                }
            ]
        });
        return completion.choices[0].message.content || "No context available.";
    } catch (error) {
        console.error("Error generating context:", error);
        return "Unable to generate context.";
    }
}

module.exports = {
    getAIResponse,
    getChatTitle,
    generateContext
};