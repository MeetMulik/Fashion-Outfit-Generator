const openai = require('../config/openaiConfig');

const generateMeta = async (req, res) => {
    const { title } = req.body

    const description = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: 'user',
                content: `act as Conversational Fashion Outfit generator for ${title}`
            }
        ],
        max_tokens: 100
    })

    console.log(description.data.choices[0].message)

    res.status(200).json({
        description: description.data.choices[0].message,
    })
}

module.exports = { generateMeta };