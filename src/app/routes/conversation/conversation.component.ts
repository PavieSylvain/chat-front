import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ConversationService} from "../../services/conversation.service";
import {AuthService} from "../../security/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../entity/User";
import {delay} from "rxjs";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private conversationService: ConversationService, private authService: AuthService) {}
  /* variable declaration */
  id: any;
  oConversation: any;
  isLoggedIn = false;
  user = this.authService.getUser();

  msgForm = new FormGroup({
    msg: new FormControl('', [
      Validators.required,
    ]),
  });

  ngOnInit(): void {
    /* login verification */
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.authService.redirectionLogin();
    }

    /* get conversation id */
    this.id = this.route.snapshot.paramMap.get('id')

    /* live conversation */
    setInterval(() => {
      this.conversationService.get(this.id).subscribe(res => {
        let data: any = res;
        this.oConversation = JSON.parse(data);
      });
    }, 500);
  }

  /* send message */
  onSubmit() {
    let data = this.msgForm.value;
    this.conversationService.setMsg(data.msg, this.user.email, this.oConversation.id);
  }
}
