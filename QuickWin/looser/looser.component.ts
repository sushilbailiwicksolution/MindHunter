import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-looser',
  templateUrl: './looser.component.html',
  styleUrls: ['./looser.component.css']
})
export class LooserComponent implements OnInit {
  ans: string;
  index: any;
  temp: string;
  lostSound:HTMLAudioElement = new Audio();
  constructor(public router:Router) {
    this.ans = localStorage.getItem("correctAns");
    this.lostSound.src = 'assets/gamesound/GameLost.wav';
    
    this.temp = localStorage.getItem("ansIndex");
    this.index=+this.temp + 1;
    console.log("index==> ",this.index);
    this.lostSound.load();
    this.lostSound.play();
    this.lostSound.volume = 1;
  }

  ngOnInit() {
  
  }
  replay(){
    this.lostSound.volume = 0;
    this.router.navigate(["/dashboard/quickwin"]);
  }
  getHome(){
    this.lostSound.volume = 0;
    this.router.navigate(["/dashboard"])
  }
}
