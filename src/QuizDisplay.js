import $ from 'jquery';
import Renderer from './lib/Renderer';
import Question from './Question';
import Quiz from './Quiz';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      
    };
  }

  _generateIntro() {
    return `
      <div>
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
    console.log(this.model.asked[0].answers.length);
    let question = '';
    for (let i = 0; i < this.model.asked[0].answers.length; i++){
      question += `<input type="radio" name="choices">${this.model.asked[0].answers[i]}
        <br>`;
    }
    console.log(question);
    
    return `
      <div>
        <h1>${this.model.asked[0].text}</h1>
        <form>
        ${question}
        </form>
        <div class="buttons">
        <button class="next-question">Next Question</button>
      </div>
      </div>`;
  } 

  _generateCorrectAnswer() { 
    return `
      <div> 
        <p> ${this.model.asked[0].text} </p>
        <p> You got it! </p> 
        <p> The correct answer was: </p>
          <p> ${this.model.asked[0].correctAnswer} </p> 
      </div> 
      <div class="buttons"> 
        <button class=".next-question">Continue</button>
      </div>;`;
  }

  _generateIncorrectAnswer() { 
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
            <button class=".next-question">Continue</button> 
      </div>`; 
  }

  _generateOutro() { 
    return ` 
      <div> 
        <p> Good job! </p>
        <p> Your final score was ${this.model.score} out of 5. </p>        
      </div>
      <div class="buttons">
      <button class="start-quiz">Play Again</button>
      </div>`;
  }


  template() {
    let html = '';
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }  
    else if (this.model.asked.length > 0){
      html = this._generateQuestion();
    }
    
    return html;
  }

  handleStart() {
    this.model.startGame();
  } 
}

export default QuizDisplay;