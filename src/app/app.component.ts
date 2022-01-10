import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./security/auth.service";
import {User} from "./entity/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor( private router: Router, private authService: AuthService) {  }
  title = 'chat';
  isLogged = false;
  user = new User();

  ngOnInit(): void {
    if(this.authService.getToken()){
      this.isLogged = true;
    }
  }

  disconnecter() {
    this.authService.signOut();
    window.location.reload();
  }
}
