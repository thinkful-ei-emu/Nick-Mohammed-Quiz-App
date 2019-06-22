import $ from 'jquery';
import Renderer from './lib/Renderer';
import Question from './Question';
import Quiz from './Quiz';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'submit #submit-form': 'handleAnswerSubmit',
      'click .next-question': 'handleContinue',
      'click .replay-quiz' : 'handleEnd',

    };
  }

  _generateIntro() {
    return `
      <div class"intro-page">
        <p>
          Welcome to the Trivia Quiz
        </p>
        <p>
          Test your smarts and see how high you can score!
        </p>
      </div>
      <div class="buttons">
        <button class="start-quiz">Start Quiz</button>
      </div>
    `;
  }

  _generateQuestion(){
    console.log(this.model);
    let question = '';
    for (let i = 0; i < this.model.asked[0].answers.length; i++){
      question += `<input type="radio" name="choices" value="${this.model.asked[0].answers[i]}">${this.model.asked[0].answers[i]}
        <br>`;
    }
    
    return `
      <div>
        <h1>${this.model.asked[0].text}</h1>
        <form id="submit-form">
        ${question}
        <div class="buttons">
        <button type="submit" class="submit-question">Submit</button>
      </div>
        </form>
        
      </div>`;
  }

  _generateAnswer() { 
    if (this.model.getCurrentQuestion().getAnswerStatus() === 1){
      return `
      <div> 
        <p> ${this.model.asked[0].text} </p>
        <p> You got it! </p> 
        <p> The correct answer was: </p>
          <p> ${this.model.asked[0].correctAnswer} </p> 
      </div> 
      <div class="buttons"> 
        <button class="next-question">Continue</button>
      </div>;`;
    }
    else { 
      return `
      <div> 
        <p> ${this.model.asked[0].text} </p> 
        <p> Sorry, that's incorrect. </p> 
        <p> You answered: </p> 
          <p> ${this.model.asked[0].userAnswer} </p> 
        <p> The correct answer was: </p> 
          <p> ${this.model.asked[0].correctAnswer} </p> 
      </div> 
      <div class="buttons"> 
            <button class="next-question">Continue</button> 
      </div>`; 
    }
  }



  _generateOutro() { 
    return ` 
      <div> 
        <p> Good job! </p>
        <p> Your final score was ${this.model.score} out of 5. </p>        
      </div>
      <div class="buttons">
      <button class="replay-quiz">Play Again</button>
      </div>`;
  }
    
  handleAnswerSubmit(e){
    e.preventDefault();
    const userAnswer = new FormData(e.target).get('choices');
    console.log(userAnswer);
    this.model.answerCurrentQuestion(userAnswer);
    this.model.update();
    
    this.renderAll();
  }

  handleContinue(){
    console.log(this.model.unasked);
    this.model.scoreHistory.push(this.model.score);
    if(this.model.unasked.length === 0){
      this.model.active = false;
      this.model.update();
    }
    else {
      this.model.nextQuestion();
      this.model.update();
    }
  }


  template() {
    let html = '';
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }
    else if (this.model.active === false){
      html = this._generateOutro();
    }
    else if (this.model.getCurrentQuestion().getAnswerStatus() !== -1){
      html = this._generateAnswer();
    } 
    else {
      html = this._generateQuestion();
    }
    
    
    return html;
  }

  handleStart() {
    this.model.startGame();
  }

  handleEnd(){
    this.model.asked = [];
    this.model.update();   
  }
}

export default QuizDisplay;