import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  goBack(){    
    this.router.navigate(["/dashboard/cashblast"]);
  }

}
