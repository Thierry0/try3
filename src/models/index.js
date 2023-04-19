// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TopicProgress } = initSchema(schema);

export {
  TopicProgress
};