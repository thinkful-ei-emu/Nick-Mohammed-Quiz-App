// Attrs:
//   text (string)           - Question text
//   answers (array)         - Array of strings, each a unique answer
//   correctAnswer (string)  - Correct answer string, must match at least one element of answers array
//   userAnswer (string)     - Answer provided by user

// Methods:
//   submitAnswer(answer: string)  - sets the userAnswer prop
//   answerStatus()                - returns {Integer} indicating question's state:
//                                   -1: unanswered, 0: answered incorrectly, 1: answered correctly

class Question {
  constructor(text, answers, correctAnswer){
    this.text=text;
    this.answers=[];
    this.correctAnswer=correctAnswer;
    this.userAnswer = '';
        
  }

  submitAnswer(userInput){
    return this.userAnswer = userInput;
  }

  answerStatus(){
    if(this.userAnswer === ''){
      return 0;
    }
    if(this.userAnswer === this.correctAnswer){
      return 1;
    }
    if(this.userAnswer !== this.correctAnswer){
      return 0;
    }
    else{
      return -1;
    }
  }
}
export default Question;
