import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  ans: string;
  index: any;
  temp: string;
  winnerSound:HTMLAudioElement = new Audio();

  constructor(public router:Router) {
    this.winnerSound.src='assets/gamesound/VictoryMarch2.mp3';
    this.ans = localStorage.getItem("correctAns");
    this.temp = localStorage.getItem("ansIndex");
    this.index=+this.temp + 1;
    console.log("index==> ",this.index);
    this.winnerSound.load();
    this.winnerSound.play();
    this.winnerSound.volume = 1;
  }

  ngOnInit() {
  
  }


  goHome(){
    this.winnerSound.volume = 0;
    this.router.navigate(["/dashboard"]);
  }
  getHome(){
    this.winnerSound.volume = 0;
    this.router.navigate(["/dashboard"])
  }

}
