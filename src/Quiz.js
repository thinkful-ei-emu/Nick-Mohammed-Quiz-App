import Question from './Question';

class Quiz {
  gistatic DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    // Array of Question instances
    this.unasked = [];
    // Array of Question instances
    this.asked = [];
    this.active = false;

    // TASK: Add more props here per the exercise
    this.score  = 0;
    this.scoreHistory = [];
  }

  // Example method:
  setActive() {
    this.active = true;
  }
}

export default Quiz;
