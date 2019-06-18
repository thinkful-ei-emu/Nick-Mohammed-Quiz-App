/* eslint-disable no-undef */
class TriviaApi {
  constructor(){
    this.baseUrl = 'https://opentdb.com/api.php?amount=5&type=multiple';
  }
  listApiFetch(...args) { 
    let error; 
    return fetch(...args)
      .then(res => { 
        if (!res.ok) { error = { code: res.status };
        }
        return res.json();
      })
      .then(data => {    
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }    
        return data;
      });  
  }

  getQuestions(){
    return listApiFetch(this.baseUrl);
    // this.listApiFetch(`${this.BASEURL}?amount=10`)
    //   .then(res => {
    //     console.log('this is a response' + res);
    //     let data = res['results'][0];
    //     console.log(data);
    //   });      
  }
}
export default TriviaApi;
//let myObj = new TriviaApi;
//myObj.getQuestions();