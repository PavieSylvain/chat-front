import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SettingsService} from "../configuration/settings-service.service";
import {User} from "../entity/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private settings: SettingsService, private router: Router) { }

  configUrl = this.settings.getConfigUrl();

  /* get user */
  get(userEmail: string) {
    return this.http.post(this.configUrl + '/user/getUserByEmail',  {"email": userEmail});
  }

  /* get all user -> email & pseudo */
  getAllEmail(userEmail: string) {
    return this.http.get(this.configUrl + '/user/getAllEmail/' + userEmail);
  }

  /* get all civility for user */
  getAllCivility(){
    let headers = new HttpHeaders();
    return this.http.get(this.configUrl + '/api/civilities');
  }

  /* add new user */
  register(user: User){
    return this.http.post(this.configUrl + '/register', user).subscribe(
      data => this.router.navigate(['/']).then(r => {}),
      error => console.log("error", error)
    );
  }
}
