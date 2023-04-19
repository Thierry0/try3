<template>
    <div class="exam-pa">
        <h2>Exam PA Dashboard</h2>
        <label for="openai-api-key">OpenAI API Key:</label>
        <input id="openai-api-key" type="text" v-model="apiKey" />
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
        <div class="add-topic">
            <label for="new-topic">Add Topic:</label>
            <input id="new-topic" type="text" v-model="newTopic" />
            <button @click="addTopic">Add</button>
        </div>
        <div class="progress-section">
            <h3>Progress</h3>
            <table>
                <thead>
                    <tr>
                        <th>Topic</th>
                        <th>Questions Practiced</th>
                        <th>Correct Answers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="topic in topics" :key="topic.id">
                        <td>{{ topic.topic }}</td>
                        <td>{{ topic.practicedCount }}</td>
                        <td>{{ topic.correctAnswers }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
import { API, graphqlOperation, Hub } from "aws-amplify";
import { listTopicProgresses } from "@/graphql/queries";
import { updateTopicProgress } from "@/graphql/mutations";

export default {
    data() {
        return {
            question: "",
            answer: "",
            feedback: "",
            currentTopic: null,
            topics: [],
            user: null,
            apiKey: "",
            newTopic: "",
        };
    },
    created() {
        Hub.listen("auth", (data) => {
            const { event } = data.payload;
            if (event === "signIn") {
                this.fetchTopics();
            }
        });
    },
    mounted() {
        this.fetchTopics(); // Fetch topics when the component is mounted
    },
    methods: {
        async fetchTopics() {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve) => {
                const listener = async (data) => {
                    if (data.payload.event === 'signIn') {
                        Hub.remove('auth', listener);
                    }

                    try {
                        const response = await API.graphql(graphqlOperation(listTopicProgresses));
                        this.topics = response.data.listTopicProgresses.items;
                        console.log(this.topics);
                        resolve();
                    } catch (error) {
                        console.error('Error fetching topics:', error);
                        resolve();
                    }
                };

                Hub.listen('auth', listener);

                // Fetch topics when the component is mounted
                try {
                    const response = await API.graphql(graphqlOperation(listTopicProgresses));
                    this.topics = response.data.listTopicProgresses.items;
                    console.log(this.topics);
                } catch (error) {
                    console.error('Error fetching topics:', error);
                }
            });
        },

        async getLeastPracticedTopic() {
            if (this.topics.length === 0) {
                throw new Error("No topics found");
            }
            this.topics.sort((a, b) => a.practicedCount - b.practicedCount);
            return this.topics[0].topic;
        },
        async getQuestion() {
            try {
                const topic = await this.getLeastPracticedTopic();
                this.currentTopic = this.topics.find((t) => t.topic === topic);
                const prompt = `I am preparing for exam PA offered by the society of actuaries. To help me prepare for the exam, give me one ${topic} related question that can show up on the exam. You can match it with other topics you know are on the exam to create a more complete question.`;

                const response = await this.sendRequestToOpenAI(prompt, 0.6);
                this.question = response.choices[0].message.content;
            } catch (error) {
                console.error("Error getting question:", error);
            }
        },
        async submitAnswer() {
            const prompt = `I'm preparing for the Society of Actuaries Exam PA and need your help. I have answered the following question: '${this.question}'. Please evaluate my knowledge by providing feedback on my answer and refer to the grading scheme used in past SOA exams to determine the credit I would receive (none, small, significant, full). Please provide an explanation for the correctness of my answer. These answers will be programmatically parsed, can you make sure your feedback contains the following codes based on credit assigned? none or small equals 'IncorrectFOSHO' and significant or full equals 'CorrectDUDE'. Thank you! Here is my answer: ${this.answer}.`;

            const response = await this.sendRequestToOpenAI(prompt, 0.3);
            this.feedback = response.choices[0].message.content;

            await this.updateTopicProgress();
        },
        async updateTopicProgress() {
            const feedback = this.feedback.toLowerCase();
            let isCorrect = false;

            if (feedback.includes("correctdude")) {
                isCorrect = true;
            } else if (feedback.includes("incorrectfosho")) {
                isCorrect = false;
            } else {
                console.warn("Feedback did not contain CorrectFOSHO or IncorrectFOSHO");
                return;
            }

            const updatedTopic = {
                id: this.currentTopic.id,
                topic: this.currentTopic.topic,
                practicedCount: this.currentTopic.practicedCount + 1,
                correctAnswers: isCorrect ? this.currentTopic.correctAnswers + 1 : this.currentTopic.correctAnswers,
            };

            try {
                await API.graphql(graphqlOperation(updateTopicProgress, { input: updatedTopic }));
            } catch (error) {
                console.error('Error updating topic progress:', error);
            }
        },
        async sendRequestToOpenAI(prompt, temperature) {
            if (!this.apiKey) {
                alert("Please enter your OpenAI API Key.");
                return;
            }
            const url = 'https://api.openai.com/v1/chat/completions';

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey,
            };
            const data = {
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
                model: 'gpt-3.5-turbo',
                temperature: temperature,
            };

            try {
                const response = await axios.post(url, data, { headers });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async addTopic() {
            if (this.newTopic === '') return;

            // Add the new topic to the topics array with default values
            this.topics.push({
                id: Date.now(), // Temporary id, replace with the id returned from the API when adding the topic
                topic: this.newTopic,
                practicedCount: 0,
                correctAnswers: 0,
            });

            this.newTopic = '';
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
    height: 500px;
    /* set a fixed height */
    overflow: scroll;
    /* make the content scrollable */
}

textarea {
    width: 100%;
    min-height: 150px;
    margin-bottom: 1rem;
}

.progress-section {
    margin-top: 2rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}

th,
td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

.add-topic {
    margin-top: 1rem;
}
</style>
  
