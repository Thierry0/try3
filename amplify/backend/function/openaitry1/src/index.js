/* eslint-disable no-console */
const { inspect } = require('node:util')
const axios = require('axios')

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Give me a theoretical question that can show up on exam PA offered by the Society of Actuaries.' }],
    temperature: 0.7,
  }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  }
  const url = 'https://api.openai.com/v1/chat/completions'
  const response = await axios.post(url, data, { headers })
  console.log(`EVENT: ${JSON.stringify(event)}`)
  console.log(`RESPONSE: ${inspect(response.data, { depth: 5, colors: false })}`)
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify('Hello from Lambda!'),
  }
}
