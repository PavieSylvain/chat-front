
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  /* configuration for app */

  /* local url for back-end */
  // private configUrl = 'http://127.0.0.1:8000';

  /* online server */
  private configUrl = 'http://www.chatback.univers-athlé.fr';

  constructor() { }

  getConfigUrl(){
    return this.configUrl;
  }
}
