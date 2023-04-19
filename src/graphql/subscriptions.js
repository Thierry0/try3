/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTopicProgress = /* GraphQL */ `
  subscription OnCreateTopicProgress(
    $filter: ModelSubscriptionTopicProgressFilterInput
    $owner: String
  ) {
    onCreateTopicProgress(filter: $filter, owner: $owner) {
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
export const onUpdateTopicProgress = /* GraphQL */ `
  subscription OnUpdateTopicProgress(
    $filter: ModelSubscriptionTopicProgressFilterInput
    $owner: String
  ) {
    onUpdateTopicProgress(filter: $filter, owner: $owner) {
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
export const onDeleteTopicProgress = /* GraphQL */ `
  subscription OnDeleteTopicProgress(
    $filter: ModelSubscriptionTopicProgressFilterInput
    $owner: String
  ) {
    onDeleteTopicProgress(filter: $filter, owner: $owner) {
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
