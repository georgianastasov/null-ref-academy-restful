import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UserLogin } from '../models/userlogin.model';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  readonly baseUrl = "https://localhost:44378/api/Home";
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User): Observable<any>{
    return this.http.post<User>(this.baseUrl + '/Register', user);
  }

  loginUser(userlogin: UserLogin): Observable<any>{
    return this.http.post<UserLogin>(this.baseUrl + '/Login', userlogin);
  }
}
