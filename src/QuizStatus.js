import Renderer from './lib/Renderer';

class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing this.model 
    let x; 
    if (this.model.asked.length === 0){
      x = 'Inactive'; 
    } 
    else {
      x = this.model.asked.length; 
    }

    return `
      <div class="current-status">
        <span class="current-score">Score: ${this.model.score}</span>
        <span class="current-highscore">High Score: 0</span>
        <span class="current-progress">Progress: ${x} out of 5</span>
      </div>
    `;
  }
}

export default QuizStatus;