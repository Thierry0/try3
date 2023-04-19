<template>
  <div class="exam-pa">
    <h2>Exam PA Dashboard</h2>
    <button @click="getQuestion">Get Question</button>
    <div v-if="question">
      <p>{{ question }}</p>
      <textarea v-model="answer" placeholder="Write your answer here..."></textarea>
      <button @click="submitAnswer">Submit Answer</button>
    </div>
    <div v-if="feedback">
      <h3>Feedback</h3>
      <p>{{ feedback }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const subtopics = [
'Problem definition in predictive modeling',
'Data collection: Relevance, Sampling, and Granularity',
// more but they are all on aws now
];

export default {
  data() {
    return {
      question: '',
      answer: '',
      feedback: '',
    };
  },
  methods: {
    getRandomTopic() {
      return subtopics[Math.floor(Math.random() * subtopics.length)];
    },
    async getQuestion() {
      const topic = this.getRandomTopic();
      const prompt = `In 100 words or less give me a ${topic} question that can show up on exam PA offered by the Society of Actuaries.`;
      
      const response = await this.sendRequestToOpenAI(prompt);
      console.log(response)
      this.question = response.choices[0].message.content;
    },
    async submitAnswer() {
      const prompt = `I'm preparing for the Society of actuaries Exam PA and need your help. Please evaluate my knowledge concisely (within 140 words) by providing feedback on my answers. Use a credit range (none-small, small-significant, significant-full) followed by an explanation for correctness.”.
My answer: ${this.answer}`;

      const response = await this.sendRequestToOpenAI(prompt);
      this.feedback = response.choices[0].message.content;
    },
    async sendRequestToOpenAI(prompt) {
      const API_KEY = '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';
      const url = 'https://api.openai.com/v1/chat/completions';

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY,
      };

      const data = {
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
      };

      try {
        const response = await axios.post(url, data, { headers });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.exam-pa {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

textarea {
  width: 100%;
  min-height: 150px;
  margin-bottom: 1rem;
}
</style>
