import { Component } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CashBlast';


  online$: Observable<boolean>;
  name: string;

  constructor(public router:Router,public currentroute:ActivatedRoute) {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
     
    )
    console.log("network====================> ",JSON.stringify(this.online$))
    this.networkStatus()
  }

  public networkStatus() {
    console.log("current route================>",this.currentroute.url);
    this.online$.subscribe(value => {
      console.log("connection is : "+value);
      if(value == false){
        //alert("connection is : "+value);
     
        this.router.navigate(['/networkerror'])
      }
     
      this.name = `Angular 6 - Network Online? ${value}`;
    })
  }
}
