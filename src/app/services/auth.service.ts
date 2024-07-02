import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { LoginData } from '../models/login-data';
import { Role } from '../models/role';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUserSubject = new BehaviorSubject<User | null>(null);
  authUser$ = this.authUserSubject.asObservable();

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  private setAuthUser(user: User, token: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.authUserSubject.next(user);
  }

  logIn(data: LoginData): Observable<any> {
    return this.httpClient
      .post(`${environment.apiURL}/authenticate`, data, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const headers = response.headers;
          const body = response.body;
          const bearerToken = headers.get('Authorization')!;

          const roles: Role[] = body.authorities.map(
            (auth: { authority: string }) => {
              return {
                rol: auth.authority,
              };
            }
          );
          const user = {
            username: body.username,
            password: body.password,
            roles: roles,
          };

          this.setAuthUser(user, bearerToken);

          this.router.navigate(['segura/home']);
        })
      );
  }

  logOut(): void {
    this.router.navigate(['segura/login']);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.authUserSubject.next(null);
  }

  verifyToken() {
    const user = JSON.parse(sessionStorage.getItem('user')!);
    const token = sessionStorage.getItem('token')!;

    if (user && token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        this.setAuthUser(user, token);
        return true;
      } else {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        return false;
      }
    } else {
      return false;
    }
  }

  getAuthToken(){
    return sessionStorage.getItem('token');
  }

  getAuthUser(){
    return this.authUserSubject.getValue();
  }
}
