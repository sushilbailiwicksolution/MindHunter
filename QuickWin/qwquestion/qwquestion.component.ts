import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../auth.service';
import { QwserviceService } from '../service/qwservice.service';

@Component({
  selector: 'app-qwquestion',
  templateUrl: './qwquestion.component.html',
  styleUrls: ['./qwquestion.component.css']
})
export class QwquestionComponent implements OnInit {
  correctAns: any;
  rightAnsSound:HTMLAudioElement = new Audio();
  wrongAnsSound:HTMLAudioElement = new Audio();
  beginGameSound:HTMLAudioElement = new Audio();

  quesAnsList: any;
  question: any;
  quId: any;
  qImage: any;
  constructor(private router: Router, private service: QwserviceService, private auth: AuthService) { 
    this.rightAnsSound.src='assets/gamesound/rightAnsSound.wav';
    this.wrongAnsSound.src='assets/gamesound/wrongAnsSound.wav'; 
    this.beginGameSound.src = 'assets/gamesound/BeginGamewhenmatched.wav';
  }
  

  getLosser(){
    this.router.navigate(["/dashboard/quickwin/question/looser"]);
  }
  
  getWinner(){
    this.router.navigate(["/dashboard/quickwin/question/winner"]);
  }
  getHome(){
   
      this.router.navigate(["/dashboard/quickwin"]);
   
  }


ngOnInit() {
  this.beginGameSound.load();
  this.beginGameSound.play();
  this.beginGameSound.volume = 1;
  this.getQuestions();
}
getQuestions() {
  let endPoint = "getQuestion";
  let requestBody = {
    "gameId": this.auth.getGameId(),
  }
  // "packId": "1"
  this.service.getQuickQuestion(endPoint, requestBody).then((value) => {
    console.log("questions ans list" + JSON.stringify(value));
    if (value.statusCode == 0) {
      console.log("Api message " + value.message);
      this.quesAnsList = value.data.ansOption;
      this.question = value.data.qText;
      this.quId = value.data.qid
      this.qImage = value.data.qImage;

    } else {
      console.log("Api message " + value.message);

    }

  });

}

saveAnswer(ans, index) {
  let requestBody = {
    "qId": this.quId,
    "selectedOption": index,
    "uId": this.auth.getUserId(),
    "gameId": this.auth.getGameId(),
    "packId": this.auth.getPackId(),

  }
  this.service.submitAnswer("saveAnswer", requestBody).then(res => {
    console.log("save Answer Response==>", JSON.stringify(res))
    this.correctAns = this.quesAnsList[res.data.correctAnswer];
    console.log("correct Ans==> ",this.correctAns);
    localStorage.setItem("correctAns",this.correctAns);
    localStorage.setItem("ansIndex",res.data.correctAnswer);
    if (res.statusCode == 0) {
      if (res.data.isOptionCorrect) {
        this.rightAnsSound.load();
        this.rightAnsSound.play();
        this.rightAnsSound.volume = 1;
        let data = {
          "userId": this.auth.getUserId(),
          "gameId": this.auth.getGameId(),
          "packId": this.auth.getPackId()
        }
        this.service.clamePrice("claimPrize ", data).then(res => {
          console.log("With calling clame prize");
            this.router.navigate(["/dashboard/quickwin/question/winner"]);
                  
        }, err => {
          console.log("With calling clame prize Error");
          this.router.navigate(["/dashboard/quickwin/question/winner"]);
        })
      } else {
        this.wrongAnsSound.load();
        this.wrongAnsSound.play();
        this.wrongAnsSound.volume = 1;
        console.log("Without calling clame prize");
        this.router.navigate(["/dashboard/quickwin/question/looser"])
      }

    }

  }, err => {
    console.log("save Answer Response==>", JSON.stringify(err))
  })

}
}
