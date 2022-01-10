import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../security/auth.service";
import {Conversation} from "../../entity/conversation";
import {UserService} from "../../services/user.service";
import {ConversationService} from "../../services/conversation.service";

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.css']
})
export class NewConversationComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private conversationService: ConversationService) { }
  /* variable declaration */
  isLoggedIn = false;
  oConversation = new Conversation();
  lUsers: Array<any> = [];
  lUsersConversation: Array<any> = [];
  oUser = this.authService.getUser();
  selectedUser:any;

  conversationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    pseudo: new FormControl('', [
      Validators.required,
    ]),
  });

  ngOnInit(): void {
    /* login verification */
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      this.userService.getAllEmail(this.oUser.email).subscribe(res => {
        let data:any = res;
        this.lUsers = JSON.parse(data);
      })
    } else {
      this.authService.redirectionLogin();
    }
  }

  /* add user in conversation */
  addUser(){
    if (this.lUsers[this.selectedUser]) {
      console.log(this.selectedUser);
      this.lUsersConversation.push(this.lUsers[this.selectedUser]);
      this.lUsers.splice(this.selectedUser, 1);
    }
  }

  /* remove user in conversation */
  removeUser(user: any, index: number) {
    this.lUsers.push(user);
    this.lUsersConversation.splice(index, 1);
  }

  /* submit of new conversation */
  onSubmit(): void {
    let data = this.conversationForm.value;
    this.lUsersConversation.push({"email": this.oUser.email, "pseudo": this.oUser.pseudo});

    this.oConversation.name = data.name;
    this.oConversation.lUsers = this.lUsersConversation;

    this.conversationService.add(this.oConversation);
  }
}
