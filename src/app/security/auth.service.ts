import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SettingsService} from "../configuration/settings-service.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private settings: SettingsService, private router: Router, private userService: UserService) {}

  /* login function */
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.settings.getConfigUrl() + '/api/login_check', {
      username,
      password
    }, httpOptions);
  }

  /* clear session storage in disconnect */
  signOut(): void {
    window.sessionStorage.clear();
  }

  /* saveToken & user in login */
  public saveToken(token: string, user: any): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    this.saveUser(user);
  }

  /* get uer token */
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  /* save user in connection in session storage */
  public saveUser(user: any): void {
    this.userService.get(user.email).subscribe(res=>{
      let data:any = res;
      data = JSON.parse(data);

      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(data[0]));
      window.location.reload();
    });
  }

  /* get user from session storage */
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  /* redirect to home's page */
  public redirectionHome(){
    this.router.navigate(['/']).then(r => {});
  }

  /* redirect to login */
  public redirectionLogin(){
    this.router.navigate(['/login']).then(r => {});
  }
}
