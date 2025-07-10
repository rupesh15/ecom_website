const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

module.exports = router;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

router.route('/')
.get(async (req, res) => {
    try {
        const result = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'what are the different types of role present in message' }]
        });
    
        res.json(result.choices[0].message);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error generating completion');
      }
})

exports.module = router;
