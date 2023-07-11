import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/models/userlogin.model';
import { HomeApiService } from '../../services/home-api.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {

  constructor(private service: HomeApiService, private router: Router) { }

  userlogin: UserLogin = {
    email: '',
    password: ''
  }

  ngOnInit(): void {
  }

  hasErrorEmailPass: boolean = false;
  hasErrorInvalid: boolean = false;
  onSubmit() {
    this.service.loginUser(this.userlogin)
    .subscribe(
      response => {
        if (response.accountType == "Admin"){
          this.router.navigate(['/Admin/' + response.id + '/Dashboard'])
        }
        else if(response.accountType == "Teacher"){
          this.router.navigate(['/Teacher/' + response.id + '/Dashboard'])
        }
        else if(response.accountType == "Student"){
          this.router.navigate(['/Student/' + response.id + '/Dashboard'])
        }
        console.log(response);
      },
      err => {
        console.log(err.error)
        if (err.error == 'Login failed.') {
          this.hasErrorEmailPass = true;
        }
        if (err.error == 'Not valid input.') {
          this.hasErrorInvalid = true;
        }
      }
    )
  }

}
