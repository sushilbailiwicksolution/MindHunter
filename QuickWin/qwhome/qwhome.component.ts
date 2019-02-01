import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { QwserviceService } from '../service/qwservice.service';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-qwhome',
  templateUrl: './qwhome.component.html',
  styleUrls: ['./qwhome.component.css']
})
export class QwhomeComponent implements OnInit {

  packList:any;
  userId: string;
  entryFee: any;
  onPackSound:HTMLAudioElement = new Audio();
  isActivePlayer: boolean;
  buttonText:any;
  constructor(private router:Router,private service:QwserviceService,private auth:AuthService) {
    this.onPackSound.src = 'assets/gamesound/EnterGamesoundonclick.mp3'; 
  }

  ngOnInit() {
    console.log("gameId==> ",this.auth.getGameId());
    this.getActivePlayer();
  }

  getActivePlayer(){
    console.log("game id is : " + this.auth.getGameId());
    let endpoint = "getActivePlayerDetail  ";
    let requestBody = {
      gameId: this.auth.getGameId(),
      userId: this.auth.getUserId()
    }
    this.service.getActivePlayer(endpoint, requestBody).then(value => {
      if(value.data != null){
          this.isActivePlayer = true;
          
      }else{
          this.isActivePlayer = false;
          
      }
      
      this.getPackList(this.auth.getGameId())
  

    }, err => {
      console.log("err = >  " + err);
    })
  }



playNow(pack:any){
  this.onPackSound.load();
  this.onPackSound.play();
  this.onPackSound.volume = 1
  console.log("pack Data==> ",pack);
  this.auth.setPackId(pack.packId);
  this.entryFee = pack.entryFee;
  this.userId =this.auth.getUserId();
//paytm integration after Success response navigate to Question
if(!this.isActivePlayer){
  this.saveActivePlayer();
}
this.router.navigate(["/dashboard/quickwin/question"]);
}

saveActivePlayer(){
  let requestBody={
    "userId":this.auth.getUserId(),
    "gameId":this.auth.getGameId(),
    "packId":this.auth.getPackId(),
    "totalQuestions":"1"	
  } ;
  
  this.service.saveActivePlayerDetail("saveActivePlayerDetail",requestBody).then(res=>{
    if(res.statusCode==0){
     // window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway/'+this.entryFee+'/'+this.userId;
  
      
    }
   
  },err=>{})
}
getPackList(gameId:any){
  console.log("game id is : "+gameId);
  let endpoint = "getPackList ";
  let requestBody = {
    "gameId":gameId
  }
   this.service.getPackList(endpoint,requestBody).then(value =>{
      console.log("pack list is : =>"+JSON.stringify(value.data));
      this.packList = value.data;
   },err=>{
     console.log("err = >  "+err);
   })
}

goDashboard(){
  this.router.navigate(["/dashboard"]);
}
  getTc(){
    window.location.href='http://13.233.39.58:8080/gamesfont/quickWin/term_condition.html';
  }     
  getPastWinner(){
    window.location.href='http://13.233.39.58:8080/gamesfont/quickWin/past_winner.html';
  }
  getFaq(){
    window.location.href='http://13.233.39.58:8080/gamesfont/quickWin/faq.html';
  }
}
