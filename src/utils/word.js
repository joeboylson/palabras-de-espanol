import { minBy } from 'lodash';

export const getNextWord = (_words, reviewMode=false) => {
  return minBy(_words, i => i.cooldown);
}