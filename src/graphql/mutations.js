/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTopicProgress = /* GraphQL */ `
  mutation CreateTopicProgress(
    $input: CreateTopicProgressInput!
    $condition: ModelTopicProgressConditionInput
  ) {
    createTopicProgress(input: $input, condition: $condition) {
      id
      topic
      practicedCount
      lastPracticed
      correctAnswers
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateTopicProgress = /* GraphQL */ `
  mutation UpdateTopicProgress(
    $input: UpdateTopicProgressInput!
    $condition: ModelTopicProgressConditionInput
  ) {
    updateTopicProgress(input: $input, condition: $condition) {
      id
      topic
      practicedCount
      lastPracticed
      correctAnswers
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTopicProgress = /* GraphQL */ `
  mutation DeleteTopicProgress(
    $input: DeleteTopicProgressInput!
    $condition: ModelTopicProgressConditionInput
  ) {
    deleteTopicProgress(input: $input, condition: $condition) {
      id
      topic
      practicedCount
      lastPracticed
      correctAnswers
      createdAt
      updatedAt
      owner
    }
  }
`;
