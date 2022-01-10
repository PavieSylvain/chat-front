import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";

import { RegisterComponent } from './routes/register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { NewConversationComponent } from './routes/new-conversation/new-conversation.component';
import { ConversationComponent } from './routes/conversation/conversation.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NewConversationComponent,
    ConversationComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule.forRoot([
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: '', component: HomeComponent},
            {path: 'new-conversation', component: NewConversationComponent},
            {path: 'conversation/:id', component: ConversationComponent},
        ]),
        FormsModule
    ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
