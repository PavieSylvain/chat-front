import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SettingsService} from "../configuration/settings-service.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private settings: SettingsService) { }

  configUrl = this.settings.getConfigUrl();

  get(userId: number) {
    return this.http.get(this.configUrl + '/user/' + userId);
  }

  getAllCivility(){
    return this.http.get(this.configUrl + '/api/civilities');
  }
}
