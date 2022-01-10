import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../security/auth.service";
import {UserService} from "../../services/user.service";
import {ConversationService} from "../../services/conversation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private userService: UserService, private  conversationService: ConversationService){ }
  /* variable declaration */
  oUser = this.authService.getUser();
  lUsers: Array<any> | undefined;
  lConversations: Array<any> | undefined;

  ngOnInit(): void {
    /* login verification */
    if(!this.authService.getToken()){
      this.authService.redirectionLogin();
    } else {
      this.userService.getAllEmail(this.oUser.email).subscribe(res => {
        let data:any = res;
        this.lUsers = JSON.parse(data);
      });
      /* live result of all conversations */
      setInterval(() => {
        this.conversationService.getUserConversations(this.oUser.email).subscribe(res => {
          let data: any = res;
          this.lConversations = JSON.parse(data);
        });
      }, 500);
    }
  }
}
