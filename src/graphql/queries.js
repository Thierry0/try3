/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTopicProgress = /* GraphQL */ `
  query GetTopicProgress($id: ID!) {
    getTopicProgress(id: $id) {
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
export const listTopicProgresses = /* GraphQL */ `
  query ListTopicProgresses(
    $filter: ModelTopicProgressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopicProgresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        topic
        practicedCount
        lastPracticed
        correctAnswers
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
