import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { AuthService } from '../../auth.service';
import { PPService } from '../ppservice/pp.service';

@Component({
  selector: 'app-poolquestion',
  templateUrl: './poolquestion.component.html',
  styleUrls: ['./poolquestion.component.css']
})
export class PoolquestionComponent implements OnInit {

  score: void;
  activePlayer: any;
  percent: number = 100;
  timeLeft: number = 30;
  answers: any;
  packdata: any;
  totalQ: any;
  qId: any;
  quesData: any;
  question: any;
  isOption: boolean;
  questionleft: any;
  questionplayed: any;
  totalquestion: any;
  correctAnswer: number = 0;
  npath: string;
  qImage: any;
  isDisabled:boolean = true;
  rightAnsSound:HTMLAudioElement =new Audio();
  wrongAnsSound:HTMLAudioElement =new Audio();
  beginGameSound:HTMLAudioElement =new Audio();

  constructor(public router: Router,
   
    private spinner: NgxSpinnerService,
    public auth: AuthService,
    public service: PPService,
    public actroute: ActivatedRoute,
  ) {
    //this.isDisabled = true;
    this.rightAnsSound.src='assets/gamesound/rightAnsSound.wav';
    this.wrongAnsSound.src='assets/gamesound/wrongAnsSound.wav'; 
    this.beginGameSound.src = 'assets/gamesound/BeginGamewhenmatched.wav';
    this.actroute.params.subscribe(value => {
      let params = JSON.parse(value.data);
      this.totalquestion = params.totalQues;
      this.questionleft = params.remainQues;
      this.correctAnswer = params.score;
      this.questionplayed = this.totalquestion - this.questionleft;
    });
    console.log("totalquestion ===> ",this.totalquestion,"  questionleft ===> ",this.questionleft,"  score == > ",this.score);
  }

  ngOnInit() {
    this.beginGameSound.load();
    this.beginGameSound.play();
    this.beginGameSound.volume = 1;
    //this.isDisabled = true;
    this.getQuestion();
    

  }

  goBack(){

    this.router.navigate(["/dashboard/poolprice"]);
  }
  getQuestion() {
    console.log("correct Ans========count=>",this.correctAnswer);
   
     
    
    if (this.questionleft > 0) {
      
      let endpoint = "question";
      let requestBody = {
        userId: this.auth.getUserId(), 
        gameId: this.auth.getGameId(),
        packId: this.auth.getPackId(),
        season: "NA"
      }
      console.log("request==>  ", requestBody)
      this.service.getQuestion(endpoint, requestBody).then(value => {
        this.quesData = value;
        this.question = value.qText;
        this.answers = value.ansOption;
        this.qId = value.qid;
        this.qImage= value.qImage;
      // this.qImage = "http://13.233.39.58:8080/gamesImages/gutthi.png" ;
        document.getElementById("0").style.backgroundColor = '#3b4155';
        document.getElementById("0").style.color = '#FFF';
        document.getElementById("1").style.backgroundColor = '#3b4155';
        document.getElementById("1").style.color = '#FFF';
        document.getElementById("2").style.backgroundColor = '#3b4155';
        document.getElementById("2").style.color = '#FFF';
        document.getElementById("3").style.backgroundColor = '#3b4155';
        document.getElementById("3").style.color = '#FFF';
        console.log("qId==> ", this.qId);
        console.log("ques Data==> ", JSON.stringify(this.quesData));
        this.spinner.hide();
      }, err => {
        console.log("err = >  " + err);
      })
    } else {
      console.log("ready to get claim")
     
       this.getClaim();

    }
  }
  answer(ans, i) {
    //this.isDisabled = false;
    this.spinner.show();
    this.questionplayed += 1;
    this.questionleft -= 1;
    let endpoint = "saveAnswer ";
    let requestBody = {
      gameId: this.auth.getGameId(),
      packId: this.auth.getPackId(),
      qId: this.qId,
      selectedOption: i,
      uId: this.auth.getUserId(),

    }

    console.log("ans==> ", ans, " index==> ", i);
    console.log("request==>  ", requestBody)
    this.service.saveAnswer(endpoint, requestBody).then(value => {
      console.log("Ans Data==> ", JSON.stringify(value));
      if (value.statusCode == 0) {
        if (i != -1) {
          console.log("correct Ans==> ", value.data.correctAnswer, ",  index==> ", i);
          document.getElementById(i).style.backgroundColor = '#FF5252'
          document.getElementById(value.data.correctAnswer).style.backgroundColor = '#5DF971'
        }
       
        if (value.data.correctAnswer == i || value.data.isOptionCorrect == true) {
          this.correctAnswer++;
          this.rightAnsSound.load();
          this.rightAnsSound.play();
          this.rightAnsSound.volume = 1;
        }else {
          this.wrongAnsSound.load();
          this.wrongAnsSound.play();
          this.wrongAnsSound.volume = 1;
        }
        //this.correctAnswer
        setTimeout(() => {
         //this.spinner.hide();
          clearInterval(this.interval);
          this.getQuestion();
        }, 2000);
        
      }


    }, err => {
      console.log("err = >  " + err);
    })

    // this.router.navigate(['/dashboard/poolprice/tier'], { skipLocationChange: true });
  }
  interval: any;
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        console.log("timer if")
        this.timeLeft--;
        this.percent = this.percent - (100 / 30);
      } else {
        clearInterval(this.interval);
        this.answer(-1, -1);
      }
    }, 1000);


  }
  getClaim() {
    console.log("get claim=============>")


    let reqbody = {
      userId: this.auth.getUserId(),
      gameId: this.auth.getGameId(),
      packId: this.auth.getPackId(),
      //stopPointId: this.winnerData.id,
      //alternateMobileNumber:this.claimForm.value.mobileNo,
    }
    console.log("request====> ", reqbody)
    this.service.getClaim("claimPrize", reqbody).then((values) => {

      console.log("res data==> ", JSON.stringify(values));
      if (values.statusCode == 0) {
        let scoreData = {
          correctAnswer: this.correctAnswer,
          totalQuestion: this.totalquestion
        }
        console.log("claimed======> ",this.correctAnswer)
         if(this.correctAnswer ==19 && this.questionleft==0){
           console.log("19 correct ans")
          this.router.navigate(["/dashboard/poolprize/question/winnerscore", { score: JSON.stringify(scoreData) }], { skipLocationChange: true });
        }else if(this.correctAnswer ==18 && this.questionleft==0){
          console.log("18 correct ans")
          this.router.navigate(["/dashboard/poolprize/question/winnerscore", { score: JSON.stringify(scoreData) }], { skipLocationChange: true });
        }else if(this.correctAnswer < 18 && this.questionleft==0){
          console.log("<18 correct ans")
          this.router.navigate(["/dashboard/poolprize/question/looserscore" , { score: JSON.stringify(scoreData) }], { skipLocationChange: true });
        }else if(this.correctAnswer == 20 && this.questionleft==0){
          console.log("20 correct ans")
          this.router.navigate(["/dashboard/poolprize/question/winners", { score: JSON.stringify(scoreData) }], { skipLocationChange: true });
        }
       // this.router.navigate(["/dashboard/poolprice/tier", { score: JSON.stringify(scoreData) }], { skipLocationChange: true });
      }
    })
  }
  ngOnDesdroy() {
    clearInterval(this.interval);
  }
  getPastWinner() {
    this.router.navigate(["dashboard/poolprice/pastwinner"]);

  }
  getTC() {
    let queryParam;
    this.npath="dashboard/poolprice";
    queryParam = {
      "rpath": this.npath
    
    }
    this.router.navigate(["/dashboard/poolprice/tc", { score: JSON.stringify(queryParam) }], { skipLocationChange: true });
  }

getlooser(){
  this.router.navigate(["/dashboard/poolprize/question/looserscore"])
}
getWinner(){
  this.router.navigate(["/dashboard/poolprize/question/winnerscore"])

}
getHome(){
  this.router.navigate(["/dashboard/poolprize"])
}
}
