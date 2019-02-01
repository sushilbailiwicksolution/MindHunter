import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpponentComponent } from './CashBlast/opponent/opponent.component';
import { CbhomeComponent } from './CashBlast/cbhome/cbhome.component';
import { QuestionComponent } from './CashBlast/question/question.component';
import { ScoreboardComponent } from './CashBlast/scoreboard/scoreboard.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { RegistrationComponent } from './registration/registration.component';
import { GamedashboardComponent } from './gamedashboard/gamedashboard.component';
import { NetworkerrorComponent } from './networkerror/networkerror.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { AuthGuard } from './auth.guard';
import { LoginService } from './loginservice/login.service';
import { SocketIoModule, SocketIoConfig } from '../../node_modules/ngx-socket-io';
import { ToastrModule } from '../../node_modules/ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from '../../node_modules/ngx-spinner';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { CblooserComponent } from './CashBlast/cblooser/cblooser.component';
import { CbHowtoplayComponent } from './CashBlast/cbhowtoplay/cbhowtoplay.component';
import { TrnsRedirectComponent } from './CashBlast/trns-redirect/trns-redirect.component';
import { SpinthewheelComponent } from './SpinTheWheel/spinthewheel/spinthewheel.component';
import { HelpComponent } from './QuickWin/help/help.component';

import { FaqComponent } from './QuickWin/faq/faq.component';    
import { LooserComponent } from './QuickWin/looser/looser.component';
import { WinnerComponent } from './QuickWin/winner/winner.component';
import { QwpastwinnerComponent } from './QuickWin/qwpastwinner/qwpastwinner.component';
import { QwquestionComponent } from './QuickWin/qwquestion/qwquestion.component';
import { QwtcComponent } from './QuickWin/qwtc/qwtc.component';
import { QwhomeComponent } from './QuickWin/qwhome/qwhome.component';
import { PoolhomeComponent } from './PoolPrize/poolhome/poolhome.component';
import { PoolquestionComponent } from './PoolPrize/poolquestion/poolquestion.component';
import { PoolpastwinnerComponent } from './PoolPrize/poolpastwinner/poolpastwinner.component';
import { PooltcComponent } from './PoolPrize/pooltc/pooltc.component';
import { PoolfaqComponent } from './PoolPrize/poolfaq/poolfaq.component';
import { PooltipsandtricsComponent } from './PoolPrize/pooltipsandtrics/pooltipsandtrics.component';
import { PooltwinnerscoreboardComponent } from './PoolPrize/pooltwinnerscoreboard/pooltwinnerscoreboard.component';
import { PooltlooserscoreboardComponent } from './PoolPrize/pooltlooserscoreboard/pooltlooserscoreboard.component';
import { PoolwinnerComponent } from './PoolPrize/poolwinner/poolwinner.component';
import { BlogComponent } from './blog/blog.component';
import { PopupComponent } from './popup/popup.component';
import { NgxSoundmanager2Module } from 'ngx-soundmanager2';
import { TermandconditionComponent } from './CashBlast/termandcondition/termandcondition.component';
import { RulesComponent } from './CashBlast/rules/rules.component';
const config: SocketIoConfig = { url: 'http://13.233.39.58:8090', options: {withCredentials: true} };
// const config: SocketIoConfig = { url: 'http://192.168.0.138:8090', options: {withCredentials: true} };
@NgModule({
  declarations: [
    AppComponent,
    CbhomeComponent,
    OpponentComponent,
    QuestionComponent,
    LoginComponent,  
    OtpComponent,
    RegistrationComponent,
    ScoreboardComponent,
    GamedashboardComponent,
    NetworkerrorComponent,
    PagenotfoundComponent,
    CblooserComponent,   
    CbHowtoplayComponent,
    TrnsRedirectComponent,
    SpinthewheelComponent,
    HelpComponent,
    
    FaqComponent,
    LooserComponent,
    WinnerComponent,
    QwpastwinnerComponent,
    QwquestionComponent,
    QwtcComponent,
    QwhomeComponent,
    PoolhomeComponent,
    PoolquestionComponent,
    PoolpastwinnerComponent,
    PooltcComponent,
    PoolfaqComponent,
    PooltipsandtricsComponent,
    PooltwinnerscoreboardComponent,
    PooltlooserscoreboardComponent,
    PoolwinnerComponent,
    BlogComponent,
    PopupComponent,
    TermandconditionComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,BrowserAnimationsModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,
    NgxSoundmanager2Module.forRoot(),
    ToastrModule.forRoot({timeOut: 0}),
    SocketIoModule.forRoot(config),
    NgxSpinnerModule,
    DigitOnlyModule
    
    
  ],
  providers: [AuthService,AuthGuard,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
  