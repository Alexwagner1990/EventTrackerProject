import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TournamentTrackerComponent } from './tournament-tracker/tournament-tracker.component';
import { TournamentService } from './tournament.service';
import { TournamentsAfterDatePipe } from './pipes/tournaments-after-date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TournamentTrackerComponent,
    TournamentsAfterDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [TournamentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
