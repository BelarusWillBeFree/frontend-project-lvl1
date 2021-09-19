import { questionCount, run } from '../index.js';
import getRandom from '../getRandom.js';

const maxRandomValue = 100;
const maxValueRepetitionInterval = 20;
const maxValueAmountOfElements = 10;
const minValueAmountOfElements = 5;

const generalQuestion = 'What number is missing in the progression?';

const getProgression = (paramForGeneration) => {
  const [amountOfElements, firstElement, repetitionInterval] = paramForGeneration;
  let valueProgression = firstElement;
  const progression = [];
  for (let i = 0; i < amountOfElements; i += 1) {
    progression[i] = valueProgression;
    valueProgression += repetitionInterval;
  }
  return progression;
};
const getQuestionWithHiddenElement = (paramForProgression) => {
  const [progression, hiddenElement] = paramForProgression;
  for (let i = 0; i < progression.length; i += 1) {
    if (i === hiddenElement) {
      progression[i] = '..';
    }
  }
  return progression.join(' ');
};

const generateOneRound = () => {
  const amountOfElements = getRandom(minValueAmountOfElements, maxValueAmountOfElements);
  const firstElement = getRandom(0, maxRandomValue);
  const repetitionInterval = getRandom(1, maxValueRepetitionInterval);
  const progression = getProgression([amountOfElements, firstElement, repetitionInterval]);
  const hiddenElement = getRandom(0, progression.length - 1);
  const answer = String(progression[hiddenElement]);
  const question = getQuestionWithHiddenElement([progression, hiddenElement]);
  return [question, answer];
};

const generatingQuestionAndAnswerForBrainProgression = () => {
  const rounds = [];
  for (let j = 0; j < questionCount; j += 1) {
    rounds.push(generateOneRound());
  }
  return rounds;
};

const startBrainProgression = () => {
  const questionsAndAnswers = generatingQuestionAndAnswerForBrainProgression();
  run(generalQuestion, questionsAndAnswers);
};

export default startBrainProgression;
