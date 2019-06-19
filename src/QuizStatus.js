import Renderer from './lib/Renderer';

class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing this.model 
    let x; 
    if (this.model.asked.length === 0){
      x = 'Inactive'; 
    } 
    else {
      x = `${this.model.asked.length} out of 5`; 
    }

    let highscore = 0;
    for (let i = 0; i < this.model.scoreHistory.length; i++){
      if (this.model.score > this.model.scoreHistory[i]){
        this.model.scoreHistory.push(this.model.score);
        highscore = this.model.score;
      } else {
        highscore = Math.max(...this.model.scoreHistory);
      }

    }

    return `
      <div class="current-status">
        <span class="status-item current-score">Score: ${this.model.score}</span>
        <span class="status-item current-highscore">High Score: ${highscore}</span>
        <span class="status-item current-progress">Progress: ${x}</span>
      </div>
    `;
  }
}

export default QuizStatus;