const express = require("express");
const { body, validationResult } = require("express-validator");
const OpenAI = require("openai");
const { verifyToken, optionalAuth } = require("../middleware/auth");

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat endpoint
router.post(
  "/",
  optionalAuth,
  [
    body("message")
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage("Message must be between 1 and 1000 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { message } = req.body;
      const user = req.user; // Optional user context

      // System prompt for the chatbot
      const systemPrompt = `You are a helpful assistant for Flying Chicken, a food delivery app similar to Zomato. 

Your role is to help users with:
- Order-related questions and support
- Vendor onboarding and restaurant information
- Menu and food item inquiries
- Delivery and payment issues
- General app navigation and features
- Subscription plans for vendors (Free, Mid ₹500/mo, Premium ₹1000/mo)

Guidelines:
- Be friendly, helpful, and conversational
- Use emojis appropriately to make responses engaging
- Provide accurate information about the app's features
- If you don't know something specific, suggest contacting support
- Keep responses concise but informative
- Use Indian context (₹ for currency, Indian cities, etc.)

Current user context: ${
        user ? `Logged in as ${user.name} (${user.role})` : "Guest user"
      }`;

      // If no OpenAI API key is provided, return a mock response
      if (
        !process.env.OPENAI_API_KEY ||
        process.env.OPENAI_API_KEY === "your-openai-api-key-here"
      ) {
        const mockResponses = [
          "Hi! 👋 I'm here to help you with Flying Chicken. How can I assist you today?",
          "I can help you with orders, vendor information, or general app questions. What would you like to know?",
          "For order support, I can help track your order or resolve any issues. What's your concern?",
          "Are you looking for restaurant recommendations or have questions about our vendor subscription plans?",
          "I'm here to help! Feel free to ask about delivery times, menu items, or app features.",
        ];

        const randomResponse =
          mockResponses[Math.floor(Math.random() * mockResponses.length)];

        return res.json({
          success: true,
          data: {
            message: randomResponse,
            timestamp: new Date().toISOString(),
            isMock: true,
          },
        });
      }

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const response = completion.choices[0].message.content;

      res.json({
        success: true,
        data: {
          message: response,
          timestamp: new Date().toISOString(),
          isMock: false,
        },
      });
    } catch (error) {
      console.error("Chat error:", error);

      // Fallback response in case of API error
      const fallbackResponse =
        "I'm sorry, I'm having trouble responding right now. Please try again later or contact our support team for immediate assistance. 😊";

      res.status(500).json({
        success: false,
        message: "Chat service temporarily unavailable",
        data: {
          message: fallbackResponse,
          timestamp: new Date().toISOString(),
          isFallback: true,
        },
      });
    }
  }
);

// Get chat history (if user is logged in)
router.get("/history", verifyToken, async (req, res) => {
  try {
    // For now, return empty history
    // In a real app, you'd store chat history in the database
    res.json({
      success: true,
      data: {
        messages: [],
        message: "Chat history feature coming soon!",
      },
    });
  } catch (error) {
    console.error("Get chat history error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
      error: error.message,
    });
  }
});

// Health check for chat service
router.get("/health", (req, res) => {
  const hasOpenAIKey = !!(
    process.env.OPENAI_API_KEY &&
    process.env.OPENAI_API_KEY !== "your-openai-api-key-here"
  );

  res.json({
    success: true,
    data: {
      status: "OK",
      openaiConfigured: hasOpenAIKey,
      message: hasOpenAIKey
        ? "Chat service ready"
        : "Using mock responses (OpenAI API key not configured)",
    },
  });
});

module.exports = router;

