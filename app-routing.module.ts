import { RouterModule, Routes } from '../../node_modules/@angular/router';
import { NgModule } from '../../node_modules/@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { OtpComponent } from './otp/otp.component';
import { CbhomeComponent } from './CashBlast/cbhome/cbhome.component';
import { AuthGuard } from './auth.guard';
import { GamedashboardComponent } from './gamedashboard/gamedashboard.component';
import { CblooserComponent } from './CashBlast/cblooser/cblooser.component';
import { CbHowtoplayComponent } from './CashBlast/cbhowtoplay/cbhowtoplay.component';
import { OpponentComponent } from './CashBlast/opponent/opponent.component';
import { QuestionComponent } from './CashBlast/question/question.component';
import { ScoreboardComponent } from './CashBlast/scoreboard/scoreboard.component';
import { NetworkerrorComponent } from './networkerror/networkerror.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TrnsRedirectComponent } from './CashBlast/trns-redirect/trns-redirect.component';
import { SpinthewheelComponent } from './SpinTheWheel/spinthewheel/spinthewheel.component';
import { QwhomeComponent } from './QuickWin/qwhome/qwhome.component';
import { QwquestionComponent } from './QuickWin/qwquestion/qwquestion.component';
import { LooserComponent } from './QuickWin/looser/looser.component';
import { WinnerComponent } from './QuickWin/winner/winner.component';
import { QwtcComponent } from './QuickWin/qwtc/qwtc.component';
import { HelpComponent } from './QuickWin/help/help.component';
import { QwpastwinnerComponent } from './QuickWin/qwpastwinner/qwpastwinner.component';
import { FaqComponent } from './QuickWin/faq/faq.component';
import { PoolhomeComponent } from './PoolPrize/poolhome/poolhome.component';
import { PoolquestionComponent } from './PoolPrize/poolquestion/poolquestion.component';
import { PooltwinnerscoreboardComponent } from './PoolPrize/pooltwinnerscoreboard/pooltwinnerscoreboard.component';
import { PooltlooserscoreboardComponent } from './PoolPrize/pooltlooserscoreboard/pooltlooserscoreboard.component';
import { PooltcComponent } from './PoolPrize/pooltc/pooltc.component';
import { PoolfaqComponent } from './PoolPrize/poolfaq/poolfaq.component';
import { PooltipsandtricsComponent } from './PoolPrize/pooltipsandtrics/pooltipsandtrics.component';
import { PoolpastwinnerComponent } from './PoolPrize/poolpastwinner/poolpastwinner.component';
import { PoolwinnerComponent } from './PoolPrize/poolwinner/poolwinner.component';
import { BlogComponent } from './blog/blog.component';
import { PopupComponent } from './popup/popup.component';
import { RulesComponent } from './CashBlast/rules/rules.component';
import { TermandconditionComponent } from './CashBlast/termandcondition/termandcondition.component';

const routes: Routes = [


  { path: "dashboard", component: GamedashboardComponent, canActivate: [AuthGuard]  },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: 'login', pathMatch: 'full'},
  
  
  { path: "register", component: RegistrationComponent },
  { path: "otp", component: OtpComponent },
  { path: "dashboard/blog", component: BlogComponent },
  { path: "dashboard/popup", component: PopupComponent },
  { path: "dashboard/cashblast", component: CbhomeComponent, canActivate: [AuthGuard] },
  { path: "dashboard/cashblast/tc", component: TermandconditionComponent },
  { path: "dashboard/cashblast/rules", component: RulesComponent },
  { path: "dashboard/cashblast/help", component: HelpComponent },
  
  { path: "dashboard/cashblast/cblooser", component: CblooserComponent },
  { path: "dashboard/cashblast/cbhowtoplay", component: CbHowtoplayComponent },
  { path: "dashboard/cashblast/opponent", component: OpponentComponent, canActivate: [AuthGuard] },
  { path: "dashboard/cashblast/opponent/playquestion", component: QuestionComponent, canActivate: [AuthGuard] },
  { path: "dashboard/cashblast/opponent/playquestion/scoreboard", component: ScoreboardComponent},
  { path: "dashboard/spinthewheel", component: SpinthewheelComponent },
  { path: "dashboard/quickwin", component: QwhomeComponent },
  { path: "dashboard/quickwin/question", component: QwquestionComponent },
  { path: "dashboard/quickwin/question/looser", component: LooserComponent },
  { path: "dashboard/quickwin/question/winner", component: WinnerComponent },
  { path: "dashboard/quickwin/tc", component: QwtcComponent },
  { path: "dashboard/quickwin/help", component: HelpComponent },
  { path: "dashboard/quickwin/pastwinner", component: QwpastwinnerComponent },
  { path: "dashboard/quickwin/faq", component: FaqComponent },
  { path: "dashboard/poolprize", component: PoolhomeComponent },
  { path: "dashboard/poolprize/question", component: PoolquestionComponent },
  { path: "dashboard/poolprize/question/winnerscore", component: PooltwinnerscoreboardComponent },
  { path: "dashboard/poolprize/question/looserscore", component: PooltlooserscoreboardComponent },
  { path: "dashboard/poolprize/question/winners", component: PoolwinnerComponent },
  { path: "dashboard/poolprize/tc", component: PooltcComponent },
  { path: "dashboard/poolprize/faq", component: PoolfaqComponent },
  { path: "dashboard/poolprize/tips", component: PooltipsandtricsComponent },
  { path: "dashboard/poolprize/pastwinner", component: PoolpastwinnerComponent },  
  { path: "paytm", component: TrnsRedirectComponent },
  { path: "networkerror", component: NetworkerrorComponent },
  { path: "**", component: PagenotfoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true ,useHash:true} // <-- debugging purposes only
    )

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
