import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import {ChatService} from './services/chat.service';

import { FriendlyAppNamePipe } from './pipes/friendly-app-name.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { ChatComponent } from './components/chat/chat.component';
import { MessagelineComponent } from './components/messageline/messageline.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { GamelistComponent } from './components/gamelist/gamelist.component';
import { CardComponent } from './components/card/card.component';
import { ScorePipe } from './pipes/score.pipe';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'lobby', component: LobbyComponent} //testing only
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FriendlyAppNamePipe,
    SearchFilterPipe,
    ChatComponent,
    MessagelineComponent,
    LobbyComponent,
    UserlistComponent,
    GamelistComponent,
    CardComponent,
    ScorePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,    
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    DragulaModule
  ],
  providers: [ChatService, ScorePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
