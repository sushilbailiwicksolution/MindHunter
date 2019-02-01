import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../auth.service';
import { PPService } from '../ppservice/pp.service';

@Component({
  selector: 'app-poolhome',
  templateUrl: './poolhome.component.html',
  styleUrls: ['./poolhome.component.css']
})
export class PoolhomeComponent implements OnInit {


  remainingQuestion: any;
  savedPlayer: any;
  activePlayer: any;
  tiers: any
  entryFee: any;
  gameId: any;
  packList: any;
  totalQuestion:any;
  isActivePlayer:boolean;
  isPackActive:boolean;
  private eventDate: Date = new Date(2019, 1, 1);

  private diff: number;
  private countDownResult: number;
  private days: number;
  private hours: number;
  private minutes: number;
  private seconds: number;
  score: number = 0 ;
  timer: any;
  //compareDate: Date = new Date(2019,0,3,0,0,0);
  compareDate: Date;
  userId: string;
  pentryFee: any;
  constructor(public router: Router, public elm: ElementRef, public auth: AuthService, public service: PPService) {
    this.gameId = this.auth.getGameId();
     
    
    this.getCountDown();

  }

  ngOnInit() {
    this.getTier();
    this.getActivePlayer();
  }
  goBack(){

    this.router.navigate(["/dashboard"]);
  }

  getActivePlayer(){
    console.log("game id is : " + this.gameId);
    let endpoint = "getActivePlayerDetail  ";
    let requestBody = {
      gameId: this.gameId,
      userId: this.auth.getUserId()
    }
    this.service.getActivePlayer(endpoint, requestBody).then(value => {
      if(value.data!=null){
        this.activePlayer = value.data[0];
        console.log("getActivePlayerDetail response   : =>" + JSON.stringify(value));
        console.log("remainingQuestion=== >",this.activePlayer.remainingQuestion);
        this.remainingQuestion =  this.activePlayer.remainingQuestion;
        this.score = this.activePlayer.score;
        if(this.remainingQuestion == 0){
          this.remainingQuestion = this.activePlayer.totalQuestions;
        }
        if(this.remainingQuestion != this.activePlayer.totalQuestions ){
          this.isActivePlayer = true;
        }
        
      }else{
        this.isActivePlayer = false;
        
      }
      
   this.getPackList(this.gameId);
  

    }, err => {
      console.log("err = >  " + err);
    })
  }
  payNow(pack: any) {
    this.auth.setPackId(pack.packId);
    this.userId = this.auth.getUserId();
    if(!this.isActivePlayer){

      this.saveActivePlayerDetail();
    }
    let queryParams ={
           "remainQues":this.remainingQuestion,
           "totalQues":this.totalQuestion,
           "score":this.score
    }
   // window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway/'+this.entryFee+'/'+this.userId;
      this.router.navigate(['dashboard/poolprize/question', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
  
    

  }
  howToPlay() {
    this.router.navigate(['dashboard/poolprice/howtoplay'], { skipLocationChange: true });
  }


  getPackList(gameId: any) {
    console.log("game id is : " + gameId);
    let endpoint = "getPackList ";
    let requestBody = {
      "gameId": gameId
    }
    this.service.getPackList(endpoint, requestBody).then(value => {
      console.log("pack list is : =>" + JSON.stringify(value.data));
      if(value.statusCode==0 && value.data != null){
      this.packList = value.data;
      this.entryFee = this.packList[0].entryFee;
      this.totalQuestion = this.packList[0].totalQ;
      this.pentryFee = this.packList[0].entryFee;
      localStorage.setItem("pentryFee",this.pentryFee);
      if(!this.isActivePlayer){
        this.remainingQuestion = this.totalQuestion;
      }
     
      console.log("entry fee==> ", this.packList[0].entryFee," total Question==> ",this.totalQuestion);
    //  this.saveActivePlayerDetail(); 
    }else{
      console.log("data getting null in packlist")
    }
    }, err => {
      console.log("err = >  " + err);
    })
  }
  getTier() {
    console.log("game id is : " + this.gameId);
    let endpoint = "getTier  ";
    let requestBody = {
      gameId: this.gameId
    }
    this.service.getTier(endpoint, requestBody).then(value => {
      this.tiers = value.data;
      console.log("Tiers   : =>" + JSON.stringify(value));

    }, err => {
      console.log("err = >  " + err);
    })
  }
  

  saveActivePlayerDetail(){
    let endpoint = "saveActivePlayerDetail";
    let requestBody = {
      gameId: this.gameId,
      userId: this.auth.getUserId(),
      packId:this.auth.getPackId(),
      totalQuestions:this.totalQuestion

    }
    console.log("request===> ",requestBody);
    this.service.saveActivePlayerDetail(endpoint, requestBody).then(value => {
      this.savedPlayer = value.data;
      console.log("Save Active Player response   : =>" + JSON.stringify(value));

    }, err => {
      console.log("err = >  " + err);
    })
  }
  getCountDown(){
    let date:string = this.auth.getGameSeasonTime().toString();
    //let date:string = "2019-01-04 00:00:00.0"
    console.log("Date is =====> ",date);
    let toYear = Number(date.split('-')[0]);
    let toMonth=Number(date.split('-')[1])-1;
    let todate=Number(date.split('-')[2].split(' ')[0]);
    let toHour=Number(date.split(' ')[1].split(':')[0]);
    let toMinute =Number(date.split(':')[1]);
    let toSecond = Number(date.split(':')[2].split('.')[0]);
    //new Date(2019,0,4,0,0,0)
    //this.compareDate = new Date(2019,0,12,0,0,0);
    this.compareDate = new Date(toYear,toMonth,todate,toHour,toMinute,toSecond)
    console.log("year ==> ",toYear," month ==> ",toMonth," date ==> ",todate," hour ==> ",toHour," minute ==> ",toMinute," second ==> ",toSecond);
    this.timer = setInterval(()=>{
    this.timeBetewwbDates(this.compareDate);
    },1000);
    }
  timeBetewwbDates(toDate){
   let dateEntered = toDate;
   
   let now = new Date();
   
   let difference = dateEntered.getTime() - now.getTime();
   //console.log("time Diff==> ",difference)
   
   if (difference <= 0){
    console.log("time Diff==> ",difference)
     this.isPackActive=false;
    // console.log("isPackActive==> ",this.isPackActive)
     clearInterval(this.timer);
   }
   else{
    this.isPackActive=true;
    //console.log("else isPackActive==> ",this.isPackActive)
      this.seconds = Math.floor(difference / 1000);
      
      this.minutes = Math.floor(this.seconds / 60);
      
      this.hours = Math.floor(this.minutes / 60);
     
      this.days = Math.floor(this.hours / 24);
      

      this.hours %= 24;
      this.minutes %= 60;
      this.seconds %= 60;
     // console.log("day==> ",this.days,"  hh==> ",this.hours,",  min==> ",this.minutes,",  sec==> ",this.seconds);
      

   }
  }

 

  playNow(){
    this.router.navigate(["/dashboard/poolprize/question"]);
  }
  getTc(){
    window.location.href='http://13.233.39.58:8080/gamesfont/poolprize/index-6.html';
  }
  getPastWinner(){
    window.location.href='http://13.233.39.58:8080/gamesfont/poolprize/index-2.html';
  }
  getFaq(){
    
    window.location.href='http://13.233.39.58:8080/gamesfont/poolprize/index-7.html';
  }
  getHome(){
    this.router.navigate(["/dashboard"]);
  }
}
