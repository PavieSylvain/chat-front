import { Injectable } from '@angular/core';
import {Conversation} from "../entity/conversation";
import {SettingsService} from "../configuration/settings-service.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../security/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private settings: SettingsService, private http: HttpClient, private router: Router) { }

  /* add new conversation */
  public add(oConversation: Conversation){
    return this.http.post(this.settings.getConfigUrl() + '/conversation/add',  {"name": oConversation.name, "lUsers": oConversation.lUsers}).subscribe(
        data => this.router.navigate(['/conversation', data]).then(r => {}),
        error => console.log("error:", error)
      );
  }

  /* get one conversation with id */
  public get(id: number){
    return this.http.get(this.settings.getConfigUrl() + '/conversation/' + id);
  }

  /* set new message in conversation */
  public setMsg(msg: string, userEmail:string, conversationId: number){
    return this.http.post(this.settings.getConfigUrl() + '/conversation/set_msg', {"msg": msg, "email": userEmail, "conversationId": conversationId}).subscribe(
      data => console.log(data),
      error => console.log("error:", error)
    );
  }

  /* get list of user's conversations */
  public getUserConversations(email: string){
    return this.http.get(this.settings.getConfigUrl() + '/conversation/my/' + email);
  }
}
