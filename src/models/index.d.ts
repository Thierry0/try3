import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerTopicProgress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TopicProgress, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly topic: string;
  readonly practicedCount: number;
  readonly lastPracticed?: string | null;
  readonly correctAnswers: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTopicProgress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TopicProgress, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly topic: string;
  readonly practicedCount: number;
  readonly lastPracticed?: string | null;
  readonly correctAnswers: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TopicProgress = LazyLoading extends LazyLoadingDisabled ? EagerTopicProgress : LazyTopicProgress

export declare const TopicProgress: (new (init: ModelInit<TopicProgress>) => TopicProgress) & {
  copyOf(source: TopicProgress, mutator: (draft: MutableModel<TopicProgress>) => MutableModel<TopicProgress> | void): TopicProgress;
}